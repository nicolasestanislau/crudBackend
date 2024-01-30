const express = require("express");
const todosRoutes = require("./Routes/routes");

console.log("todosRoutes ", todosRoutes);
const app = express();

app.use(express.json());
app.use(todosRoutes);

app.get("/health", (req, res) => {
  return res.json("up");
});

app.listen(3333, () => console.log("Server up in 3333"));
