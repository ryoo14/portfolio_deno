import { Hono } from "@hono/hono"
import { serveStatic } from "@hono/hono/deno"
import { work, use } from "./contents.ts"
import matter from "gray-matter"
import { marked } from "marked"
import { Home, About, ContentTemplate, Blog } from "./components.tsx"


const app = new Hono()

app.notFound((c) => {
  return c.html(
    <Home title="404 | ryoo.cc">
      <div class="fade-in">Not Found</div>
    </Home>
  , 404)
})

app.get("/", (c) => {
  return c.html(
    <Home title="ryoo.cc">
      <About />
    </Home>,
  )
})

app.get("/about", (c) => {
  return c.html(
    <Home title="About | ryoo.cc">
      <About />
    </Home>,
  )
})

app.get("/works", (c) => {
  return c.html(
    <Home title="Works | ryoo.cc">
      <ContentTemplate {...work} />
    </Home>,
  )
})

app.get("/uses", (c) => {
  return c.html(
    <Home title="Uses | ryoo.cc">
      <ContentTemplate {...use} />
    </Home>,
  )
})

app.get("/blog", (c) => {
  return c.html(
    <Home title="blog | ryoo.cc">
      <Blog />
    </Home>,
  )
})

app.get("/blog/:path", (c) => {
  const blogFile = c.req.param("path")
  const blogData = Deno.readTextFileSync(`./posts/${blogFile}.md`)
  const blogObject = matter(blogData)
  const frontMatter = blogObject.data
  const frontMatterDate = new Date(frontMatter.publish_date).toISOString().split("T")[0]
  const contentMd = blogObject.content
  const contentHtml = marked(contentMd) as string
  const innerHtml = { __html: contentHtml }
  return c.html(
    <Home title="blog | ryoo.cc">
      <div id="blog-entry" class="fade-in">
        <div class="front-matter mb-4">
          <div class="text-3xl text-bold mb-4">{frontMatter.title}</div>
          <div class="text-sm">{frontMatterDate}</div>
          <div class="text-sm">{frontMatter.tags}</div>
        </div>
        <div dangerouslySetInnerHTML={innerHtml} />
      </div>
    </Home>,
  )
})

app.get("/styles/*", serveStatic({ root: "./assets" }))
app.get("/static/*", serveStatic({ root: "./assets" }))

Deno.serve(app.fetch)
