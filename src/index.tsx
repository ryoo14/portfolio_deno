import { Hono } from "hono"
import { serveStatic } from "hono/cloudflare-workers"
import { Home, Contents, ContentTemplate, Content } from "./components"

const app = new Hono()

const work: Contents = {
  type: "work",
  contents: [
    { 
      title: "HoloCut",
      detail: "Web App that collects clipped hololive videos.",
      url: "",
      thumbnail: "https://holocut.fan"
    },
    { 
      title: "patty",
      detail: "A CLI Tool for managing git and working directories written in Deno.",
      url: "",
      thumbnail: "https://github.com/ryoo14/patty"
    },
    { 
      title: "nautitwilight.vim",
      detail: "Nautical Twilight color scheme for Vim.",
      url: "",
      thumbnail: "https://github.com/ryoo14/nautitwilight.vim"
    },
  ]
}

const use: Contents = {
  type: "use",
  contents: [
    { 
      title: "Neo65",
      detail: "My main keyboard",
      url: "",
      thumbnail: "Neo65"
    },
    { 
      title: "Planck EZ",
      detail: "My main keyboard",
      url: "",
      thumbnail: "Neo65"
    },
    { 
      title: "Neo65",
      detail: "My main keyboard",
      url: "",
      thumbnail: "Neo65"
    },
  ]
}

const link: Contents = {
  type: "link",
  contents: [
    { 
      title: "AtCoder",
      detail: "https://atcoder.jp/users/ryoo14",
      url: "",
      thumbnail: "atcoder"
    },
    { 
      title: "GitHub",
      detail: "https://github.com/ryoo14",
      url: "",
      thumbnail: "github"
    },
    { 
      title: "Instagram",
      detail: "https://www.instagram.com/ryoo141",
      url: "",
      thumbnail: "instagram"
    },
    { 
      title: "Twitter",
      detail: "https://twitter.com/ryoo141",
      url: "",
      thumbnail: "twitter"
    },
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
