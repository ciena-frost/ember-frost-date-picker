/**
 * Sets the given time on a moment.js Object
 *
 * @param {Object} moment - a moment.js date Object
 * @param {string} time - a time string in 'HH:mm:ss' format (24 hour clock)
 * @returns {Object} - the moment.js date Object argument with the time set
 */
export default function setTime (moment, time) {
  const units = time.split(':') // ISO-8601 => HH:mm:ss
  moment.hours(units[0]).minutes(units[1]).seconds(units[2])
  return moment
}
