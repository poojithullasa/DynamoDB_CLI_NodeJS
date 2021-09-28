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
      year: year,
      title: title,
      info: {
        plot: "Nothing happens at all.",
        rating: 0,
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
      title: title,
      year: year,
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
      year: year,
      title: title,
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
      year: year,
      title: title,
    },
    UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
    ExpressionAttributeValues: {
      ":r": 5.5,
      ":p": "Everything happens all at once.",
      ":a": ["Larry", "Moe", "Curly"],
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
      ":string": "The Big",
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
      ":yyyy": 1992,
      ":string": "A",
    },
  };
  docClient.query(params, (error, data) => {
    if (error) {
      response.send(
        messages.errorResponse(
          error,
          `Sorry, Unable to scan starts-with ${params.ExpressionAttributeValues[":string"]} in the table ${params.TableName}`
        )
      );
    } else {
      response.send(
        messages.dataResponse(
          data,
          `Successfully scanned, starts-with ${params.ExpressionAttributeValues[":string"]} in the table ${params.TableName}`
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
      ":yyyy": 1985,
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
