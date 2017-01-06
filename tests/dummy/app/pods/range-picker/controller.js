import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    log (e) {
      // perform validation here
      console.log(e)
    }
  }
});
