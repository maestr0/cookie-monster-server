'use strict'

import express from 'express'
import {readTemperature} from '../temperature'
import readLight from '../light-sensor'
import readProximity from '../proximity-sensor'
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Cookie Monster (ro)BOT'
  });
});

router.get('/sensors', function(req, res, next) {
  readTemperature((temp) => {
    readLight((light) => {
      readProximity((distance) => {
        res.render('sensors', {
          temp: temp,
          light: light,
          proximity: distance
        });
      });
    })
  })
});


module.exports = router;
