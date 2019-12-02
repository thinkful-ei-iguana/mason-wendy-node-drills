//--------------ASSIGNMENT 1-------------------------

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
// 
// app.listen(8000, () => {
//   console.log("Express server is listening on port 8000!");
// });
//--------------ASSIGNMENT 2 BELOW-------------------------

// app.get("/cipher", (req, res) => {
//   const { text, shift } = req.query;

//   if (!text) {
//     return res.status(400).send("Must add text");
//   }
//   if (!shift) {
//     return res.status(400).send("must add number");
//   }

//   const numShift = parseFloat(shift);
//   if (Number.isNaN(numShift)) {
//     return res.status(400).send("shift must be a number");
//   }

//   const base = "A".charCodeAt(0);

//   const cipher = text
//     .toUpperCase()
//     .split("")
//     .map(char => {
//       const code = char.charCodeAt(0);

//       if (code < base || code > base + 26) {
//         return char;
//       }
//       let diff = code - base;
//       diff = diff + numShift;
//       diff = diff % 26;
//       const shiftedChar = String.fromCharCode(base + diff);
//       return shiftedChar;
//     })
//     .join("");
//   res.status(200).send(cipher);
// });
// -------------ASSIGNMENT 3 BELOW------------------

app.get('/lotto', (req, res) => {
  const { numbers } = req.query;

  if(!numbers) {
    return res
      .status(200)
      .send("numbers is required");
  }

  if(!Array.isArray(numbers)) {
    return res
      .status(200)
      .send("numbers must be an array");
  }

  const guesses = numbers
    .map(num => parseInt(num))
    .filter(num => !Number.isNaN(num) && (num >= 1 && num <= 20));

  if(guesses.length != 6) {
    return res
      .status(400)
      .send("numbers must contain 6 integers between 1 and 20");
  }

  const stockNumbers = Array(20).fill(1).map((_, i) => i + 1);

  const winningNumbers = [];
  for(let i = 0; i < 6; i++) {
    const ran = Math.floor(Math.random() * stockNumbers.length);
    winningNumbers.push(stockNumbers[ran]);
    stockNumbers.splice(ran, 1);
  }

  //compare the guesses to the winning number
  let diff = winningNumbers.filter(num => !guesses.includes(num));

  let responseText;
 
  switch(diff.length){
  case 0: 
    responseText = 'Wow! Unbelievable! You could have won the mega millions!';
    break;
  case 1:   
    responseText = 'Congratulations! You win $100!';
    break;
  case 2:
    responseText = 'Congratulations, you win a free ticket!';
    break;
  default:
    responseText = 'Sorry, you lose';  
  }
 
 
  // uncomment below to see how the results ran
 
  // res.json({
  //   guesses,
  //   winningNumbers,
  //   diff,
  //   responseText
  // });
 
  res.send(responseText);
});
 
app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});

//so i followed the solution exactly and i still cannot figure out how to work it
// this is what i tried using in URL = http://localhost:8000/lotto?n=3&n=4&n=9&n=12&n=16&n=19