const { default: axios } = require("axios");

exports.apiCall = (method, url) => {
  axios({
    method: method,
    baseURL: "http://localhost:5000",
    url: url,
  })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
