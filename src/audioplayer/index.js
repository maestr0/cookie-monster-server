'use strict'
import shellExec from '../shell'
import workerQueue from '../worker'

function AudioPlayer() {
  function play(name) {
    workerQueue.enqueueAudioTask({
      type: 'audio',
      file: name
    });
  }
}

module.exports = AudioPlayer
