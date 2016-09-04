import Ember from 'ember'

const {
  Controller,
  inject
} = Ember

// BEGIN-SNIPPET controller
export default Controller.extend({
  notifications: inject.service(),
  _notify (type, msg) {
    this.get('notifications')[type](msg, {
      autoClear: true,
      clearDuration: 1200
    })
  },
  actions: {
    onSelect (raw, fmt) {
      this._notify('success', `DatePickerSelect: ${fmt}`)
      this.set('value', fmt)
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
