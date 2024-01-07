import { Hono } from "hono"
import { serveStatic } from "hono/cloudflare-workers"

const app = new Hono()

const Home = (props) => {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles/main.css" />
        <link rel="stylesheet" href="/styles/tailwind.css" />
      </head>
      <body>
        <div class="container">
          <SideBar />
          <div class="main-content">
            { props.children }
          </div>
        </div>
      </body>
    </html>
  )
}

const SideBar = () => {
  return (
    <div class="sidebar">
      <a href="#work" class="sidebar-link">Works</a>
      <a href="#use" class="sidebar-link">Uses</a>
      <a href="https://blog.ryoo.cc" target="_blank" rel="noreferrer" class="sidebar-link">Blog</a>
      <a href="#link" class="sidebar-link">Links</a>
    </div>
  )
}

const ContentTemplate = (props: Contents) => {
  return (
    <div class={ props.type }>
      { props.contents.map((content) => (
        <div class="content">
          <p>{ content.title }</p>
          <p>{ content.thumbnail }</p>
          <p>{ content.detail }</p>
        </div>
      ))}
    </div>
  )
}

type Contents = {
  type: string;
  contents: Content[];
}

type Content = {
  title: string;
  detail: string;
  thumbnail: string;
}


const work: Contents = {
  type: "work",
  contents: [
    { title: "patty", detail: "A CLI Tool for managing git and working directories written in Deno.", thumbnail: "https://github.com/ryoo14/patty" },
    { title: "nautitwilight.vim", detail: "Nautical Twilight color scheme for Vim.", thumbnail: "https://github.com/ryoo14/nautitwilight.vim" },
    { title: "HoloCut", detail: "Web App that collects clipped hololive videos.", thumbnail: "https://holocut.fan" }
  ]
}

const use: Contents = {
  type: "use",
  contents: [
    { title: "Neo65", detail: "My main keyboard", thumbnail: "Neo65" }
  ]
}

const link: Contents = {
  type: "link",
  contents: [
    { title: "AtCoder", detail: "https://atcoder.jp/users/ryoo14", thumbnail: "atcoder" },
    { title: "GitHub",  detail: "https://github.com/ryoo14", thumbnail: "github" },
    { title: "Instagram", detail: "https://www.instagram.com/ryoo141", thumbnail: "instagram" },
    { title: "Twitter", detail: "https://twitter.com/ryoo141", thumbnail: "twitter" }
  ]
}

app.get("/", (c) => {
  return c.html(
    <Home>
      <ContentTemplate { ...work } />
      <ContentTemplate { ...use } />
      <ContentTemplate { ...link } />
    </Home>
  )
})

app.get("/styles/*", serveStatic({ root: "./" }))

export default app
