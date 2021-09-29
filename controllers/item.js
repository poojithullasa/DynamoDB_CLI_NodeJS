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
        messages.errorResponse({
          route: "/item/add",
          message: "Sorry, Cannot Add Item",
          details: params,
          error: error,
        })
      );
    } else {
      response.send(
        messages.dataResponse({
          route: "/item/add",
          message: "Successfully Added Item",
          details: params,
          data: data,
        })
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
        messages.errorResponse({
          route: "/item/delete",
          message: "Sorry, Cannot Delete Item",
          details: params,
          error: error,
        })
      );
    } else {
      response.send(
        messages.dataResponse({
          route: "/item/delete",
          message: "Successfully Delete Item",
          details: params,
          data: data,
        })
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
        messages.errorResponse({
          route: "/item/read",
          message: "Sorry, Cannot Read Item",
          details: params,
          error: error,
        })
      );
    } else {
      response.send(
        messages.dataResponse({
          route: "/item/read",
          message: "Successfully Read Item",
          details: params,
          data: data,
        })
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
        messages.errorResponse({
          route: "/item/update",
          message: "Sorry, Cannot Update Item",
          details: params,
          error: error,
        })
      );
    } else {
      response.send(
        messages.dataResponse({
          route: "/item/update",
          message: "Successfully Updated Item",
          details: params,
          data: data,
        })
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
        messages.errorResponse({
          route: "/item/contains",
          message: "Sorry, Cannot Scan Contains in Table",
          details: params,
          error: error,
        })
      );
    } else {
      response.send(
        messages.dataResponse({
          route: "/item/contains",
          message: "Successfully Scanned Contains in Table",
          details: params,
          data: data,
        })
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
        messages.errorResponse({
          route: "/item/starts",
          message: "Sorry, Cannot Query Starts With",
          details: params,
          error: error,
        })
      );
    } else {
      response.send(
        messages.dataResponse({
          route: "/item/starts",
          message: "Successfully Queried Starts With",
          details: params,
          data: data,
        })
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
        messages.errorResponse({
          route: "/item/equals",
          message: "Sorry, Cannot Query Equals",
          details: params,
          error: error,
        })
      );
    } else {
      response.send(
        messages.dataResponse({
          route: "/item/equals",
          message: "Successfully Queried Equals",
          details: params,
          data: data,
        })
      );
    }
  });
};
