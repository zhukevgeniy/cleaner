const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askPhoneCode = () => {
  return new Promise((resolve) => {
    rl.question("Enter phone code: ", (answer) => {
      resolve(Number(answer));

      rl.close();
    });
  });
};

module.exports = { askPhoneCode };
