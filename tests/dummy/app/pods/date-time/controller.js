import Ember from 'ember'
const {
  inject: {service}
} = Ember

// BEGIN-SNIPPET date_time_controller
export default Ember.Controller.extend({
  notificationMessages: service(),

  actions: {
    onSelect (datetime) {
      let str = JSON.stringify(datetime, null, ' ')
      this.get('notificationMessages').success(str, {
        autoClear: true,
        clearDuration: 1200
      })
    },
    onError (error) {
      this.get('notificationMessages').error(error, {
        autoClear: true,
        clearDuration: 1200
      })
    },
    myCustomDateValidator (date) {
      return date !== '2012-12-12'
    },
    myCustomTimeValidator (time) {
      return time !== '00:00:00'
    }
  }
})
// END-SNIPPET
