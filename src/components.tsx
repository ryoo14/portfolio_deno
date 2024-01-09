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
          <div class="main-content w-10/12 lg:absolute mt-48 lg:left-44 lg:mt-0">
            { props.children }
          </div>
        </div>
      </body>
    </html>
  )
}

const SideBar = () => {
  return (
    <div class="sidebar flex flex-row justify-between items-center lg:flex-col fixed lg:left-10 w-10/12 lg:w-auto z-10 bg-rwhite h-36">
      <object data="/static/ryoo.svg" class="h-12 lg:mb-20" />
      <div class="links flex flex-row lg:flex-col">
        <a href="#work" class="sidebar-link lg:mb-10">Works</a>
        <a href="#use" class="sidebar-link lg:mb-10">Uses</a>
        <a href="https://blog.ryoo.cc" target="_blank" rel="noreferrer" class="sidebar-link lg:mb-10">Blog</a>
      </div>
      <div class="sns lg:mt-10 text-xl">
        <a href="https://twitter.com/ryoo141" target="_blanck" rel="noreferrer"><i class="ti ti-brand-twitter" /></a>
        <a href="https://github.com/ryoo14" target="_blanck" rel="noreferrer"><i class="ti ti-brand-github" /></a>
        <a href="https://www.instagram.com/ryoo141" target="_blanck" rel="noreferrer"><i class="ti ti-brand-instagram" /></a>
        <a href="https://atcoder.jp/users/ryoo14" target="_blanck" rel="noreferrer"><i class="ti ti-code" /></a>
      </div>
    </div>
  )
}

export const ContentTemplate = (props: Contents) => {
          //<p>{ content.thumbnail }</p>
          //<p>{ content.detail }</p>
          //<p>{ content.url }</p>
  return (
    <div class={ props.type + " grid grid-cols-2 gap-4 lg:grid-cols-3 lg: gap-8" }>
      { props.contents.map((content) => (
        <div class="content">
          <img src="https://d3toh8on7lf5va.cloudfront.net/autumn_leaves.jpg" class="h-auto w-auto"/>
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
