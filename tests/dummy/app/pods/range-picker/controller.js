import Ember from 'ember'
const {Controller, inject} = Ember

// BEGIN-SNIPPET range_controller
export default Controller.extend({
  notificationMessages: inject.service(),

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
    myCustomValidator (start, end) {
      if (this.get('isInverted')) {
        return start.isAfter(end)
      }
    }
  }
})
// END-SNIPPET
