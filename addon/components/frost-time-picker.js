/**
 * Component definition for the frost-time-picker component
 */

import {PropTypes} from 'ember-prop-types'
import computed, {readOnly} from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'
import FrostText from 'ember-frost-core/components/frost-text'

const {
  run: {
    scheduleOnce
  }
} = Ember

export default FrostText.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  // == PropTypes =============================================================

  /**
   * Properties for this component. Options are expected to be (potentially)
   * passed in to the component. State properties are *not* expected to be
   * passed in/overwritten.
   */
  propTypes: {
    // options

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

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================
  didInsertElement () {
    this._super(...arguments)
    scheduleOnce('sync', this, function () {
      this.$('input').clockpicker({
        autoclose:true
      })
    })

  },
  willDestroyElement () {
    this._super(...arguments)
    scheduleOnce('sync', this, function () {
      this.$('input').remove()
    })
  },
  // == Actions ===============================================================

  actions: {
  }
})
