/**
 * Component definition for the frost-range-picker component
 */

import {PropTypes} from 'ember-prop-types'
import computed, {readOnly} from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'

import layout from '../templates/components/frost-range-picker'
const {
  run: {
    bind
  }
} = Ember
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
    startingDate: PropTypes.string,
    startingDateTitle: PropTypes.string,
    startingDateValidator: PropTypes.func,
    startingTime: PropTypes.string,
    startingTimeValidator: PropTypes.func,
    endingDate: PropTypes.string,
    endingDateTitle: PropTypes.string,
    endingDateValidator: PropTypes.string,
    endingTime: PropTypes.string,
    endingTimeValidator: PropTypes.func
  },

  /** @returns {Object} the default property values when not provided by consumer */
  getDefaultProps () {
    return {
      startingDateTitle: 'From',
      endingDateTitle: 'To',
      startingDateValidator: this.get('isStartDateValid'),
      endingDateValidator: this.get('isEndDateValid')
    }
  },

  // == Functions =============================================================
  isStartDateValid (start) {
    return start <= this.get('endingDate')
      && this.get('startingTime') <= this.get('endingTime')
  },
  isEndDateValid (end) {
    return this.get('startingDate') <= end
      && this.get('startingTime') <= this.get('endingTime')
  },
  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================
  init () {
    this._super(...arguments)

    this.set(
      'startingDateValidator',
      bind(this, this.startingDateValidator)
    )
    this.set(
      'endingDateValidator',
      bind(this, this.endingDateValidator)
    )
  },
  // == Actions ===============================================================

  actions: {
  }
})
