import Ember from 'ember'

const {
  Controller,
  inject
} = Ember

// BEGIN-SNIPPET controller
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
    onSelect (pikaday) {
      let v = pikaday.toString()
      this._notify('success', `DatePickerSelect: ${v}`)
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
      this._notify('error', 'DatePickerError')
    }
  }

})
// END-SNIPPET
