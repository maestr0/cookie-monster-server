import i2cBus from 'i2c-bus'
import {Pca9685Driver} from 'pca9685'
import logger from '../logs'

var options = {
    i2c: i2cBus.openSync(1),
    address: 0x40,
    frequency: 50,
    debug: false
};
var pwm = new Pca9685Driver(options, function(err) {
    if (err) {
        logger.error("Error initializing PCA9685");
        process.exit(-1);
    }
    logger.log("Initialization done");
});

module.exports = pwm
