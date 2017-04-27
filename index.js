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

    /* eslint-disable no-unused-expressions */
    this._super.init && this._super.init.apply(this, arguments)
    /* eslint-enable no-unused-expressions */
  },

  _findHost: function () {
    var current = this
    var app

    // Keep iterating upward until we don't have a grandparent.
    // Has to do this grandparent check because at some point we hit the project.
    do {
      app = current.app || app
    } while (current.parent.parent && (current = current.parent))
    return app
  },

  included: function () {
    var app = this._findHost()

    if (!app.bowerDirectory) {
      app.import('bower_components/clockpicker-seconds/dist/jquery-clockpicker.min.js')
    } else {
      app.import(`${app.bowerDirectory}/clockpicker-seconds/dist/jquery-clockpicker.min.js`)
    }
  }
}
