/* @flow */

require('dotenv').config();
import express from 'express'
import expressSetup  from './server/express.setup'
import temp from './temperature'
import slack from './slack'


const app = express();
app.set('views', __dirname + '/../views');
app.set('view engine', 'pug');

expressSetup(app);

slack();

temp();
