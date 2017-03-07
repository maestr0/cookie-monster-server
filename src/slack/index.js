import Botkit from 'botkit'
import logger from '../logs'
import tts from '../tts'
import shellExec from '../shell'
import temperatureSensor from '../temperature'
import readLight from '../light-sensor'
import readProximity from '../proximity-sensor'
import lcd from '../lcd-rgb'

let config = {
  admin: "U026P8Q1D"
};

function isAdmin(user) {
  return user === config.admin
}

function buildCommandMessageOutput(err, stdout, stderr) {
  return `\`\`\`
OUTPUT
${stdout}

STDERR
  ${stderr}

ERR
  ${err}
\`\`\``
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
      body += "`exec` - execute shell command\n";
      body += "`update` - update code and restart app\n";
      body += "`self check` - self check, test all sensors\n";
      body += "\n\n";
    }
    body += "`temp` - show current temperature in the office\n";
    body += "`light` - show light sensor status\n";
    body += "`proximity` - show proximity sensor status\n";
    body += "`help` - to show this list\n";
    body += "`say` - to Text To Speech. e.g. say Hello Pawel\n";
    body += "`write` - write something on my LCD\n";
    bot.reply(message, body);
  });

  controller.hears('say', ['direct_message', 'direct_mention'], (bot, message) => {
    tts(message.text.substring(3), function (text) {
      bot.reply(message, text);
    });
  });

  controller.hears('write', ['direct_message', 'direct_mention'], (bot, message) => {
      lcd.setText(message.text.substring(5).trim());
      lcd.setRGB(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
      bot.reply(message, "OK");
  });

  controller.hears('self check', ['direct_message', 'direct_mention'], (bot, message) => {
    if (isAdmin(message.user)) {
      lcd.setText("SELF CHECK SELF CHECK SELF CHECK SELF CHECK");
      bot.reply(message, "OK");
    } else {
      bot.reply(message, "unauthorized");
    }
  });

  controller.hears('exec', ['direct_message', 'direct_mention'], (bot, message) => {
    if (isAdmin(message.user)) {
      shellExec(message.text.substring(4), function (err, stdout, stderr) {
        let body = buildCommandMessageOutput(err, stdout, stderr);
        bot.reply(message, body);
      });
    } else {
      bot.reply(message, "unauthorized");
    }
  });

  controller.hears('update', ['direct_message', 'direct_mention'], (bot, message) => {
    if (isAdmin(message.user)) {
      shellExec("cd /home/pi/git/cookie-monster-server & git pull & sudo systemctl restart cookie-monster.service", function (err, stdout, stderr) {
        let body = buildCommandMessageOutput(err, stdout, stderr);
        bot.reply(message, body);
      });
    } else {
      bot.reply(message, "unauthorized");
    }
  });

  controller.hears('temp', ['direct_message', 'direct_mention'], (bot, message) => {
    temperatureSensor.readTemperature(function (value) {
      bot.reply(message, `Current temperature in the office is ${temperatureSensor.convertToF(value).toFixed(1)}F / ${value.toFixed(1)}C`);
    })
  });

  controller.hears('light', ['direct_message', 'direct_mention'], (bot, message) => {
    readLight(function (value) {
      bot.reply(message, `Current light level in the office is ${value.toFixed(2)}`);
    })
  });

  controller.hears('proximity', ['direct_message', 'direct_mention'], (bot, message) => {
    readProximity(function (value) {
      bot.reply(message, `Current proximity sensor status is ${value.toFixed(2)}`);
    })
  });

  controller.hears('', ['direct_message', 'direct_mention'], (bot, message) => {
    bot.reply(message, 'say `help` for help');
  });

}
