/**
 * Component definition for the frost-date-time-picker component
 */
import PropTypesMixin, {PropTypes} from 'ember-prop-types'
import SpreadMixin from 'ember-spread'
import {Component} from 'ember-frost-core'
import layout from '../templates/components/frost-date-time-picker'

export default Component.extend(SpreadMixin, PropTypesMixin, {
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  layout,
  classNameBindings: ['error:has-errored'],
  // == PropTypes =============================================================

  /**
   * Properties for this component. Options are expected to be (potentially)
   * passed in to the component. State properties are *not* expected to be
   * passed in/overwritten.
   */
  propTypes: {
    defaultDate: PropTypes.string,
    defaultTime: PropTypes.string,
    dateValidator: PropTypes.func,
    timeValidator: PropTypes.func,
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
    onSelect () {
      const date = this.get('defaultDate')
      const time = this.get('defaultTime')

      const onSelect = this.get('onSelect')
      if (onSelect) {
        onSelect({
          date,
          time
        })
      }
      this.set('error', null)
    },
    onError (e) {
      const onError = this.get('onError')
      if (onError) {
        this.set('error', onError(e))
      } else {
        this.set('error', e)
      }
    }
  }
})
