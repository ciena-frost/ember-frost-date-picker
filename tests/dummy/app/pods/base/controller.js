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
  value: '2010-10-10',
  actions: {
    onSelect (date) {
      this._notify('success', `DatePickerSelect: ${date}`)
    },
    onOpen () {
      this._notify('info', 'DatePickerOpen')
    },
    onClose () {
      this._notify('warning', 'DatePickerClose')
    },
    onDraw () {
      this._notify('info', 'DatePickerDraw')
    },
    onError (e) {
      this._notify('error', 'DatePickerError: ' + e)
    }
  }

})
// END-SNIPPET
