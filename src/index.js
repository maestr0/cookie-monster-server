/* @flow */

require('dotenv').config();
import express from 'express'
import expressSetup  from './server/express.setup'
import slack from './slack'
import worker from './worker'
import logger from './logs'
import pwm from './servos'
import robot from './cookie-monster-robot'


const app = express();
app.set('views', __dirname + '/../views');
app.set('view engine', 'pug');

expressSetup(app);
slack(robot);
logger.info('CM started');






// pulse lengths in microseconds (theoretically, 1.5 ms
// is the middle of a typical servo's range)
// var pulseLengths = [1000, 1700, 3400];
// var steeringChannel = 0;
//
//
// // variables used in servoLoop
// var nextPulse = 0;
// var timer;
//
//
// // loop to cycle through pulse lengths
// function servoLoop() {
//     timer = setTimeout(servoLoop, 500);
//
//     pwm.setPulseLength(0, pulseLengths[nextPulse]);
//     pwm.setPulseLength(4, pulseLengths[nextPulse]);
//     pwm.setPulseLength(8, pulseLengths[nextPulse]);
//     pwm.setPulseLength(12, pulseLengths[nextPulse]);
//     nextPulse = (nextPulse + 1) % pulseLengths.length;
// }
//
// servoLoop();
