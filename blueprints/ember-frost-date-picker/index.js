module.exports = {
  description: '',

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  /**
   Installs specified packages at the root level of the application.
   Triggered by 'ember install <addon name>'.

   @returns {Promise} package names and versions
  */
  afterInstall: function () {
    return this.addAddonsToProject({
      packages: [
        {name: 'ember-frost-core', target: '>=0.0.14 <2.0.0'}
      ]
    })
  }
}
