import mcpadc from 'mcp-spi-adc'
import logger from '../logs'

const tempSensorPin = 0

const tempSensor = mcpadc.open(tempSensorPin, {speedHz: 20000}, (err) => {
  if (err) {
    logger.log('error', 'Temperature sensor error', err);
  }
});

function readTemperature(callback) {
  tempSensor.read((err, reading) => {
    callback((reading.value * 3.3 - 0.5) * 100);
  });
}

function convertToF(cTempVal) {
  return (cTempVal * (9 / 5)) + 32;
}

module.exports = {readTemperature, convertToF};
