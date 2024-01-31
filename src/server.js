const express = require("express");
const todosRoutes = require("./Routes/routes");
const cors = require("cors");
console.log("todosRoutes ", todosRoutes);
const app = express();

app.use(express.json());
app.use(cors());
app.use(todosRoutes);

app.get("/health", (req, res) => {
  return res.json("up");
});

app.listen(3333, () => console.log("Server up in 3333"));
