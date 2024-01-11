export const Home = (props) => {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles/main.css" />
        <link rel="stylesheet" href="/styles/tailwind.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
      </head>
      <body>
        <div class="container text-rgray bg-rwhite flex justify-center lg:block mt-0 lg:mt-20">
          <SideBar />
          <div class="main-content w-9/12 lg:absolute mt-40 lg:left-56 lg:mt-0">
            { props.children }
          </div>
        </div>
        <script src="/static/main.js" />
      </body>
    </html>
  )
}

const SideBar = () => {
  return (
    <div class="sidebar flex flex-row justify-between items-center lg:flex-col fixed lg:left-16 w-10/12 lg:w-auto z-10 bg-rwhite h-32">
      <object data="/static/ryoop.svg" class="h-12 lg:mb-20" />
      <div class="links flex flex-row w-3/6 justify-between lg:flex-col">
        <a href="#" class="sidebar-link hover:text-rorange lg:mb-10" data-target="work">Works</a>
        <a href="#" class="sidebar-link hover:text-rorange lg:mb-10" data-target="use">Uses</a>
        <a href="https://blog.ryoo.cc" target="_blank" rel="noopner noreferrer" class="sidebar-exlink hover:text-rorange lg:mb-10">Blog</a>
      </div>
      <div class="sns lg:mt-10 text-2xl">
        <a href="https://twitter.com/ryoo141" target="_blanck" rel="noopner noreferrer"><i class="ti ti-brand-twitter hover:text-rblue" /></a>
        <a href="https://github.com/ryoo14" target="_blanck" rel="noopner noreferrer"><i class="ti ti-brand-github hover:text-rblue" /></a>
        <a href="https://www.instagram.com/ryoo141" target="_blanck" rel="noopner noreferrer"><i class="ti ti-brand-instagram hover:text-rblue" /></a>
        <a href="https://atcoder.jp/users/ryoo14" target="_blanck" rel="noopner noreferrer"><i class="ti ti-code hover:text-rblue" /></a>
      </div>
    </div>
  )
}

export const ContentTemplate = (props: Contents) => {
  return (
    <div id={ props.type } class={ "ccc fade-in grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 2xl:grid-cols-4 2xl:gap-10" + (props.type === "work" ? " visible" : "") } style={ props.type === "work" ? "display: grid" : "display: none" }>
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

export type Contents = {
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
