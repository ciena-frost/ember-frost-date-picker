import Ember from 'ember'

const {
  Controller,
  inject
} = Ember

// BEGIN-SNIPPET date_controller
export default Controller.extend({
  notificationMessages: inject.service(),
  _notify (type, msg) {
    this.get('notificationMessages')[type](msg, {
      autoClear: true,
      clearDuration: 1200
    })
  },
  myDate: '2010-10-10',
  myTime: '01:02:03',
  actions: {
    onSelect (value) {
      this._notify('success', `DatePickerSelect: ${value}`)
    },
    onError (e) {
      this._notify('error', 'DatePickerError: ' + e)
    },
    onOpen () {
      console.log('DatePickerOpen')
    },
    onClose () {
      console.log('DatePickerClose')
    },
    onDraw () {
      console.log('info', 'DatePickerDraw')
    }
  }

})
// END-SNIPPET
