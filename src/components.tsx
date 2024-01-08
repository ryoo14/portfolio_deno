export const Home = (props) => {
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
      <a href="#work" class="sidebar-link">Works</a>
      <a href="#use" class="sidebar-link">Uses</a>
      <a href="https://blog.ryoo.cc" target="_blank" rel="noreferrer" class="sidebar-link">Blog</a>
      <a href="#link" class="sidebar-link">Links</a>
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
