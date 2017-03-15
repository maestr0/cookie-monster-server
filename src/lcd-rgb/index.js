var i2c = require("i2c-bus");
var sleep = require("sleep");
var GrovePi = require("node-grovepi").GrovePi

var Board = GrovePi.board

var DISPLAY_RGB_ADDR = 0x62;
var DISPLAY_TEXT_ADDR = 0x3e;

function setRGB(r, g, b) {
  var i2c1 = i2c.openSync(1);
  i2c1.writeByteSync(DISPLAY_RGB_ADDR,0,0)
  i2c1.writeByteSync(DISPLAY_RGB_ADDR,1,0)
  i2c1.writeByteSync(DISPLAY_RGB_ADDR,0x08,0xaa)
  i2c1.writeByteSync(DISPLAY_RGB_ADDR,4,r)
  i2c1.writeByteSync(DISPLAY_RGB_ADDR,3,g)
  i2c1.writeByteSync(DISPLAY_RGB_ADDR,2,b)
  i2c1.closeSync();
}

function textCommand(i2c1, cmd) {
  i2c1.writeByteSync(DISPLAY_TEXT_ADDR, 0x80, cmd);
}

function setText(text) {
  var i2c1 = i2c.openSync(1);
  textCommand(i2c1, 0x01) // clear display
  sleep.usleep(50000);
  textCommand(i2c1, 0x08 | 0x04) // display on, no cursor
  textCommand(i2c1, 0x28) // 2 lines
  sleep.usleep(50000);
  var count = 0;
  var row = 0;
  for(var i = 0, len = text.length; i < len; i++) {
    if(text[i] === "\n" || count === 16) {
      count = 0;
      row ++;
        if(row === 2)
          break;
      textCommand(i2c1, 0xc0)
      if(text[i] === "\n")
        continue;
    }
    count++;
    i2c1.writeByteSync(DISPLAY_TEXT_ADDR, 0x40, text[i].charCodeAt(0));
    i2c1.closeSync();
  }
}

var board = new Board({
    debug: true,
    onError: function(err) {
      console.log("Something wrong just happened")
      console.log(err)
    },
    onInit: function(res) {
      if (res) {
        console.log("GrovePi Version :: " + board.version())
        setText("COOKIE MONSTER");
        setRGB(55, 55, 255);
      }
    }
  })
board.init()

module.exports = { setText: setText, setRGB: setRGB }
