#! /usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const inquirer = require("inquirer");
const { apiCall } = require("../constants/apiCalls");
const Table = require("cli-table");
const table = new Table({
  chars: {
    top: "═",
    "top-mid": "╤",
    "top-left": "╔",
    "top-right": "╗",
    bottom: "═",
    "bottom-mid": "╧",
    "bottom-left": "╚",
    "bottom-right": "╝",
    left: "║",
    "left-mid": "╟",
    mid: "─",
    "mid-mid": "┼",
    right: "║",
    "right-mid": "╢",
    middle: "│",
  },
});
const { inputData } = require("../constants/input");
const colors = require("colors/safe");

//version
program.version("1.0.0");

//Table commands
program
  .command("create-table")
  .description("Create a new Movies Table")
  .action(() => {
    apiCall("POST", "/table/create");
  });
program
  .command("delete-table")
  .description("Delete Movies table")
  .action(() => {
    apiCall("DELETE", "/table/delete");
  });
program
  .command("load-table")
  .description("load Movies table with default data")
  .action(() => {
    apiCall("POST", "/table/load");
  });

//Item Commands
program
  .command("add-item")
  .description("Add item to the table movies")
  .action(() => {
    inquirer.prompt(inputData.slice(0, 4)).then((answers) => {
      apiCall(
        "POST",
        `/item/add/${answers.year}&${answers.title}&${answers.plot}&${answers.rating}`
      );
    });
  });
program
  .command("read-item")
  .description("Read item from the table movies")
  .action(() => {
    inquirer.prompt(inputData.slice(0, 2)).then((answers) => {
      apiCall("GET", `/item/read/${answers.year}&${answers.title}`);
    });
  });
program
  .command("update-item")
  .description("Update existing item in the table movies")
  .action(() => {
    inquirer.prompt(inputData.slice(0, 5)).then((answers) => {
      apiCall(
        "PATCH",
        `/item/update/${answers.year}&${answers.title}&${answers.plot}&${answers.rating}&${answers.actors}`
      );
    });
  });
program
  .command("remove-item")
  .description("Remove item in the table movies")
  .action(() => {
    inquirer.prompt(inputData.slice(0, 2)).then((answers) => {
      apiCall("DELETE", `/item/remove/${answers.year}&${answers.title}`);
    });
  });

//Additional Query Commands
program
  .command("contains")
  .description(
    "Check if there is any item contains entered value in the table movies"
  )
  .action(() => {
    inquirer.prompt(inputData.slice(5, 6)).then((answers) => {
      apiCall("GET", `/item/contains/${answers.string}`);
    });
  });
program
  .command("starts")
  .description(
    "Check if there is any item starts with entered value in the table movies"
  )
  .action(() => {
    inquirer.prompt(inputData.slice(5)).then((answers) => {
      apiCall("GET", `/item/starts/${answers.string}&${answers.number}`);
    });
  });
program
  .command("equals")
  .description(
    "Check if there is any item equals entered value in the table movies"
  )
  .action(() => {
    inquirer.prompt(inputData.slice(0, 1)).then((answers) => {
      apiCall("GET", `/item/equals/${answers.year}`);
    });
  });

//options
program.option(
  "-j, --json",
  "See the Responses in JSON Format (Priority Level: Medium)"
);
program.option(
  "-t, --table",
  "See the Responses in Table Format (Priority Level: Low)"
);
program.option(
  "-d, --debug",
  "See the Responses in Debug Mode (Priority Level: Highest)"
);

program.parse(process.argv);

const options = program.opts();

//Output Messages
exports.successMessage = (response) => {
  if (options.debug) {
    console.log(colors.yellow(response));
  } else if (options.json) {
    jsonOutput(response);
  } else if (options.table) {
    const route = response.data.route;
    switch (route) {
      case "/item/read":
        readOutput(response);
        break;

      case "/item/contains":
        tableOutput(response);
        break;

      case "/item/equals":
        tableOutput(response);
        break;

      case "/item/starts":
        tableOutput(response);
        break;

      default:
        jsonOutput(response);
        break;
    }
  } else {
    console.log(colors.green(`${response.data.message}.`));
  }
};

exports.errorMessage = (error) => {
  if (options.debug) {
    console.log(colors.red(error));
  } else {
    console.log(colors.red(error.config));
  }
};

function tableOutput(response) {
  const contain = response.data.data;
  table.push(["Title", "Year", "Rating", "Actors"]);
  contain.Items.map((element) => {
    table.push([
      `${element.title} `,
      `${element.year} `,
      `${element.info.rating}`,
      `${element.info.actors.join(", ")} `,
    ]);
  });
  console.log(colors.magenta.bold(table.toString()));
  console.log(
    colors.rainbow(`Number of items matched query: ${contain.Count}`)
  );
}

function readOutput(response) {
  const read = response.data.data.Item;
  table.push(
    { Title: read.title },
    { Year: read.year },
    { Rating: read.info.rating },
    { Actors: read.info.actors.join(", ") }
  );
  console.log(colors.magenta.bold(table.toString()));
}

function jsonOutput(response) {
  if (response.data.route.includes("table")) {
    if (response.data.message.includes("Sorry")) {
      console.log(colors.red(response.data.error));
    } else {
      console.log(colors.cyan(response.data.details));
    }
  } else {
    if (response.data.message.includes("Sorry")) {
      console.log(colors.red(response.data));
    } else if (response.data.route == "/item/read") {
      console.log(colors.cyan(response.data.data.Item));
    } else {
      if (response.data.data.Items != undefined) {
        console.log(colors.cyan(response.data.data.Items));
      } else {
        console.log(colors.cyan(response.data));
      }
    }
  }
}
