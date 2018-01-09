/**
 * Component definition for the frost-date-time-picker component
 */

import computed, {readOnly} from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'
import {Format, setTime, validateTime} from 'ember-frost-date-picker'
import {PropTypes} from 'ember-prop-types'
import moment from 'moment'

import layout from '../templates/components/frost-date-time-picker'

const DEFAULT_DATE_FORMAT = Format.date
const DEFAULT_TIME_FORMAT = Format.time
const DEFAULT_DATE_TIME_FORMAT = Format.dateTime

export default Component.extend({

  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  layout,

  // == PropTypes =============================================================

  propTypes: {
    // Options
    date: PropTypes.EmberComponent,
    dateFormat: PropTypes.string,
    dateTimeFormat: PropTypes.string,
    minDate: PropTypes.date,
    time: PropTypes.EmberComponent,
    timeFormat: PropTypes.string,
    value: PropTypes.string.isRequired,

    // Events
    onChange: PropTypes.func.isRequired,

    // State
    _selectedDateValue: PropTypes.string,
    _selectedDateValueInvalid: PropTypes.bool,
    _selectedTimeValue: PropTypes.string,
    _selectedTimeValueInvalid: PropTypes.bool
  },

  getDefaultProps () {
    return {
      dateFormat: DEFAULT_DATE_FORMAT,
      timeFormat: DEFAULT_TIME_FORMAT,
      dateTimeFormat: DEFAULT_DATE_TIME_FORMAT,
      _selectedDateValueInvalid: false,
      _selectedTimeValueInvalid: false
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('value')
  _dateValue (value) {
    const momentValue = moment(value)
    if (momentValue.isValid()) {
      return momentValue.format(this.get('dateFormat'))
    }
    return 'Invalid'
  },

  @readOnly
  @computed('value')
  _timeValue (value) {
    const momentValue = moment(value)
    if (momentValue.isValid()) {
      return momentValue.format(this.get('timeFormat'))
    }
    return 'Invalid'
  },

  @readOnly
  @computed('_dateValue', '_timeValue')
  _valueInvalid (_dateValue, _timeValue) {
    return _dateValue === 'Invalid' || _timeValue === 'Invalid'
  },

  // == Functions =============================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

  actions: {
    _onDateChange (dateValue) {
      const momentDateValue = moment(dateValue, this.get('dateFormat'))
      if (momentDateValue.isValid()) {
        this.setProperties({
          _selectedDateValue: dateValue,
          _selectedDateValueInvalid: false
        })

        // Need to convert the time value to being in the default format just for validation
        const _selectedTimeValue = moment(this.get('_selectedTimeValue') || this.get('_timeValue'),
                                          this.get('timeFormat')).format(DEFAULT_TIME_FORMAT)
        if (validateTime(_selectedTimeValue) === true) {
          setTime(momentDateValue, _selectedTimeValue)
          this.onChange(momentDateValue.format(this.get('dateTimeFormat')))
        }
      } else {
        this.setProperties({
          _selectedDateValue: dateValue,
          _selectedDateValueInvalid: true
        })
      }
    },

    _onTimeChange (timeValue) {
      // Need to convert the time value to being in the default format just for validation
      let defaultFormattedTime = moment(timeValue, this.get('timeFormat')).format(DEFAULT_TIME_FORMAT)
      if (validateTime(defaultFormattedTime) === true) {
        this.setProperties({
          _selectedTimeValue: timeValue,
          _selectedTimeValueInvalid: false
        })

        const _selectedDateValue = this.get('_selectedDateValue')
        const momentDateValue = moment(_selectedDateValue || this.get('_dateValue'), this.get('dateFormat'))
        if (momentDateValue.isValid()) {
          setTime(momentDateValue, defaultFormattedTime)
          this.onChange(momentDateValue.format(this.get('dateTimeFormat')))
        }
      } else {
        this.setProperties({
          _selectedTimeValue: timeValue,
          _selectedTimeValueInvalid: true
        })
      }
    }
  }
})
