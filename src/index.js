/* @flow */

import express from 'express'
import expressSetup  from './server/express.setup'

const app = express();
app.set('views', __dirname + '/../views');
app.set('view engine', 'pug');

expressSetup(app);
