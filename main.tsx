import { Hono } from "@hono/hono"
import { serveStatic } from "@hono/hono/deno"
import { work, use } from "./contents.ts"
import matter from "gray-matter"
import { marked } from "marked"
import { Home, About, ContentTemplate, Blog } from "./components.tsx"


const app = new Hono()

app.notFound((c) => {
  return c.html(
    <Home>
      <div class="fade-in">Not Found</div>
    </Home>
  , 404)
})

app.get("/", (c) => {
  const isPartial = c.req.header("HX-Request") === "true"
  if (isPartial) {
    return c.html(
      <About />
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
      <About />
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
      <ContentTemplate {...work} />
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
      <ContentTemplate {...use} />
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
      <Blog />
    )
  } else {
    return c.html(
      <Home>
        <Blog />
      </Home>
    )
  }
})

app.get("/blog/:path", (c) => {
  const blogFile = c.req.param("path")
  const blogData = Deno.readTextFileSync(`./posts/${blogFile}.md`)
  const blogObject = matter(blogData)
  const frontMatter = blogObject.data
  const frontMatterDate = new Date(frontMatter.publish_date).toISOString().split("T")[0]
  const frontMatterBskyUrl = frontMatter.bsky_url
  const contentMd = blogObject.content
  const contentHtml = marked(contentMd) as string
  const innerHtml = { __html: contentHtml }

  const isPartial = c.req.header("HX-Request") === "true"
  if (isPartial) {
    return c.html(
      <div id="blog-entry" class="fade-in">
        <div class="front-matter mb-4">
          <div class="text-3xl text-bold mb-4">{frontMatter.title}</div>
          <div class="text-sm">{frontMatterDate}</div>
          <div class="text-sm">{frontMatter.tags}</div>
        </div>
        <div dangerouslySetInnerHTML={innerHtml} />
        { frontMatterBskyUrl && <bsky-comments post-https-url={frontMatterBskyUrl} /> }
      </div>
    )
  } else {
    return c.html(
      <Home>
        <div id="blog-entry" class="fade-in">
          <div class="front-matter mb-4">
            <div class="text-3xl text-bold mb-4">{frontMatter.title}</div>
            <div class="text-sm">{frontMatterDate}</div>
            <div class="text-sm">{frontMatter.tags}</div>
          </div>
          <div dangerouslySetInnerHTML={innerHtml} />
          { frontMatterBskyUrl && <bsky-comments post-https-url={frontMatterBskyUrl} /> }
        </div>
      </Home>
    )
  }
})

app.get("/styles/*", serveStatic({ root: "./assets" }))
app.get("/static/*", serveStatic({ root: "./assets" }))

Deno.serve(app.fetch)
