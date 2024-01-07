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
          { props.children }
        </div>
      </body>
    </html>
  )
}

const SideBar = () => {
  return (
    <div class="sidebar w-64 h-screen bg-gray-800 text-white p-4">
      <a href="#about" class="sidebar-link block py-2 px-4 hover:bg-gray-700">About</a>
      <a href="#projects" class="sidebar-link block py-2 px-4 hover:bg-gray-700">Projects</a>
      <a href="#contact" class="sidebar-link block py-2 px-4 hover:bg-gray-700">Contact</a>
    </div>
  )
}

app.get("/", (c) => {
  return c.html(
    <Home>
    </Home>
  )
})

app.get("/styles/*", serveStatic({ root: "./" }))

export default app
