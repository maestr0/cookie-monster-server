const exec = require('child_process').exec;

function execute(text, callback) {
  exec(text, callback)
}

export default execute
