/**
 * Component definition for the frost-range-picker component
 */

import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'
import moment from 'moment'

import layout from '../templates/components/frost-range-picker'

export default Component.extend({

  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  classNameBindings: ['isVertical:vertical:horizontal'],
  layout,

  // == PropTypes =============================================================

  propTypes: {
     // Options
    end: PropTypes.EmberComponent,
    endTitle: PropTypes.string,
    isVertical: PropTypes.bool,
    start: PropTypes.EmberComponent,
    startTitle: PropTypes.string,
    value: PropTypes.shape({
      end: PropTypes.string.isRequired,
      start: PropTypes.string.isRequired
    }).isRequired,

    // Events
    onChange: PropTypes.func.isRequired,

    // State
    _endValueInternal: PropTypes.string,
    _startValueInternal: PropTypes.string,
    _valueInvalid: PropTypes.bool
  },

  getDefaultProps () {
    return {
      isVertical: false,
      _valueInvalid: false
    }
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

  actions: {
    _onEndChange (endValue) {
      const momentEndValue = moment(endValue)
      const _startValueInternal = this.get('_startValueInternal') || this.get('value.start')

      if (moment(_startValueInternal).isSameOrBefore(momentEndValue)) {
        this.setProperties({
          _endValueInternal: endValue,
          _valueInvalid: false
        })
        this.onChange({
          end: endValue,
          start: _startValueInternal
        })
      } else {
        this.setProperties({
          _endValueInternal: endValue,
          _valueInvalid: true
        })
      }
    },

    _onStartChange (startValue) {
      const _endValueInternal = this.get('_endValueInternal') || this.get('value.end')
      const momentStartValue = moment(startValue)

      if (momentStartValue.isSameOrBefore(moment(_endValueInternal))) {
        this.setProperties({
          _startValueInternal: startValue,
          _valueInvalid: false
        })
        this.onChange({
          end: _endValueInternal,
          start: startValue
        })
      } else {
        this.setProperties({
          _startValueInternal: startValue,
          _valueInvalid: true
        })
      }
    }
  }
})
