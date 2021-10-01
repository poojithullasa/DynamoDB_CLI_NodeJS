const colors = require("colors/safe");

exports.authFunction = (key) => {
  if (key != "1234") {
    console.log(
      colors.red("Sorry, you are not authorised to perform the action")
    );
    process.exit(1);
  }
};
