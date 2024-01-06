import { Hono } from "hono"
import { basicAuth } from "hono/basic-auth"
import { serveStatic } from "hono/cloudflare-workers"

const app = new Hono()

const Home = () => {
  return (
    <html>
      <head>
      </head>
      <body>
        Hello, Hono
      </body>
    </html>
  );
};

app.get("/", (c) => {
  return c.html(<Home />)
})

app.get("/posts/:id", (c) => {
  const page = c.req.query("page")
  const id = c.req.query("id")
  return c.text(`${page} is ${id}`)
})

app.use(
  "/admin/*",
  basicAuth({
    username: "admin",
    password: "admin",
  })
)

app.get("/admin", (c) => {
  return c.text("you are admin.")
})

app.get("/hoge", serveStatic({ path: "./static/hoge.html" }))

app.get("/render", (c) => {
  return c.html(<h1>fufufu</h1>)
})

export default app
