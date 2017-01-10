/* globals module */

'use strict'

module.exports = {
  name: 'ember-frost-date-picker',
  init: function (app) {
    this.options = this.options || {}
    this.options.babel = this.options.babel || {}
    this.options.babel.optional = this.options.babel.optional || []

    if (this.options.babel.optional.indexOf('es7.decorators') === -1) {
      this.options.babel.optional.push('es7.decorators')
    }
    this._super.init && this._super.init.apply(this, arguments)
  },
  included: function (app) {
    this._super.included(app)
    ;[
      'moment/moment.js',
      'pikaday/pikaday.js',
      'clockpicker-seconds/dist/jquery-clockpicker.min.js'
    ].forEach(file => {
      app.import(`${app.bowerDirectory}/${file}`)
    })
  }
}
