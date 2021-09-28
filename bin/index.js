#! /usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const { apiCall } = require("../constants/apiCalls");
const { errorOutput } = require("../constants/messages");
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
    apiCall("POST", "/item/add");
  });
program
  .command("read-item")
  .description("Read item from the table movies")
  .action(() => {
    apiCall("GET", "/item/read");
  });
program
  .command("update-item")
  .description("Update existing item in the table movies")
  .action(() => {
    apiCall("PATCH", "/item/update");
  });
program
  .command("remove-item")
  .description("Remove item in the table movies")
  .action(() => {
    apiCall("DELETE", "/item/remove");
  });

//Additional Query Commands
program
  .command("contains")
  .description(
    "Check if there is any item contains entered value in the table movies"
  )
  .action(() => {
    apiCall("GET", "/item/contains");
  });
program
  .command("starts")
  .description(
    "Check if there is any item starts with entered value in the table movies"
  )
  .action(() => {
    apiCall("GET", "/item/starts");
  });
program
  .command("equals")
  .description(
    "Check if there is any item equals entered value in the table movies"
  )
  .action(() => {
    apiCall("GET", "/item/equals");
  });

//options
program.option("-o, --output <format>", "Select output format JSON/TABLE");

program.option("-D, --debug", "See the Responses in Debug Mode");

program.parse(process.argv);

const options = program.opts();
