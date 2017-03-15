'use strict'

import express from 'express'
import sensors from '../sensors'

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Cookie Monster (ro)BOT'
  });
});

router.get('/sensors', function(req, res, next) {
  sensors.temp.readTemperature((temp) => {
    sensors.light((light) => {
      sensors.proximity((distance) => {
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
