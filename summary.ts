import matter from "gray-matter"

// get file list in the posts directory in Deno
const posts = Deno.readDirSync("./posts")

type FrontMatter = {
  name: string
  title: string
  publish_date: Date
  tags: string[]
  bsky_url?: string
  draft?: boolean
}

// get the content of each file
const postsContent: FrontMatter[] = []

posts.forEach((post) => {
  const content = Deno.readTextFileSync(`./posts/${post.name}`)
  const data = matter(content).data
  const name = post.name
  const title = data.title
  const publish_date = new Date(data.publish_date)
  const tags = data.tags
  const draft = data.draft
  postsContent.push({
    name,
    title,
    publish_date,
    tags,
    draft
  })
})

const postsSortedContent: FrontMatter[] = postsContent.sort((a, b) => b.publish_date.getTime() - a.publish_date.getTime())
let html = ""
postsSortedContent.forEach((post) => {
  if (!post.draft) {
    html += 
`<a class="flex flex-row mb-8 items-baseline hover:text-rorange" href="/blog/${post.name.replace(/\.md$/, "")}">
  <p class="mr-8 min-w-[100px]">${post.publish_date.toISOString().split("T")[0]}</p>
  <p>${post.title}</p>
</a>
`
  }
})

Deno.writeTextFileSync("./summary.html", html)


//<a class="flex flex-row mb-8 items-baseline hover:text-rorange" href="/blog/2021-06-30-monthly_contents">
//  <p class="mr-8 min-w-[100px]">2025-01-01</p>
//  <p>これはテスト記事なんだよね. そういうものなんだよね。けどそうじゃない場合もやっぱりあるよね</p>
//</a>
//<a class="flex flex-row mb-8 items-baseline hover:text-rorange" href="/blog/2022-12-31_year-end">
//  <p class="mr-8 min-w-[100px]">2025-08-01</p>
//  <p>これはテスト記事なんだよね. そういうものなんだよね。けどそうじゃない場合もやっぱりあるよね</p>
//</a>
//<a class="flex flex-row mb-8 items-baseline hover:text-rorange" href="/blog/2025-01-31_monthly-report">
//  <p class="mr-8 min-w-[100px]">2025-07-01</p>
//  <p>これはテスト記事なんだよね. そういうものなんだよね。けどそうじゃない場合もやっぱりあるよね</p>
//</a>
//<a class="flex flex-row mb-8 items-baseline hover:text-rorange" href="/blog/2024-12-29_bestbuy">
//  <p class="mr-8 min-w-[100px]">2025-11-01</p>
//  <p>これはテスト記事なんだよね. そういうものなんだよね。けどそうじゃない場合もやっぱりあるよね</p>
//</a>
