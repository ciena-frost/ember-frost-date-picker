import Ember from 'ember'
const {Controller, inject} = Ember

// BEGIN-SNIPPET date_time_controller
export default Controller.extend({
  notificationMessages: inject.service(),
  myValue: 'hi',
  _notify (msg, type) {
    this.get('notificationMessages')[type](msg, {
      autoClear: true,
      clearDuration: 1200
    })
  },
  actions: {
    onSelect (date) {
      this._notify(date, 'success')
    },
    onError (error) {
      const e = this.get('error') || error
      this._notify(e, 'error')
    },
    myCustomDateValidator (date) {
      if (date === '2012-12-12') {
        this.set('error', 'myCustomDateValidator Error')
        return false
      }
    },
    myCustomTimeValidator (time) {
      if (time === '00:00:00') {
        this.set('error', 'myCustomTimeValidator Error')
        return false
      }
    }
  }
})
// END-SNIPPET
