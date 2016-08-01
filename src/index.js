/* @flow */

import express from 'express'
import expressSetup  from './server/express.setup'
import temp from './temperature'
require('dotenv').config();

const app = express();
app.set('views', __dirname + '/../views');
app.set('view engine', 'pug');

expressSetup(app);


temp();
