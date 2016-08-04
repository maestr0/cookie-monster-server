import mcpadc from 'mcp-spi-adc'
import logger from '../logs'

const tempSensor = mcpadc.open(0, {speedHz: 20000}, (err) => {
  if (err) {
    logger.log('error', 'Temperature sensor error', err);
  }
});

function readTemperature(callback) {
  tempSensor.read(callback);
}

function convertToF(cTempVal) {
  return (cTempVal * (9 / 5)) + 32;
}

module.exports = {readTemperature, convertToF};
