import { Hono } from "hono"
import { serveStatic } from "hono/cloudflare-workers"
import { Home, Contents, ContentTemplate} from "./components"

const app = new Hono()

const work: Contents = {
  type: "work",
  contents: [
    { 
      title: "HoloCut",
      overview: "",
      detail: "Web App that collects clipped hololive videos.",
      thumbnail: "",
      url: "https://holocut.fan"
    },
    { 
      title: "patty",
      overview: "",
      detail: "A CLI Tool for managing git and working directories written in Deno.",
      thumbnail: "",
      url: "https://github.com/ryoo14/patty"
    },
    { 
      title: "nautitwilight.vim",
      overview: "",
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
      overview: "",
      detail: "Primary Keyboard",
      thumbnail: "",
      url: "/neo65"
    },
    { 
      title: "Nuphy Air60 v2",
      overview: "",
      detail: "Keyboard for outside use",
      thumbnail: "",
      url: "/air60v2"
    },
    { 
      title: "Planck EZ",
      overview: "",
      detail: "40% cute keyboard for breather use",
      thumbnail: "",
      url: "/planck"
    },
    {
      title: "M2 MacBook Air 13\"",
      overview: "",
      detail: "Main machine",
      thumbnail: "",
      url: ""
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
