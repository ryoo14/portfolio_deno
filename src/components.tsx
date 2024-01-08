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
    <div class="sidebar">
      <div class="links">
        <a href="#work" class="sidebar-link">Works</a>
        <a href="#use" class="sidebar-link">Uses</a>
        <a href="https://blog.ryoo.cc" target="_blank" rel="noreferrer" class="sidebar-link">Blog</a>
      </div>
      <div class="sns">
        <a href="https://twitter.com/ryoo141" target="_blanck" rel="noreferrer"><i class="ti ti-brand-twitter" /></a>
        <a href="https://github.com/ryoo14" target="_blanck" rel="noreferrer"><i class="ti ti-brand-github" /></a>
        <a href="https://www.instagram.com/ryoo141" target="_blanck" rel="noreferrer"><i class="ti ti-brand-instagram" /></a>
        <a href="https://atcoder.jp/users/ryoo14" target="_blanck" rel="noreferrer"><i class="ti ti-code" /></a>
      </div>
    </div>
  )
}

export const ContentTemplate = (props: Contents) => {
  return (
    <div class={ props.type }>
      { props.contents.map((content) => (
        <div class="content">
          <p>{ content.title }</p>
          <p>{ content.thumbnail }</p>
          <p>{ content.detail }</p>
          <p>{ content.url }</p>
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
  detail: string;
  thumbnail: string;
  url: string;
}
