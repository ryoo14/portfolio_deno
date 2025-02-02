import { Hono } from "@hono/hono"
import { serveStatic } from "@hono/hono/deno"
import { Contents, work, use } from "./contents.ts"
import matter from "gray-matter"
import { marked } from "marked"

const Home = (props) => {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#fffcf9" />
        <link rel="stylesheet" href="/styles/main.css" />
        <link rel="stylesheet" href="/styles/tailwind.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
        <link rel="icon" href="/static/portfoliop.svg" type="image/svg+xml" />
        <title>{props.title}</title>
      </head>
      <body>
        <div class="container flex flex-col justify-start items-center w-full lg:flex-row lg:block mt-0 lg:mt-20">
          <SideBar />
          <div class="main-content w-10/12 sm:w-11/12 lg:w-9/12 lg:absolute mt-24 sm:mt-32 mb-10 lg:left-56 lg:mt-0">
            {props.children}
          </div>
          <Footer />
        </div>
        <script src="/static/main.js" />
      </body>
    </html>
  )
}

const SideBar = () => {
  return (
    <div class="sidebar flex flex-row justify-between items-center backdrop-blur-sm fixed top-0 lg:top-20 z-10 w-10/12 h-16 sm:w-11/12 sm:h-20 lg:h-28 lg:flex-col lg:left-16 lg:w-24">
      <object data="/static/ryoop.svg" class="h-12 lg:mb-20" />
      <div class="links flex flex-row w-4/6 sm:w-3/6 lg:w-24 justify-between items-center lg:flex-col">
        <a href="/" class="sidebar-link hover:text-rorange lg:mb-10" data-target="about">
          About
        </a>
        <a href="/works" class="sidebar-link hover:text-rorange lg:mb-10" data-target="work">
          Works
        </a>
        <a href="/uses" class="sidebar-link hover:text-rorange lg:mb-10" data-target="use">
          Uses
        </a>
        <a href="/blog" class="sidebar-link hover:text-rorange lg:mb-10" data-target="blog">
          Blog
        </a>
      </div>
    </div>
  )
}

const About = () => {
  return (
    <div id="about" class="fade-in grid-cols-1 w-full break-words" style="display: grid;">
      <div class="flex h-12 items-center mb-6">
        <h2 class="text-2xl mr-2">I'm ryoo.</h2>
      </div>
      <p class="text-lg mb-4">I work as an Infrastructure Engineer in Japan and develop applications as a hobby.</p>
      <p class="text-lg">I love taking photos, creating small apps, and clicking and clacking mechanical keyboards.</p>
    </div>
  )
}

const ContentTemplate = (props: Contents) => {
  return (
    <div id={props.type} class="fade-in grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 2xl:grid-cols-4 2xl:gap-10" style="display: grid">
      {props.contents.map((content) => (
        <div class="content">
          <a href={content.url} target="_blanck" rel="noopener noreferrer">
            <img src={content.thumbnail} class="h-auto w-auto" />
            <div class="content-overview flex flex-col">
              <p>{content.title}</p>
              <p class="text-gray-400">{content.overview}</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  )
}

const Blog = () => {
  const blogEntries = Deno.readTextFileSync("./summary.html")
  return (
    <div id="blog" class="fade-in w-full break-words" style="display: grid;">
      <div class="flex h-12 items-center mb-6">
        <h2 class="text-2xl mr-2">Blog</h2>
      </div>
      <div id="blog-list" class="text-base">
        <div dangerouslySetInnerHTML={{ __html: blogEntries }} />
      </div>
    </div>
  )
}

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <div class="footer flex justify-between items-center w-10/12 h-16 lg:flex-col lg:left-16 sm:w-11/12 lg:w-24 lg:top-[550px] lg:fixed lg:z-10">
      <div class="sns flex flex-row text-2xl">
        <a href="https://twitter.com/ryoo141" target="_blanck" rel="noopener noreferrer">
          <i class="ti ti-brand-twitter hover:text-rblue" />
        </a>
        <a href="https://bsky.app/profile/ryoo.cc" target="_blanck" rel="noopener noreferrer">
          <i class="ti ti-brand-bluesky hover:text-rblue" />
        </a>
        <a href="https://github.com/ryoo14" target="_blanck" rel="noopener noreferrer">
          <i class="ti ti-brand-github hover:text-rblue" />
        </a>
        <a href="https://www.instagram.com/ryoo141" target="_blanck" rel="noopener noreferrer">
          <i class="ti ti-brand-instagram hover:text-rblue" />
        </a>
        <a href="https://atcoder.jp/users/ryoo14" target="_blanck" rel="noopener noreferrer">
          <i class="ti ti-code hover:text-rblue" />
        </a>
      </div>
      <div class="copyright flex flex-row">© {year} ryoo</div>
    </div>
  )
}

const app = new Hono()

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
