import Botkit from 'botkit'
import logger from '../logs'

export  default ()=> {

  let token = process.env.SLACK_API_TOKEN || '';
  let controller = Botkit.slackbot({
    debug: false,
    logger: logger
  });
  
  controller.spawn({token: token}).startRTM();

  controller.hears('help', ['direct_message', 'direct_mention'], (bot, message) => {
    bot.reply(message, 'Hello yourself.');
  });

  controller.hears('', ['direct_message', 'direct_mention'], (bot, message) => {
    bot.reply(message, 'say `help` for help');
  });
}
