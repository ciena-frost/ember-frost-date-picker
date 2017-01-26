module.exports = {
  description: '',
  afterInstall: function () {
    var self = this
    return self.addAddonsToProject({
      packages: [
        {name: 'ember-frost-core', target: '^1.0.0'},
        {name: 'ember-prop-types', target: '^3.0.0'},
        {name: 'ember-hook', target: '^1.3.5'},
        {name: 'ember-cli-moment-shim', target: '^3.0.1'},
        {name: 'ember-pikaday-shim', target: '0.1.0'}
      ]
    }).then(function () {
      return self.addBowerPackagesToProject([
        {name: 'clockpicker-seconds', target: '~0.1.6'}
      ])
    })
  },
  normalizeEntityName: function () {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  }
}
