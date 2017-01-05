import Ember from 'ember';
const {
  computed
} = Ember
export default Ember.Controller.extend({
  actions: {
    datetimeChanged (datetime) {
      console.log(datetime)
    }
  }
});
