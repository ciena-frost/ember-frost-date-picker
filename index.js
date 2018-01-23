/* eslint-env node */

'use strict'

const path = require('path')
const MergeTrees = require('broccoli-merge-trees')
const Funnel = require('broccoli-funnel')

module.exports = {
  name: 'ember-frost-date-picker',

  /* eslint-disable complexity */
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
  /* eslint-enable complexity */

  included: function (app) {
    this._super.included.apply(this, app)

    app.import(path.join('vendor', 'jquery-clockpicker.min.js'))
    app.import(path.join('vendor', 'jquery-clockpicker.min.css'))
  },

  treeForVendor: function (vendorTree) {
    const packageTree = new Funnel(path.join(this.project.root, 'node_modules', 'clockpicker-seconds', 'dist'), {
      files: [
        'jquery-clockpicker.min.js',
        'jquery-clockpicker.min.css'
      ]
    })

    return new MergeTrees([vendorTree, packageTree])
  }
}
