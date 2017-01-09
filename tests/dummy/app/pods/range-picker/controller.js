import Ember from 'ember'

const {
  inject: {service}
} = Ember

// BEGIN-SNIPPET range_controller
export default Ember.Controller.extend({
  notificationMessages: service(),
  isInverted: false,

  actions: {
    onSelect (result) {
      let str = JSON.stringify(result, null, ' ')
      this.get('notificationMessages').success(str, {
        autoClear: true,
        clearDuration: 1200
      })
    },
    onError (e) {
      this.get('notificationMessages').error(e, {
        autoClear: true,
        clearDuration: 1200
      })
    },
    toggleInverted () {
      this.toggleProperty('isInverted')
    },
    myCustomValidator (start, end) {
      if (this.get('isInverted')) {
        return start.isAfter(end)
      }
    }
  }
})
// END-SNIPPET
