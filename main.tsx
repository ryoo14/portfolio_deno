import { Hono } from "@hono/hono"
import { serveStatic } from "@hono/hono/deno"
import { use, work } from "./contents.ts"
import matter from "gray-matter"
import { marked } from "marked"
import { About, Blog, BlogEntry, ContentTemplate, Home } from "./components.tsx"

const app = new Hono()

app.notFound((c) => {
  return c.html(
    <Home>
      <div class="fade-in">Not Found</div>
    </Home>,
    404,
  )
})

app.get("/", (c) => {
  const isPartial = c.req.header("HX-Request") === "true"
  if (isPartial) {
    return c.html(
      <About />,
    )
  } else {
    return c.html(
      <Home>
        <About />
      </Home>,
    )
  }
})

app.get("/about", (c) => {
  const isPartial = c.req.header("HX-Request") === "true"
  if (isPartial) {
    return c.html(
      <About />,
    )
  } else {
    return c.html(
      <Home>
        <About />
      </Home>,
    )
  }
})

app.get("/works", (c) => {
  const isPartial = c.req.header("HX-Request") === "true"
  if (isPartial) {
    return c.html(
      <ContentTemplate {...work} />,
    )
  } else {
    return c.html(
      <Home>
        <ContentTemplate {...work} />
      </Home>,
    )
  }
})

app.get("/uses", (c) => {
  const isPartial = c.req.header("HX-Request") === "true"
  if (isPartial) {
    return c.html(
      <ContentTemplate {...use} />,
    )
  } else {
    return c.html(
      <Home>
        <ContentTemplate {...use} />
      </Home>,
    )
  }
})

app.get("/blog", (c) => {
  const isPartial = c.req.header("HX-Request") === "true"
  if (isPartial) {
    return c.html(
      <Blog />,
    )
  } else {
    return c.html(
      <Home>
        <Blog />
      </Home>,
    )
  }
})

app.get("/blog/:path", (c) => {
  // Get the blog file path from the URL
  const blogFile = c.req.param("path")
  const blogData = Deno.readTextFileSync(`./posts/${blogFile}.md`)

  // Parse the blog file
  const blogObject = matter(blogData)

  // Get the front matter data
  const frontMatter = blogObject.data
  const blogTitle = frontMatter.title
  const blogDate = new Date(frontMatter.publish_date).toISOString().split("T")[0]
  const blogTags = frontMatter.tags
  const blogBskyUrl = frontMatter.bsky_url

  // Get the content data
  const contentMd = blogObject.content
  const contentHtml = marked(contentMd) as string
  const innerHtml = { __html: contentHtml }

  const blogEntry = {
    title: blogTitle,
    date: blogDate,
    tags: blogTags,
    content: innerHtml,
    bskyUrl: blogBskyUrl,
  }

  const isPartial = c.req.header("HX-Request") === "true"
  if (isPartial) {
    return c.html(
      <BlogEntry {...blogEntry} />,
    )
  } else {
    return c.html(
      <Home>
        <BlogEntry {...blogEntry} />
      </Home>,
    )
  }
})

app.get("/styles/*", serveStatic({ root: "./assets" }))
app.get("/static/*", serveStatic({ root: "./assets" }))

Deno.serve(app.fetch)
