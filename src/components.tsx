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
        <div class="container text-rgray bg-rwhite flex flex-col justify-center items-center w-full lg:flex-row lg:block mt-0 lg:mt-20">
          <SideBar />
          <div class="main-content w-9/12 sm:w-11/12 lg:w-9/12 lg:absolute mt-24 mb-10 lg:left-56 lg:mt-0">
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
    <div class="sidebar flex flex-row justify-between items-center bg-rwhite/80 backdrop-blur-sm fixed top-0 lg:top-20 z-10 w-9/12 h-16 sm:w-10/12 sm:h-28 lg:flex-col lg:left-16 lg:w-24">
      <object data="/static/ryoop.svg" class="h-12 lg:mb-20" />
      <div class="links flex flex-row w-4/6 sm:w-3/6 lg:w-24 justify-between items-center lg:flex-col">
        <a href="#" class="sidebar-link hover:text-rorange lg:mb-10" data-target="work">Works</a>
        <a href="#" class="sidebar-link hover:text-rorange lg:mb-10" data-target="use">Uses</a>
        <a href="https://blog.ryoo.cc" target="_blank" rel="noopner noreferrer" class="sidebar-exlink hover:text-rorange lg:mb-10">Blog</a>
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

const Footer = () => {
  const year = (new Date()).getFullYear()
  return (
    <div class="footer flex justify-between items-center w-9/12 bg-rwhite h-16 lg:flex-col lg:left-16 sm:w-11/12 lg:w-24 lg:top-[550px] lg:fixed lg:z-10">
      <div class="sns flex flex-row text-2xl">
        <a href="https://twitter.com/ryoo141" target="_blanck" rel="noopner noreferrer"><i class="ti ti-brand-twitter hover:text-rblue" /></a>
        <a href="https://github.com/ryoo14" target="_blanck" rel="noopner noreferrer"><i class="ti ti-brand-github hover:text-rblue" /></a>
        <a href="https://www.instagram.com/ryoo141" target="_blanck" rel="noopner noreferrer"><i class="ti ti-brand-instagram hover:text-rblue" /></a>
        <a href="https://atcoder.jp/users/ryoo14" target="_blanck" rel="noopner noreferrer"><i class="ti ti-code hover:text-rblue" /></a>
      </div>
      <div class="copyright flex flex-row">
        © { year } ryoo 
      </div>
    </div>
  )
}
