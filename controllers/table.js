const AWS = require("aws-sdk");
const fs = require("fs");
const messages = require("../constants/messages");

AWS.config.update({
  region: "Mumbai",
  endpoint: "http://localhost:8000",
});

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

exports.createTable = (request, response) => {
  const params = {
    TableName: "Movies",
    KeySchema: [
      { AttributeName: "year", KeyType: "HASH" },
      { AttributeName: "title", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "year", AttributeType: "N" },
      { AttributeName: "title", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };

  dynamodb.createTable(params, (error, data) => {
    if (error) {
      response.send(
        messages.errorResponse(
          error,
          `Sorry, Unable to Create table ${params.TableName}`
        )
      );
    } else {
      response.send(
        messages.dataResponse(
          data,
          `Successfully Created table ${params.TableName}`
        )
      );
    }
  });
};

exports.deleteTable = (request, response) => {
  const params = {
    TableName: "Movies",
  };
  dynamodb.deleteTable(params, (error, data) => {
    if (error) {
      response.send(
        messages.errorResponse(
          error,
          `Sorry, Unable to delete table ${params.TableName}`
        )
      );
    } else {
      response.send(
        messages.dataResponse(
          data,
          `Successfully deleted table ${params.TableName}`
        )
      );
    }
  });
};

exports.loadTable = (request, response) => {
  const dataItems = JSON.parse(fs.readFileSync("moviedata.json", "utf-8"));
  dataItems.forEach((item) => {
    const params = {
      TableName: "Movies",
      Item: {
        year: item.year,
        title: item.title,
        info: item.info,
      },
    };
    docClient.put(params, (error, data) => {
      if (error) {
        response.send(
          messages.errorResponse(
            error,
            `Sorry, Cannot add Items in the table ${params.TableName}`
          )
        );
      }
    });
  });
  response.send(messages.dataResponse(dataItems, `Successfully Added Items`));
};
