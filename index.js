/* eslint-env node */

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

    /* eslint-disable no-unused-expressions */
    this._super.init && this._super.init.apply(this, arguments)
    /* eslint-enable no-unused-expressions */
  },

  included: function (app) {
    this._super.included.apply(this, app)

    app.import('bower_components/clockpicker-seconds/dist/jquery-clockpicker.min.js')
  }
}
