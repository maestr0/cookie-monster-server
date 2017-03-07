/* @flow */

require('dotenv').config();
import express from 'express'
import expressSetup  from './server/express.setup'
import slack from './slack'
import worker from './worker'
import logger from './logs'

const app = express();
app.set('views', __dirname + '/../views');
app.set('view engine', 'pug');

expressSetup(app);

slack();


// button is attached to pin 17, led to 18
var GPIO = require('onoff').Gpio,
    button = new GPIO(23, 'in', 'both');

// define the callback function
function light(err, state) {

  // check the state of the button
  // 1 == pressed, 0 == not pressed
  if(state == 1) {
    // turn LED on
logger.info('ON');
  } else {
    // turn LED off
logger.info('OFF');
  }

}

// pass the callback function to the
// as the first argument to watch()
button.watch(light);



logger.info('CM started');
