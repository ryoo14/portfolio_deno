// Original: https://gist.github.com/LoueeD/b7dec10b2ea56c825cbb0b3a514720ed

class BskyComments extends HTMLElement {
  constructor() {
    super()
    this.visibleCount = 3
    this.handle = null
    this.postId = null
    this.thread = null
  }

  async connectedCallback() {
    const postHttpsUrl = this.getAttribute("post-https-url")
    if (!postHttpsUrl) {
      this.renderError("Post URL is required")
      return
    }

    const [handle, postId] = this.parsePostUrl(postHttpsUrl)
    this.handle = handle
    this.postId = postId

    const postAtUrl = await this.generatePostAtUrl()

    this.loadComments(postAtUrl)
  }

  parsePostUrl(postHttpsUrl) {
    const match = postHttpsUrl.match(/https:\/\/bsky\.app\/profile\/([^/]+)\/post\/([^/]+)/)
    if (!match) {
      this.renderError("Invalid post URI")
      return
    }
    const handle = match[1]
    const postId = match[2]
    return [handle, postId]
  }

  //https://bsky.social/xrpc/com.atproto.identity.resolveHandle?handle=
  async generatePostAtUrl() {
    const resolveHandleUrl = `https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=${this.handle}`

    try {
      const response = await fetch(resolveHandleUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Fetch Error: ", errorText)
        throw new Error(`Failed to fetch did: ${response.statusText}`)
      }

      const data = await response.json()

      if (!data.did) {
        throw new Error("Failed to resolve handle to DID")
      }

      return `at://${data.did}/app.bsky.feed.post/${this.postId}`
    } catch (error) {
      console.error("Error fetching did:", error.message)
      throw error
    }
  }

  async loadComments(postAtUrl) {
    try {
      const thread = await this.fetchThread(postAtUrl)
      this.thread = thread
      this.render()
    } catch (error) {
      this.renderError("Error loading comments:", error.message)
    }
  }

  async fetchThread(postAtUrl) {
    const params = new URLSearchParams({ uri: postAtUrl })
    const getPostThreadUrl = `https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?${params.toString()}`

    try {
      const response = await fetch(getPostThreadUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Fetch Error: ", errorText)
        throw new Error(`Failed to fetch thread: ${response.statusText}`)
      }

      const data = await response.json()

      if (!data.thread || !data.thread.replies) {
        throw new Error("Invalid thread data: Missing expected properties.")
      }

      return data.thread
    } catch (error) {
      console.error("Error fetching thread:", error.message)
      throw error
    }
  }
  render() {
    if (!this.thread || !this.thread.replies) {
      this.renderError("No comments found")
      return
    }

    const replies = this.thread.replies
    console.log(replies)

    const container = document.createElement("div")
    container.innerHTML = `
      <h2 id="bsky-link" class="flex">
        💬コメント(
        <a href="https://bsky.app/profile/${this.handle}/post/${this.postId}" target="_blank" rel="noopener noreferrer">
          Bluesky
        </a>
        )
      </h2>
      <div id="comments" class="lg:w-[60%]"></div>
      <button id="show-more" class="mb-4">
        もっとみる
      </button>
    `

    const comments = container.querySelector("#comments")
    replies.slice(0, this.visibleCount).forEach((reply) => {
      comments.appendChild(this.createCommentElement(reply))
    })

    const showMoreButton = container.querySelector("#show-more")
    if (this.visibleCount >= replies.length) {
      showMoreButton.style.display = "none"
    }
    showMoreButton.addEventListener("click", () => {
      this.visibleCount += 3
      this.render()
    })

    this.innerHTML = ""
    this.appendChild(container)
  }

  createCommentElement(reply) {
    const comment = document.createElement("div")
    comment.classList.add("comment")

    const author = reply.post.author
    const text = reply.post.record?.text || ""
    const replyId = reply.post.uri.replace(`at://${author.did}/app.bsky.feed.post/`, "")

    comment.innerHTML = `
      <div class="w-fit">
        <a href="https://bsky.app/profile/${author.handle}" target="_blank" rel="noopener noreferrer">
          <div id="authoer" class="flex items-center mb-1">
            <div id="author-avater" class="mr-2">
              ${author.avatar ? `<img class="rounded-full" width="22px" src="${author.avatar}" />` : ""}
            </div>
            <div id="author-name" class="text-base mr-2">
              ${author.displayName ?? author.handle}
            </div>
            <div id="author-handle" class="text-sm">
              @${author.handle}
            </div>
          </div>
        </a>
      </div>
      <div id="comment-text" class="mb-1">
        <a href="https://bsky.app/profile/${author.handle}/post/${replyId}" target="_blank" rel="noopener noreferrer">
          ${this.escapeHTML(text)}
        </a>
      </div>
      <div id="comment-meta" class="flex items-center w-2/12 mb-5">
        <div class="mr-2">
          ${reply.post.likeCount ?? 0} <ion-icon class="text-rorange" name="heart"></ion-icon>
        </div>
        <div>
          ${reply.post.replyCount ?? 0} <ion-icon class="text-rblue" name="chatbubbles-outline"></ion-icon>
        </div>
      </div>
    `

    if (reply.replies && reply.replies.length > 0) {
      const repliesContainer = document.createElement("div")
      repliesContainer.classList.add("replies-container")
      repliesContainer.classList.add("ml-1")
      repliesContainer.classList.add("pl-2")
      repliesContainer.classList.add("border-l-2")

      reply.replies
        .forEach((childReply) => {
          repliesContainer.appendChild(this.createCommentElement(childReply))
        })

      comment.appendChild(repliesContainer)
    }

    return comment
  }

  escapeHTML(htmlString) {
    return htmlString
      .replace(/&/g, "&amp;") // Escape &
      .replace(/</g, "&lt;") // Escape <
      .replace(/>/g, "&gt;") // Escape >
      .replace(/"/g, "&quot;") // Escape "
      .replace(/'/g, "&#039;") // Escape '
  }

  renderError(message) {
    this.innerHTML = `<p class="error">${message}</p>`
  }
}

customElements.define("bsky-comments", BskyComments)
