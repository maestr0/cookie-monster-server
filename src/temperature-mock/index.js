function readTemperature(callback) {
  callback(null, 26);
}

function convertToF(cTempVal) {
  return (cTempVal * (9 / 5)) + 32;
}

module.exports = {readTemperature, convertToF};
