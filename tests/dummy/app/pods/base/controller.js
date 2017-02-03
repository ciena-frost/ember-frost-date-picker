import Ember from 'ember'
const {Controller, inject} = Ember

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
  newDate: undefined,
  actions: {
    onSelect (value) {
      this._notify('success', `DatePickerSelect: ${value}`)
    },
    onSelectFromEmpty (value) {
      this._notify('success', `OriginallyEmptyDatePickerSelect: ${value}`)
      this.set('newDate', value)
    },
    onError (e) {
      this._notify('error', 'DatePickerError: ' + e)
    },
    onOpen () {
    },
    onClose () {
    },
    onDraw () {
    }
  }

})
// END-SNIPPET
