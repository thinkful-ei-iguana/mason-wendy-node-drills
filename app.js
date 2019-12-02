const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(morgan("dev"));

app.get("/sum", (req, res) => {
  const sum = `the sum of ${req.query.a} and ${req.query.b} is c`;
  console.log(req.query);
});

app.listen(8000, () => {
  console.log("Express server is listening on port 8000!");
});
