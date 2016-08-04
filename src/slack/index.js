import Botkit from 'botkit'
import logger from '../logs'
import tts from '../tts'

let config = {
  admin: "U026P8Q1D"
};

function isAdmin(user) {
  return user === config.admin
}

function execute(text, callback) {
  tts(text, function (err, stdout, stderr) {
    console.log(err + stdout + stderr);
    callback(err + stdout + stderr)
  })
}

export  default ()=> {

  let token = process.env.SLACK_API_TOKEN || '';
  let controller = Botkit.slackbot({
    debug: false,
    logger: logger
  });

  controller.spawn({token: token}).startRTM();

  controller.hears('help', ['direct_message', 'direct_mention'], (bot, message) => {
    let body = "List of available commands:\n\n";
    if (isAdmin(message.user)) {
      body += "Admin only:\n\n";
      body += "`exec` - to execute shell command\n";
      body += "\n\n";
    }
    body += "`help` - to show this list\n";
    body += "`say` - to Text To Speech. e.g. say Hello Pawel\n";
    bot.reply(message, body);
  });

  controller.hears('say', ['direct_message', 'direct_mention'], (bot, message) => {
    tts(message.text.substring(3), function (text) {
      bot.reply(message, text);
    });
  });

  controller.hears('exec', ['direct_message', 'direct_mention'], (bot, message) => {
    execute(message.text.substring(4), function (text) {
      bot.reply(message, text);
    });
  });

  controller.hears('', ['direct_message', 'direct_mention'], (bot, message) => {
    bot.reply(message, 'say `help` for help');
  });

}
