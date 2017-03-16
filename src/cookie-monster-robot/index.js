`use strict`
import logger from '../logs'
import servos from '../servos'
import sensors from '../sensors'
import {
  Gpio
} from 'onoff'
import tts from '../tts'

function CookieMonsterRobot(configuration) {

  function Actions() {

  }

  function selfCheck() {
    sensors.lcd.setText("SELF CHECK SELF CHECK SELF CHECK SELF CHECK");
    return true;
  }

  function _bindEvents() {
    let buttonLeft = new Gpio(23, 'in', 'both');
    let buttonRight = new Gpio(23, 'in', 'both');

    buttonLeft.watch((err, state) => {
      if (state == 1) {
        // turn LED on
        logger.info('L ON');
      } else {
        // turn LED off
        logger.info('L OFF');
      }
    });
    buttonRight.watch((err, state) => {
      if (state == 1) {
        // turn LED on
        logger.info('R ON');
      } else {
        // turn LED off
        logger.info('R OFF');
      }
    });
  }



}

module.exports = CookieMonsterRobot
