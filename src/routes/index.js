import express from 'express'
import {
  readTemperature
} from '../temperature'
import readLight from '../light-sensor'
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
      res.render('sensors', {
        temp: temp,
        light: light,
        sound: 222
      });
    })
  })
});


module.exports = router;
