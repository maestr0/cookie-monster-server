import winston from 'winston'
require('winston-loggly-bulk');
require('dotenv').config();

winston.add(winston.transports.Loggly, {
  token: process.env.LOGGLY_API_TOKEN,
  subdomain: process.env.LOGGLY_API_SUBDOMAIN,
  tags: ["cookie-monster"],
  json:true
});

winston.log('info',"Cookie Monster started");

export default winston;

