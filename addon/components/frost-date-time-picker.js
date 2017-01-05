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
    defaultDate: PropTypes.string,
    defaultTime: PropTypes.string,
    onSelect: PropTypes.func.isRequired
  },

  /** @returns {Object} the default property values when not provided by consumer */
  getDefaultProps () {
    return {}
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================
  // == Actions ===============================================================
  actions: {
    didChange () {
      const date = this.get('defaultDate')
      const time = this.get('defaultTime')
      if (date && time) {
        const onSelect = this.get('onSelect')
        if (onSelect) {
          onSelect({
            date,
            time
          })
        }
      }
    }
  }
})
