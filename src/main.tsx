import { Hono } from "hono"
import { serveStatic } from "hono/cloudflare-workers"

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
      </head>
      <body>
        <div class="container text-rgray bg-rwhite flex flex-col justify-start items-center w-full lg:flex-row lg:block mt-0 lg:mt-20">
          <SideBar />
          <div class="main-content w-9/12 sm:w-11/12 lg:w-9/12 lg:absolute mt-24 sm:mt-36 mb-10 lg:left-56 lg:mt-0">
            { props.children }
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
    <div class="sidebar flex flex-row justify-between items-center bg-rwhite/80 backdrop-blur-sm fixed top-0 lg:top-20 z-10 w-10/12 h-16 sm:w-11/12 sm:h-28 lg:flex-col lg:left-16 lg:w-24">
      <object data="/static/ryoop.svg" class="h-12 lg:mb-20" />
      <div class="links flex flex-row w-4/6 sm:w-3/6 lg:w-24 justify-between items-center lg:flex-col">
        <a href="#" class="sidebar-link hover:text-rorange lg:mb-10" data-target="about">About</a>
        <a href="#" class="sidebar-link hover:text-rorange lg:mb-10" data-target="work">Works</a>
        <a href="#" class="sidebar-link hover:text-rorange lg:mb-10" data-target="use">Uses</a>
        <a href="https://blog.ryoo.cc" target="_blank" rel="noopener noreferrer" class="sidebar-exlink hover:text-rorange lg:mb-10">Blog</a>
      </div>
    </div>
  )
}

const ContentTemplate = (props: Contents) => {
  return (
    <div id={ props.type } class="ccc fade-in grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 2xl:grid-cols-4 2xl:gap-10" style="display: none">
      { props.contents.map((content) => (
        <div class="content">
          <img src={ content.thumbnail } class="h-auto w-auto"/>
          <div class="content-overview flex flex-col">
            <p>{ content.title }</p>
            <p class="font-light">{ content.overview }</p>
          </div>
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
  overview: string;
  detail: string;
  thumbnail: string;
  url: string;
}

const About = () => {
  return (
    <div id="about" class="ccc fade-in visible grid-cols-1 w-full break-words" style="display: grid;">
      <h2 class="text-2xl mb-2">
        I'm ryoo!
      </h2>
      <p class="text-lg mb-2">
        Welcome to my portfolio site.
      </p>
      <p class="text-lg mb-6">
        I work as an Infrastructure Engineer in Japan and develop applications as a hobby.
      </p>
      <h2 class="text-2xl mb-2">
        I ❤️
      </h2>
      <ul class="text-lg mb-6 list-none">
        <li>Snap a pic</li>
        <li>Coding trivial apps</li>
        <li>Tinkering with mechanical keyboards</li>
      </ul>
      <h2 class="text-2xl mb-2">
        My 🧳
      </h2>
      <ul class="text-lg mb-6 list-none">
        <li>Linux Server Setup, Operation</li>
        <li>TypeScript</li>
        <li>Shell Script</li>
        <li>Ruby</li>
      </ul>
    </div>
  )
}

const Footer = () => {
  const year = (new Date()).getFullYear()
  return (
    <div class="footer flex justify-between items-center w-9/12 bg-rwhite h-16 lg:flex-col lg:left-16 sm:w-11/12 lg:w-24 lg:top-[550px] lg:fixed lg:z-10">
      <div class="sns flex flex-row text-2xl">
        <a href="https://twitter.com/ryoo141" target="_blanck" rel="noopener noreferrer"><i class="ti ti-brand-twitter hover:text-rblue" /></a>
        <a href="https://github.com/ryoo14" target="_blanck" rel="noopener noreferrer"><i class="ti ti-brand-github hover:text-rblue" /></a>
        <a href="https://www.instagram.com/ryoo141" target="_blanck" rel="noopener noreferrer"><i class="ti ti-brand-instagram hover:text-rblue" /></a>
        <a href="https://atcoder.jp/users/ryoo14" target="_blanck" rel="noopener noreferrer"><i class="ti ti-code hover:text-rblue" /></a>
      </div>
      <div class="copyright flex flex-row">
        © { year } ryoo 
      </div>
    </div>
  )
}

const work: Contents = {
  type: "work",
  contents: [
    { 
      title: "HoloCut",
      overview: "Web App",
      detail: "Web App that collects clipped hololive videos.",
      thumbnail: "/static/holocutp.svg",
      url: "https://holocut.fan"
    },
    { 
      title: "Patty",
      overview: "CLI Tool",
      detail: "A CLI Tool for managing git and working directories written in Deno.",
      thumbnail: "/static/ryoop.svg",
      url: "https://github.com/ryoo14/patty"
    },
    { 
      title: "Nautitwilight.vim",
      overview: "Vim Colorscheme",
      detail: "Nautical Twilight color scheme for Vim.",
      thumbnail: "/static/ryoop.svg",
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
      detail: "Primary Keyboard.",
      thumbnail: "https://d3toh8on7lf5va.cloudfront.net/neo65.jpg",
      url: "https://qwertykeys.notion.site/Neo-65-6c8ae7895ec442dea809057c3dc5e113"
    },
    { 
      title: "Nuphy Air60 v2",
      overview: "Keyboard",
      detail: "Keyboard for outside use.",
      thumbnail: "https://d3toh8on7lf5va.cloudfront.net/autumn_leaves.jpg",
      url: "https://nuphy.com/collections/keyboards/products/air60-v2"
    },
    { 
      title: "Planck EZ",
      overview: "Keyboard",
      detail: "40% cute keyboard for breather use.",
      thumbnail: "https://d3toh8on7lf5va.cloudfront.net/autumn_leaves.jpg",
      url: "https://blog.zsa.io/2307-goodbye-planck-ez/"
    },
    {
      title: "M2 MacBook Air 13\"",
      overview: "Laptop",
      detail: "Main machine.",
      thumbnail: "https://d3toh8on7lf5va.cloudfront.net/autumn_leaves.jpg",
      url: "https://www.apple.com/macbook-air-13-and-15-m2/"
    },
    {
      title: "iPad Air4 & iPad mini6",
      overview: "Tablet",
      detail: "Photo Editing and Content Consumption.",
      thumbnail: "https://d3toh8on7lf5va.cloudfront.net/autumn_leaves.jpg",
      url: "https://www.apple.com/ipad/"
    },
    {
      title: "Vim",
      overview: "Editor",
      detail: "Note Writing and Coding.",
      thumbnail: "https://d3toh8on7lf5va.cloudfront.net/autumn_leaves.jpg",
      url: "https://www.vim.org"
    },
    {
      title: "HOKA Clifton 9",
      overview: "Shoes",
      detail: "Buoyancy makes everyday running fun.",
      thumbnail: "https://d3toh8on7lf5va.cloudfront.net/autumn_leaves.jpg",
      url: "https://www.hoka.com/jp/clifton-9/1127895.html?dwvar_1127895_color=VRTL"
    },
    {
      title: "Fujifilm X-E4",
      overview: "Camera",
      detail: "Snap a pic.",
      thumbnail: "https://d3toh8on7lf5va.cloudfront.net/autumn_leaves.jpg",
      url: "https://fujifilm-x.com/ja-jp/products/cameras/x-e4/"
    },
  ]
}

const app = new Hono()

app.get("/", (c) => {
  return c.html(
    <Home>
      <About />
      <ContentTemplate { ...work } />
      <ContentTemplate { ...use } />
    </Home>
  )
})

app.get("/styles/*", serveStatic({ root: "./" }))
app.get("/static/*", serveStatic({ root: "./" }))

export default app
