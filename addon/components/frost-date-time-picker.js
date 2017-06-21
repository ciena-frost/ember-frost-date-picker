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
    time: PropTypes.EmberComponent,
    value: PropTypes.string.isRequired,
    dateFormat: PropTypes.string,
    timeFormat: PropTypes.string,
    dateTimeFormat: PropTypes.string,

    // Events
    onChange: PropTypes.func.isRequired,

    // State
    _dateValueInternal: PropTypes.string,
    _dateValueInvalid: PropTypes.bool,
    _timeValueInternal: PropTypes.string,
    _timeValueInvalid: PropTypes.bool
  },

  getDefaultProps () {
    return {
      dateFormat: DEFAULT_DATE_FORMAT,
      timeFormat: DEFAULT_TIME_FORMAT,
      dateTimeFormat: DEFAULT_DATE_TIME_FORMAT,
      _dateValueInvalid: false,
      _timeValueInvalid: false
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('_validatedValue')
  _dateValue (_validatedValue) {
    if (_validatedValue && _validatedValue.isValid()) {
      return this._formattedDate(_validatedValue, false)
    }
    return 'Invalid'
  },

  @readOnly
  @computed('_validatedValue')
  _timeValue (_validatedValue) {
    if (_validatedValue && _validatedValue.isValid()) {
      return this._formattedTime(_validatedValue, false)
    }
    return 'Invalid'
  },

  @readOnly
  @computed('value')
  _validatedValue (value) {
    const momentValue = moment(value)
    if (momentValue.isValid()) {
      return momentValue
    }
    return false
  },

  @readOnly
  @computed('_validatedValue')
  _valueInvalid (_validatedValue) {
    return _validatedValue === false
  },

  // == Functions =============================================================

  _dateMoment (_dateValue) {
    return moment(_dateValue, this.get('dateFormat'))
  },

  _formattedDate (_dateValue, useDefaultFormat) {
    return this._timeMoment(_dateValue).format(useDefaultFormat ? DEFAULT_DATE_FORMAT : this.get('dateFormat'))
  },

  _timeMoment (_timeValue) {
    return moment(_timeValue, this.get('timeFormat'))
  },

  _formattedTime (_timeValue, useDefaultFormat) {
    return this._timeMoment(_timeValue).format(useDefaultFormat ? DEFAULT_TIME_FORMAT : this.get('timeFormat'))
  },

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

  actions: {
    _onDateChange (dateValue) {
      const momentDateValue = this._dateMoment(dateValue)
      if (momentDateValue.isValid()) {
        this.setProperties({
          _dateValueInternal: dateValue,
          _dateValueInvalid: false
        })

        const _timeValueInternal = this._formattedTime(this.get('_timeValueInternal') || this.get('_timeValue'), true)
        if (validateTime(_timeValueInternal) === true) {
          setTime(momentDateValue, _timeValueInternal)
          this.onChange(momentDateValue.format(this.get('dateTimeFormat')))
        }
      } else {
        this.setProperties({
          _dateValueInternal: dateValue,
          _dateValueInvalid: true
        })
      }
    },

    _onTimeChange (timeValue) {
      let defaultFormattedTime = this._formattedTime(timeValue, true)
      if (validateTime(defaultFormattedTime) === true) {
        this.setProperties({
          _timeValueInternal: timeValue,
          _timeValueInvalid: false
        })

        const _dateValueInternal = this.get('_dateValueInternal')
        const momentDateValue = this._dateMoment(_dateValueInternal || this.get('_dateValue'))
        if (momentDateValue.isValid()) {
          setTime(momentDateValue, defaultFormattedTime)
          this.onChange(momentDateValue.format(this.get('dateTimeFormat')))
        }
      } else {
        this.setProperties({
          _timeValueInternal: timeValue,
          _timeValueInvalid: true
        })
      }
    }
  }
})
