import mcpadc from 'mcp-spi-adc'
import logger from '../logs'

const lightSensorPin = 1

const lightSensor = mcpadc.open(lightSensorPin, {speedHz: 20000}, (err) => {
  if (err) {
    logger.log('error', 'Light sensor error', err);
  }
});

function readLight(callback) {
  lightSensor.read((err, reading) => {
    callback((reading.value * 3.3 - 0.5) * 100);
  });
}

module.exports = readLight
