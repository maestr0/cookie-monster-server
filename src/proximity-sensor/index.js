import mcpadc from 'mcp-spi-adc'
import logger from '../logs'

const proximitySensorPin = 8

const proxSensor = mcpadc.open(proximitySensorPin, {speedHz: 20000}, (err) => {
  if (err) {
    logger.log('error', 'Proximity sensor error', err);
  }
});

function read(callback) {
  proxSensor.read((err, reading) => {
    callback(reading.value);
  });
}

module.exports = read
