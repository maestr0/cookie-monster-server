import temperatureSensor from '../temperature'
import readLight from '../light-sensor'
import readProximity from '../proximity-sensor'
import lcd from '../lcd-rgb'

module.exports = {temp: temperatureSensor,
                  light: readLight,
                  proximity: readProximity,
                  lcd: lcd};
