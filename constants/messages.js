exports.errorResponse = (error) => {
  return `${JSON.stringify(error, null, 2)}`;
};

exports.dataResponse = (data) => {
  return `${JSON.stringify(data, null, 2)}`;
};

exports.errorOutput = (options) => {
  return `Sorry we haven't added the options ${options} Yet.\nPlease enter "dracarys -h" for any help.`;
};
