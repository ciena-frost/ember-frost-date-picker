/* globals module */

'use strict'

module.exports = {
  name: 'ember-frost-date-picker',
  included: function (app) {
    this._super.included(app)
    app.import(app.bowerDirectory + '/moment/moment.js')
    app.import(app.bowerDirectory + '/pikaday/pikaday.js')
  }
}
