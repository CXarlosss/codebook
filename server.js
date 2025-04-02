// @ts-nocheck
// server.js
const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");

const app = jsonServer.create();
const router = jsonServer.router("data/db.json");

const middlewares = jsonServer.defaults();

app.db = router.db;

app.use(cors());
app.use(middlewares);
app.use(auth); // añade login/register
app.use(router);

app.listen(8000, () => {
  console.log("JSON Server with Auth running on http://localhost:8000");
});
