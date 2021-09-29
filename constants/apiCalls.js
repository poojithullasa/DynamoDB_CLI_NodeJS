const { default: axios } = require("axios");
const index = require("../bin/index");

exports.apiCall = (method, url) => {
  axios({
    method: method,
    baseURL: "http://localhost:5000",
    url: url,
  })
    .then(function (response) {
      index.successMessage(response);
    })
    .catch(function (error) {
      index.errorMessage(error);
    });
};
