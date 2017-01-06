import Ember from 'ember'

export default Ember.Controller.extend({
  actions: {
    datetimeChanged (datetime) {
      console.log(datetime)
    }
  }
})
