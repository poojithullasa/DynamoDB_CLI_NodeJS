const AWS = require("aws-sdk");
const messages = require("../constants/messages");

AWS.config.update({
  region: "Mumbai",
  endpoint: "http://localhost:8000",
});

const docClient = new AWS.DynamoDB.DocumentClient();

const table = "Movies";

const title = "The Big New Movie";
const year = 2015;

exports.addItem = (request, response) => {
  const params = {
    TableName: table,
    Item: {
      year: Number(request.params.year),
      title: request.params.title,
      info: {
        plot: request.params.plot,
        rating: Number(request.params.rating),
      },
    },
  };
  docClient.put(params, (error, data) => {
    if (error) {
      response.send(
        messages.errorResponse(
          error,
          `Sorry, Unable to add item in table ${params.TableName}`
        )
      );
    } else {
      response.send(
        messages.dataResponse(
          params.Item,
          `Successfully added item in table ${params.TableName}`
        )
      );
    }
  });
};

exports.removeItem = (request, response) => {
  const params = {
    TableName: table,
    Key: {
      year: Number(request.params.year),
      title: request.params.title,
    },
  };
  docClient.delete(params, (error, data) => {
    if (error) {
      response.send(
        messages.errorResponse(
          error,
          `Sorry, Unable to remove item in table ${params.TableName}`
        )
      );
    } else {
      response.send(
        messages.dataResponse(
          params.Key,
          `Successfully removed item in table ${params.TableName}`
        )
      );
    }
  });
};

exports.readItem = (request, response) => {
  const params = {
    TableName: table,
    Key: {
      year: Number(request.params.year),
      title: request.params.title,
    },
  };
  docClient.get(params, (error, data) => {
    if (error) {
      response.send(
        messages.errorResponse(
          error,
          `Sorry, Unable to read item in table ${params.TableName}`
        )
      );
    } else {
      response.send(
        messages.dataResponse(
          data,
          `Successfully read item in table ${params.TableName}`
        )
      );
    }
  });
};

exports.updateItem = (request, response) => {
  const params = {
    TableName: table,
    Key: {
      year: Number(request.params.year),
      title: request.params.title,
    },
    UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
    ExpressionAttributeValues: {
      ":r": Number(request.params.rating),
      ":p": request.params.plot,
      ":a": request.params.actors.split(", "),
    },
    ReturnValues: "UPDATED_NEW",
  };
  docClient.update(params, (error, data) => {
    if (error) {
      response.send(
        messages.errorResponse(
          error,
          `Sorry, Unable to update item in table ${params.TableName}`
        )
      );
    } else {
      response.send(
        messages.dataResponse(
          data,
          `Successfully updated item in table ${params.TableName}`
        )
      );
    }
  });
};

exports.containsKey = (request, response) => {
  const params = {
    TableName: "Movies",
    ProjectExpression: "#title",
    FilterExpression: "contains(#title, :string)",
    ExpressionAttributeNames: {
      "#title": "title",
    },
    ExpressionAttributeValues: {
      ":string": request.params.string,
    },
  };
  docClient.scan(params, (error, data) => {
    if (error) {
      response.send(
        messages.errorResponse(
          error,
          `Sorry, Unable to Query Contains ${params.ExpressionAttributeValues[":string"]} in the table ${params.TableName}`
        )
      );
    } else {
      response.send(
        messages.dataResponse(
          data,
          `Successfully Queried Contains ${params.ExpressionAttributeValues[":string"]} in the table ${params.TableName}`
        )
      );
    }
  });
};

exports.startsWith = (request, response) => {
  const params = {
    TableName: "Movies",
    ProjectionExpression: "#yr, title, info.genres, info.actors[0]",
    KeyConditionExpression: "#yr= :yyyy and begins_with(title, :string)",
    ExpressionAttributeNames: {
      "#yr": "year",
    },
    ExpressionAttributeValues: {
      ":yyyy": Number(request.params.number),
      ":string": request.params.string,
    },
  };
  docClient.query(params, (error, data) => {
    if (error) {
      response.send(
        messages.errorResponse(
          error,
          `Sorry, Unable to scan starts-with ${params.ExpressionAttributeValues[":string"]} in the table ${params.TableName} for the year ${params.ExpressionAttributeValues[":yyyy"]}`
        )
      );
    } else {
      response.send(
        messages.dataResponse(
          data,
          `Successfully scanned, starts-with ${params.ExpressionAttributeValues[":string"]} in the table ${params.TableName} for the year ${params.ExpressionAttributeValues[":yyyy"]}`
        )
      );
    }
  });
};

exports.equals = (request, response) => {
  const params = {
    TableName: "Movies",
    KeyConditionExpression: "#yr= :yyyy",
    ExpressionAttributeNames: {
      "#yr": "year",
    },
    ExpressionAttributeValues: {
      ":yyyy": Number(request.params.year),
    },
  };
  docClient.query(params, (error, data) => {
    if (error) {
      response.send(
        messages.errorResponse(
          error,
          `Sorry, Unable to query equals ${params.ExpressionAttributeValues[":yyyy"]} in the table ${params.TableName}`
        )
      );
    } else {
      response.send(
        messages.dataResponse(
          data,
          `Successfully queried equals ${params.ExpressionAttributeValues[":yyyy"]} in the table ${params.TableName}`
        )
      );
    }
  });
};
