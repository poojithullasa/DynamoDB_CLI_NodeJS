exports.errorResponse = (error) => {
  return `${JSON.stringify(error, null, 2)}`;
};

exports.dataResponse = (data) => {
  return `${JSON.stringify(data, null, 2)}`;
};
