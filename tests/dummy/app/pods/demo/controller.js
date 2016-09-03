import Ember from 'ember'

const {
  Controller,
  inject
} = Ember

export default Controller.extend({
  notifications: inject.service('notification-messages'),
  actions: {
    onSelect (date) {
      let d = moment(date).format('YYYY-MM-DD')
      this.get('notifications').success(`DatePickerSelect: ${d}`, {
        autoClear: true,
        clearDuration: 1200
      });
      this.set('value', d)
    },
    onOpen () {
      this.get('notifications').info('DatePickerOpen', {
        autoClear: true,
        clearDuration: 1200
      });
    },
    onClose () {
      this.get('notifications').error('DatePickerClose', {
        autoClear: true,
        clearDuration: 1200
      });
    },
    onDraw () {
      this.get('notifications').info('DatePickerDraw', {
        autoClear: true,
        clearDuration: 1200
      });
    }
  }

})
