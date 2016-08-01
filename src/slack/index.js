import Botkit from 'botkit'

export  default ()=> {

  let token = process.env.SLACK_API_TOKEN || '';
  let controller = Botkit.slackbot({debug: false});
  controller.spawn({token: token}).startRTM();

  controller.hears('hello', ['direct_message', 'direct_mention'], (bot, message) => {
    bot.reply(message, 'Hello yourself.');
  });

  controller.hears('', ['direct_message', 'direct_mention'], (bot, message) => {
    bot.reply(message, 'List of available commands...');
  });
}
