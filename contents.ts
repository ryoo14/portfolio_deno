export type Contents = {
  type: string
  contents: Content[]
}

type Content = {
  title: string
  overview: string
  detail: string
  thumbnail: string
  url: string
}

export const work: Contents = {
  type: "work",
  contents: [
    {
      title: "HoloCut",
      overview: "Web App",
      detail: "Web App that collects clipped hololive videos.",
      thumbnail: "/static/holocutp.svg",
      url: "https://holocut.ryo.lol",
    },
    {
      title: "Patty",
      overview: "CLI Tool",
      detail: "A CLI Tool for managing git and working directories written in Deno.",
      thumbnail: "/static/pattyp.svg",
      url: "https://github.com/ryoo14/patty",
    },
    {
      title: "Nautitwilight.vim",
      overview: "Vim Colorscheme",
      detail: "Nautical Twilight color scheme for Vim.",
      thumbnail: "/static/nautilightp.svg",
      url: "https://github.com/ryoo14/nautitwilight.vim",
    },
    {
      title: "Portfolio",
      overview: "Web App",
      detail: "My Portfolio",
      thumbnail: "/static/portfoliop.svg",
      url: "https://ryoo.cc",
    },
  ],
}

export const use: Contents = {
  type: "use",
  contents: [
    {
      title: "Neo65",
      overview: "Keyboard",
      detail: "Primary Keyboard.",
      thumbnail: "https://d3toh8on7lf5va.cloudfront.net/neo652.jpg",
      url: "https://qwertykeys.notion.site/Neo-65-6c8ae7895ec442dea809057c3dc5e113",
    },
    {
      title: "Nuphy Air60 v2",
      overview: "Keyboard",
      detail: "Keyboard for outside use.",
      thumbnail: "https://d3toh8on7lf5va.cloudfront.net/air60v22.jpg",
      url: "https://nuphy.com/collections/keyboards/products/air60-v2",
    },
    {
      title: "Planck EZ",
      overview: "Keyboard",
      detail: "40% cute keyboard for breather use.",
      thumbnail: "https://d3toh8on7lf5va.cloudfront.net/planckez2.jpg",
      url: "https://blog.zsa.io/2307-goodbye-planck-ez/",
    },
    {
      title: "Noraneko42A",
      overview: "Keyboard",
      detail: "My first Alice keyboard.",
      thumbnail: "https://d3toh8on7lf5va.cloudfront.net/noraneko42a2.jpg",
      url: "https://booth.pm/ja/items/5374158",
    },
    {
      title: "Quarkeys Z40",
      overview: "Keyboard",
      detail: "My Endgame Keyboard for past.",
      thumbnail: "https://d3toh8on7lf5va.cloudfront.net/z402.jpg",
      url: "https://ja.quarkeys.com/home",
    },
    {
      title: "CSTC40",
      overview: "Keyboard",
      detail: "Ortholinear 40% keyboard like mini TOFU.",
      thumbnail: "https://d3toh8on7lf5va.cloudfront.net/cstc402.jpg",
      url:
        "https://kprepublic.com/products/cstc40-40-rgb-40-hot-swappable-mechanical-keyboard-pcb-programmed-qmk-via-vial-firmware-rgb-switch-underglow-type-c-planck?srsltid=AfmBOopzhoxajTD1NGUYfGiU4vomMPIXu2eyM37cDoxRNIgB91XR8G4-",
    },
    {
      title: "RHYn47",
      overview: "Keyboard",
      detail: "My first design keyboard and my endgame keyboard now.",
      thumbnail: "https://d3toh8on7lf5va.cloudfront.net/rhyn47_v3.jpg",
      url:
        "https://ryoo.cc/blog/2025-06-20_intro_rhyn47",
    },
    {
      title: 'M2 MacBook Air 13"',
      overview: "Laptop",
      detail: "Main machine.",
      thumbnail: "https://d3toh8on7lf5va.cloudfront.net/mba.jpg",
      url: "https://www.apple.com/macbook-air-13-and-15-m2/",
    },
    {
      title: "iPad Air4 & iPad mini6",
      overview: "Tablet",
      detail: "Photo Editing and Content Consumption.",
      thumbnail: "https://d3toh8on7lf5va.cloudfront.net/ipads.jpg",
      url: "https://www.apple.com/ipad/",
    },
    {
      title: "Fujifilm X-E4",
      overview: "Camera",
      detail: "Snap a pic.",
      thumbnail: "https://d3toh8on7lf5va.cloudfront.net/xe4.jpg",
      url: "https://fujifilm-x.com/ja-jp/products/cameras/x-e4/",
    },
    {
      title: "HOKA Clifton 9",
      overview: "Shoes",
      detail: "Buoyancy makes everyday running fun.",
      thumbnail: "https://d3toh8on7lf5va.cloudfront.net/clifton9.jpg",
      url: "https://www.hoka.com/jp/clifton-9/1127895.html?dwvar_1127895_color=VRTL",
    },
    {
      title: "Aer Sling Bag 3",
      overview: "Bag",
      detail: "Daily use",
      thumbnail: "https://d3toh8on7lf5va.cloudfront.net/aer.jpg",
      url: "https://aersf.jp/products/detail/90",
    },
    {
      title: "Vim",
      overview: "Editor",
      detail: "Note Writing and Coding.",
      thumbnail: "https://d3toh8on7lf5va.cloudfront.net/vim.jpg",
      url: "https://www.vim.org",
    },
  ],
}
