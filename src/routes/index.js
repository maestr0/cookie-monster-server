import express from 'express'
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cookie Monster (ro)BOT' });
});

router.get('/sensors', function(req, res, next) {
  res.render('sensors', { temp: 666, light: 123, sound: 222 });
});


module.exports = router;
