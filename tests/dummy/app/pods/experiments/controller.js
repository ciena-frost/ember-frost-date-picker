import Ember from 'ember'
const {Controller, inject} = Ember
import {Format, setTime, validateTime} from 'ember-frost-date-picker'
import moment from 'moment'

export default Controller.extend({
  notificationMessages: inject.service(),
  now: moment().toDate(),
  dateTimeValue: moment().add(2, 'day').subtract(5, 'hour').format(Format.dateTime),
  dateTimeValueInvalid: false,
  dateValue: moment().subtract(1, 'day').format(Format.date),
  dateValueInvalid: false,
  rangeValue: {
    end: moment().subtract(1, 'day').subtract(1, 'hour').format(Format.dateTime),
    start: moment().subtract(2, 'day').subtract(1, 'hour').format(Format.dateTime)
  },
  rangeValueInvalid: false,
  timeValue: moment().subtract(1, 'hour').format(Format.time),
  timeValueInvalid: false,

  actions: {
    onDateChange (dateValue) {
      this.get('notificationMessages').success(dateValue, {
        autoClear: true,
        clearDuration: 2000
      })

      const momentDateValue = moment(dateValue)
      if (!momentDateValue.isValid()) {
        this.set('dateValueInvalid', true)
        return
      }

      // Silly example just to show validation - any date after 2015-01-01 is valid
      const dateValueInvalid = momentDateValue.isBefore(moment('2015-01-01'))
      this.setProperties({
        dateValue,
        dateValueInvalid
      })
    },

    onDateTimeChange (dateTimeValue) {
      this.get('notificationMessages').success(dateTimeValue, {
        autoClear: true,
        clearDuration: 4000
      })

      const momentDateTimeValue = moment(dateTimeValue)
      if (!momentDateTimeValue.isValid()) {
        this.set('dateTimeValueInvalid', true)
        return
      }

      // Silly example just to show validation - any date after 2015-01-01T10:00:00-00:00 is valid
      const dateTimeValueInvalid = momentDateTimeValue.isBefore(moment('2015-01-01T10:00:00-00:00'))
      this.setProperties({
        dateTimeValue,
        dateTimeValueInvalid
      })
    },

    onRangeChange (rangeValue) {
      this.get('notificationMessages').success(`${rangeValue.start} - ${rangeValue.end}`, {
        autoClear: true,
        clearDuration: 8000
      })

      // Silly example just to show validation
      // - any start date after 2015-01-01T10:00:00-00:00 is valid
      // - any end date before 2018-01-01T10:00:00-00:00 is valid
      const rangeValueInvalid =
        moment(rangeValue.start).isBefore(moment('2015-01-01T10:00:00-00:00')) ||
        moment(rangeValue.end).isAfter(moment('2018-01-01T10:00:00-00:00'))

      this.setProperties({
        rangeValue,
        rangeValueInvalid
      })
    },

    onTimeChange (timeValue) {
      this.get('notificationMessages').success(timeValue, {
        autoClear: true,
        clearDuration: 2000
      })

      if (validateTime(timeValue) === false) {
        this.set('timeValueInvalid', true)
        return
      }

      // Silly example just to show validation - any time after 10:00:00 is valid
      const timeValueInvalid = setTime(moment(), timeValue).isBefore(setTime(moment(), '10:00:00'))
      this.setProperties({
        timeValue,
        timeValueInvalid
      })
    }
  }
})
