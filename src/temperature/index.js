import mcpadc from 'mcp-spi-adc'

var tempSensor = mcpadc.open(0, {speedHz: 20000}, (err) => {
  if (err) throw err;

  setInterval(() => {
    tempSensor.read((err, reading) => {
      if (err) throw err;

      console.log((reading.value * 3.3 - 0.5) * 100);
    });
  }, 1000);
});

export default () => {
  console.log("temp is 40C");
}
