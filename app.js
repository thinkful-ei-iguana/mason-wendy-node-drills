/* eslint-disable quotes */
const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(morgan("dev"));

// app.get("/queryViewer", (req, res) => {
//   const a = parseFloat(req.query.a);
//   const b = parseFloat(req.query.b);
//   const c = parseFloat(a + b);
//   const sum = `the sum of ${a} and ${b} is ${c}`;
//   console.log(req.query);
//   res.send(sum);
// });

app.listen(8000, () => {
  console.log("Express server is listening on port 8000!");
});

app.get("/cipher", (req, res) => {
  const { text, shift } = req.query;

  if (!text) {
    return res.status(400).send("Must add text");
  }
  if (!shift) {
    return res.status(400).send("must add number");
  }

  const numShift = parseFloat(shift);
  if (Number.isNaN(numShift)) {
    return res.status(400).send("shift must be a number");
  }

  const base = "A".charCodeAt(0);

  const cipher = text
    .toUpperCase()
    .split("")
    .map(char => {
      const code = char.charCodeAt(0);

      if (code < base || code > base + 26) {
        return char;
      }
      let diff = code - base;
      diff = diff + numShift;
      diff = diff % 26;
      const shiftedChar = String.fromCharCode(base + diff);
      return shiftedChar;
    })
    .join("");
  res.status(200).send(cipher);
});
