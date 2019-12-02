const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(morgan("dev"));

app.get("/queryViewer", (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  const c = parseFloat(a + b);
  const sum = `the sum of ${a} and ${b} is ${c}`;
  console.log(req.query);
  res.send(sum);
});

app.listen(8000, () => {
  console.log("Express server is listening on port 8000!");
});
