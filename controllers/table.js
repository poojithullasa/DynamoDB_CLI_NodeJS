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
        messages.errorResponse({
          route: "/table/create",
          message: "Sorry, Cannot Create Table",
          details: params,
          error: error,
        })
      );
    } else {
      response.send(
        messages.dataResponse({
          route: "/table/create",
          message: "Successfully Created Table",
          details: params,
          data: data,
        })
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
        messages.errorResponse({
          route: "/table/delete",
          message: "Sorry, Cannot Delete Table",
          details: params,
          error: error,
        })
      );
    } else {
      response.send(
        messages.dataResponse({
          route: "/table/delete",
          message: "Successfully Deleted Table",
          details: params,
          data: data,
        })
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
          messages.errorResponse({
            route: "/table/load",
            message: "Sorry, Cannot Add Sample Data to the Table",
            details: params,
            error: error,
          })
        );
      }
    });
  });
  response.send(
    messages.dataResponse({
      route: "/table/load",
      message: "Successfully Loaded Table with Sample Data",
      details: "Loaded Sample data from moviesdata.json file in root folder",
      data: dataItems,
    })
  );
};

exports.getAll = (request, response) => {
  const params = {
    TableName: "Movies",
    Select: "ALL_ATTRIBUTES",
  };
  dynamodb.scan(params, (error, data) => {
    if (error) {
      response.send(
        messages.errorResponse({
          route: "/table/getall",
          message: "Sorry, Cannot get all Items in the Table",
          details: params,
          error: error,
        })
      );
    } else {
      response.send(
        messages.dataResponse({
          route: "/table/getall",
          message: "Successfully got all Items in the Table",
          details: params,
          data: data,
        })
      );
    }
  });
};
