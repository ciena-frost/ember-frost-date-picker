const blueprintHelper = require('ember-frost-core/blueprint-helper')

module.exports = {
  afterInstall: function (options) {
    const addonsToAdd = [
      {name: 'ember-frost-core', target: '^1.14.3'},
      {name: 'ember-prop-types', target: '^3.0.0'},
      {name: 'ember-hook', target: '^1.3.5'},
      {name: 'ember-cli-moment-shim', target: '^3.0.1'},
      {name: 'ember-pikaday-shim', target: '0.1.0'}
    ]

    // Get the packages installed in the consumer app/addon. Packages that are already installed in the consumer within
    // the required semver range will not be re-installed or have blueprints re-run.
    const consumerPackages = blueprintHelper.consumer.getPackages(options)

    // Get the packages to install (not already installed) from a list of potential packages
    return blueprintHelper.packageHandler.getPkgsToInstall(addonsToAdd, consumerPackages).then((pkgsToInstall) => {
      if (pkgsToInstall.length !== 0) {
        // Call the blueprint hook
        return this.addAddonsToProject({
          packages: pkgsToInstall
        })
      }
    }).then(() => {
      return this.addBowerPackagesToProject([
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
