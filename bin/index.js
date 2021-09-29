#! /usr/bin/env node
const { Command } = require("commander");
const inquirer = require("inquirer");
const program = new Command();

const { apiCall } = require("../constants/apiCalls");
const { errorOutput } = require("../constants/messages");
const { inputData } = require("../constants/input");

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
program.option("-o, --output <format>", "Select output format JSON/TABLE");

program.option("-D, --debug", "See the Responses in Debug Mode");

program.parse(process.argv);

const options = program.opts();
