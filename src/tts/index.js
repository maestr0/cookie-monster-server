const exec = require('child_process').exec;
import logger from '../logs'

function textToSpeech(text, callback) {
  exec(`espeak "${text}"`, function (err, stdout, stderr) {
    if (err) logger.log('error', `Error in TTS. ${err}`);
    if (stderr) logger.log('error', `Error in TTS STDERR=${stderr}`);
    callback(stdout)
  })
}

export default textToSpeech
