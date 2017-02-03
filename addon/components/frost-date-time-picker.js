/**
 * Component definition for the frost-date-time-picker component
 */

import computed, {readOnly} from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'
import {Format, setTime, validateTime} from 'ember-frost-date-picker'
import {PropTypes} from 'ember-prop-types'
import moment from 'moment'

import layout from '../templates/components/frost-date-time-picker'

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
      _dateValueInvalid: false,
      _timeValueInvalid: false
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('_validatedValue')
  _dateValue (_validatedValue) {
    if (_validatedValue) {
      return _validatedValue.format(Format.date)
    }
    return 'Invalid'
  },

  @readOnly
  @computed('_validatedValue')
  _timeValue (_validatedValue) {
    if (_validatedValue) {
      return _validatedValue.format(Format.time)
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

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

  actions: {
    _onDateChange (dateValue) {
      const momentDateValue = moment(dateValue)

      if (momentDateValue.isValid()) {
        this.setProperties({
          _dateValueInternal: dateValue,
          _dateValueInvalid: false
        })

        const _timeValueInternal = this.get('_timeValueInternal') || this.get('_timeValue')
        if (validateTime(_timeValueInternal) === true) {
          setTime(momentDateValue, _timeValueInternal)
          this.onChange(momentDateValue.format(Format.dateTime))
        }
      } else {
        this.setProperties({
          _dateValueInternal: dateValue,
          _dateValueInvalid: true
        })
      }
    },

    _onTimeChange (timeValue) {
      if (validateTime(timeValue) === true) {
        this.setProperties({
          _timeValueInternal: timeValue,
          _timeValueInvalid: false
        })

        const _dateValueInternal = this.get('_dateValueInternal')
        const momentDateValue = _dateValueInternal ? moment(_dateValueInternal) : moment(this.get('_dateValue'))
        if (momentDateValue.isValid()) {
          setTime(momentDateValue, timeValue)
          this.onChange(momentDateValue.format(Format.dateTime))
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
