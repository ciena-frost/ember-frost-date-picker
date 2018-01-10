module.exports = {
  afterInstall: function (options) {
    return this.addBowerPackagesToProject([
      {name: 'clockpicker-seconds', target: '~0.1.6'}
    ])
  },

  normalizeEntityName: function () {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  }
}
