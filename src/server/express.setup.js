import bodyParser from 'body-parser'
import morgan from 'morgan'
import router from '../routes'
import express from 'express'

export default (app) => {

  app.use('/', router);
  app.use(express.static(__dirname + '/../../public'));
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  let port = process.env.PORT || 3000;

  app.listen(port, ()=> {
    console.log('server is listening on port ' + port);
  });
}
