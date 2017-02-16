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

logger.info('CM started');
