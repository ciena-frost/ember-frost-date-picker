/**
 * Component definition for the frost-date-time-picker component
 */

import {PropTypes} from 'ember-prop-types'
import computed, {readOnly} from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'

import layout from '../templates/components/frost-date-time-picker'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  layout,

  // == PropTypes =============================================================

  /**
   * Properties for this component. Options are expected to be (potentially)
   * passed in to the component. State properties are *not* expected to be
   * passed in/overwritten.
   */
  propTypes: {
    // options
    onSelect: PropTypes.func.isRequired
    // state
  },

  /** @returns {Object} the default property values when not provided by consumer */
  getDefaultProps () {
    return {
      // options

      // state
    }
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================
  _onSelect (date, time) {
    if (date && time) {
      const onSelect = this.get('onSelect')
      if (onSelect) {
        onSelect({
          date,
          time
        })
      }
    }
  },
  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================
  actions: {
    dateSelected (date) {
      this.set('date', date)
      const time = this.get('time')
      this.get('_onSelect').call(this, date, time)
    },
    timeSelected (time) {
      this.set('time', time)
      const date = this.get('date')
      this.get('_onSelect').call(this, date, time)
    }
  }
})
