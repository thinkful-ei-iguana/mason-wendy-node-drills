/* eslint-disable quotes */
const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(morgan("dev"));

app.get("/sum", (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  if (!a || !b) {
    return res.status(400).send("queries must be numbers");
  }
  const sum = `the sum of ${a} and ${b} is ${a + b}`;
  console.log(req.query);
  res.send(sum);
});

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

app.get("/lotto", (req, res) => {
  const money = req.query.arr;
  console.log(money);
  if (!money) {
    return res.status(400).send("numbers are required");
  }
  const luck = money
    .map(draw => parseInt(draw))
    .filter(draw => draw >= 1 && draw <= 20);

  if (luck.length !== 6) {
    return res.status(400).send("must select 6 numbers between 1 and 20");
  }

  const rando = Array(20)
    .fill(1)
    .map((_, i) => i + 1);

  const bigMONEY = [];
  for (let i = 0; i < 6; i++) {
    const ran = Math.floor(Math.random() * rando.length);
    bigMONEY.push(rando[ran]);
    rando.splice(ran, 1);
  }

  let diff = bigMONEY.filter(buck => !luck.includes(buck));
  let response;
  switch (diff.length) {
    case 0:
      response = "you won??!?!?!";
      break;
    case 1:
      response = "you won $100!";
      break;
    case 2:
      response = "you won a free ticket";
      break;
    default:
      response = "sorry, you lose";
  }
  const responseText = `Your numbers were: ${bigMONEY}. The winning numbers are ${money} ${response}`;
  res.send(responseText);
});
