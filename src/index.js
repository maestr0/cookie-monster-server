/* @flow */

import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'
import morgan from 'morgan'

const app = express()
const upload = multer()

app.use(express.static(__dirname + '/../public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, ()=> {
  console.log("server is listening on port 3000");
});

app.get('/hello', (req, res) => {
  res.send('world');
});
