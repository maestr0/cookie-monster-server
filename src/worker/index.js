'use strict'
import logger from '../logs'

function Worker() {
  function enqueueAudioTask(task) {
    logger.info('Worker Audio task added: ${task}')
  }

  function enqueueMotionTask(task) {
    logger.info('Worker Motion task added: ${task}')
  }
}

module.exports = Worker;
