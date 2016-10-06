module.exports = {
  description: '',
  afterInstall: function () {
    var self = this
    return self.addAddonsToProject({
      packages: [
        {name: 'ember-frost-core', target: '>=0.0.14 <2.0.0'}
      ]
    }).then(function () {
      return self.addBowerPackagesToProject('moment').then(function () {
        return self.addBowerPackagesToProject('pikaday')
      })
    })
  },
  normalizeEntityName: function () {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  }
}
