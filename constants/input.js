exports.inputData = [
  {
    name: "year",
    message: "When did the movie released?(format: yyyy)",
    type: "number",
  },
  {
    name: "title",
    message: "Enter movie title (Eg: Forrest Gump)",
    type: "input",
  },
  {
    name: "plot",
    message: "Enter movie plot (Eg: A college Dropout exploring the nature)",
    type: "input",
  },
  {
    name: "rating",
    message: "How much do you like the movie out of 10? (Eg: 7)",
    type: "list",
    choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  },
  {
    name: "actors",
    message: "Enter movie cast (Eg: Tom Hanks, Chris Evans, Gal Gadot)",
    type: "input",
  },
  {
    name: "string",
    message: "Enter the value you want to query/scan (Eg: Iron)",
    type: "input",
  },
  {
    name: "number",
    message: "Enter the year you want to search(format: yyyy)",
    type: "number",
  },
];
