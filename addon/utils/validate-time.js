const timeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/

/**
 * Validates that a given time string matches the 'HH:mm:ss' format
 *
 * @param {string} time - any string
 * @returns {boolean} - true if the string matches the 'HH:mm:ss' format
 */
export default function validateTime (time) {
  return timeRegex.test(time)
}
