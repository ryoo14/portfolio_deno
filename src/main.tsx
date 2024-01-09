import { Hono } from "hono"
import { serveStatic } from "hono/cloudflare-workers"
import { Home, Contents, ContentTemplate} from "./components"

const app = new Hono()

const work: Contents = {
  type: "work",
  contents: [
    { 
      title: "HoloCut",
      overview: "Web App",
      detail: "Web App that collects clipped hololive videos.",
      thumbnail: "",
      url: "https://holocut.fan"
    },
    { 
      title: "Patty",
      overview: "CLI Tool",
      detail: "A CLI Tool for managing git and working directories written in Deno.",
      thumbnail: "",
      url: "https://github.com/ryoo14/patty"
    },
    { 
      title: "Nautitwilight.vim",
      overview: "Vim Colorscheme",
      detail: "Nautical Twilight color scheme for Vim.",
      thumbnail: "",
      url: "https://github.com/ryoo14/nautitwilight.vim"
    },
  ]
}

const use: Contents = {
  type: "use",
  contents: [
    { 
      title: "Neo65",
      overview: "Keyboard",
      detail: "Primary Keyboard",
      thumbnail: "",
      url: "https://qwertykeys.notion.site/Neo-65-6c8ae7895ec442dea809057c3dc5e113"
    },
    { 
      title: "Nuphy Air60 v2",
      overview: "Keyboard",
      detail: "Keyboard for outside use",
      thumbnail: "",
      url: "https://nuphy.com/collections/keyboards/products/air96-v2"
    },
    { 
      title: "Planck EZ",
      overview: "Keyboard",
      detail: "40% cute keyboard for breather use",
      thumbnail: "",
      url: "https://blog.zsa.io/2307-goodbye-planck-ez/"
    },
    {
      title: "M2 MacBook Air 13\"",
      overview: "Laptop",
      detail: "Main machine",
      thumbnail: "",
      url: "https://www.apple.com/macbook-air-13-and-15-m2/"
    },
    {
      title: "",
      overview: "",
      detail: "",
      thumbnail: "",
      url: ""
    },
  ]
}

app.get("/", (c) => {
  return c.html(
    <Home>
      <ContentTemplate { ...work } />
      <ContentTemplate { ...use } />
    </Home>
  )
})

app.get("/styles/*", serveStatic({ root: "./" }))
app.get("/static/*", serveStatic({ root: "./" }))

export default app
