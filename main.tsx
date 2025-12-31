import { Context, Hono } from "@hono/hono"
import { serveStatic } from "@hono/hono/deno"
import { use, work } from "./contents.ts"
import matter from "gray-matter"
import { marked } from "marked"
import { About, Blog, BlogEntry, ContentTemplate, Home } from "./components.tsx"

const app = new Hono()

interface OGP {
  title: string
  type: "website" | "article"
  image: string
  url: string
}

function renderWithTitle(c: Context, pageTitle: string, component) {
  // set ogp metadat
  const type = c.req.path.startsWith("/blog/") ? "article" : "website"
  const ogp: OGP = {
    title: pageTitle,
    type: type,
    image: "https://d3toh8on7lf5va.cloudfront.net/rhyl47-aluminium3-mini.jpg",
    url: `https://ryoo.cc${c.req.path}`
  }

  const isPartial = c.req.header("HX-Request") === "true"
  if (isPartial) {
    c.header("Page-Title", encodeURIComponent(pageTitle))
    return c.html(component)
  } else {
    return c.html(
      <Home pageTitle={pageTitle} ogp={ogp}>
        {component}
      </Home>,
    )
  }
}

app.notFound((c) => {
  return c.html(
    <Home>
      <div class="fade-in">Not Found</div>
    </Home>,
    404,
  )
})

app.get("/", (c) => {
  return c.redirect("/about", 301)
})

app.get("/about", (c) => {
  return renderWithTitle(c, "About | ryoo.cc", <About />)
})

app.get("/works", (c) => {
  return renderWithTitle(c, "Works | ryoo.cc", <ContentTemplate {...work} />)
})

app.get("/uses", (c) => {
  return renderWithTitle(c, "Uses | ryoo.cc", <ContentTemplate {...use} />)
})

app.get("/blog", (c) => {
  return renderWithTitle(c, "Blog | ryoo.cc", <Blog />)
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

  return renderWithTitle(c, `${blogTitle} | ryoo.cc`, <BlogEntry {...blogEntry} />,
  )
})

app.get("/styles/*", serveStatic({ root: "./assets" }))
app.get("/static/*", serveStatic({ root: "./assets" }))

Deno.serve(app.fetch)
