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
    { title: "patty", detail: "patty", thumbnail: "https://github.com/ryoo14/patty" }
  ]
}

const use: Contents = {
  type: "use",
  contents: [
    { title: "Neo65", detail: "It's Neo65", thumbnail: "" }
  ]
}

const link: Contents = {
  type: "link",
  contents: [
    { title: "AtCoder", detail: "https://atcoder.jp/users/ryoo14", thumbnail: "" },
    { title: "GitHub",  detail: "https://github.com/ryoo14", thumbnail: "" },
    { title: "Instagram", detail: "https://www.instagram.com/ryoo141", thumbnail: "" },
    { title: "Twitter", detail: "https://twitter.com/ryoo141", thumbnail: "" }
  ]
}

app.get("/", (c) => {
  return c.html(
    <Home>
      <ContentTemplate { ...work } />
      <ContentTemplate { ...use } />
      <ContentTemplate { ...link } />
      Hello, Hono
    </Home>
  )
})

app.get("/styles/*", serveStatic({ root: "./" }))

export default app
