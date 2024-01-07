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
    <div class="sidebar w-64 h-screen bg-rwhite text-rgray p-4">
      <a href="#work" class="sidebar-link block py-2 px-4">Works</a>
      <a href="#use" class="sidebar-link block py-2 px-4">Uses</a>
      <a href="#blog" class="sidebar-link block py-2 px-4">Blog</a>
      <a href="#link" class="sidebar-link block py-2 px-4">Links</a>
    </div>
  )
}

app.get("/", (c) => {
  return c.html(
    <Home>
      Hello, Hono
    </Home>
  )
})

app.get("/styles/*", serveStatic({ root: "./" }))

export default app
