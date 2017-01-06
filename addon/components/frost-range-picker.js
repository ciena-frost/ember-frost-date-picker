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
  classNameBindings: ['error:has-errored'],

  // == PropTypes =============================================================

  /**
   * Properties for this component. Options are expected to be (potentially)
   * passed in to the component. State properties are *not* expected to be
   * passed in/overwritten.
   */
  propTypes: {
    startingDate: PropTypes.string,
    startingTime: PropTypes.string,
    startTitle: PropTypes.string,
    endingDate: PropTypes.string,
    endingTime: PropTypes.string,
    endTitle: PropTypes.string,
    startValidator: PropTypes.func,
    endValidator: PropTypes.func,
    onSelect: PropTypes.func.isRequired,
    onError: PropTypes.func,
    validator: PropTypes.func
  },

  /** @returns {Object} the default property values when not provided by consumer */
  getDefaultProps () {
    return {
      startTitle: 'From',
      endTitle: 'To',
      startValidator: this.get('isValid'),
      endValidator: this.get('isValid')
    }
  },

  // == Functions =============================================================
  isValid (value) {
    if (this.validator) {
      let result = this.validator(value)
      if (!result.isValid) {
        return result
      }
    }
    let start = moment(this.get('startingDate'))
    let end = moment(this.get('endingDate'))

    let st = this.get('startingTime').split(':')
    let et = this.get('endingTime').split(':')

    start.hours(st[0]).minutes(st[1]).seconds(st[2])
    end.hours(et[0]).minutes(et[1]).seconds(et[2])

    let validDate = end.isSameOrAfter(start)

    if (validDate) {
      this.set('start', start)
      this.set('end', end)
    }
    return {
      isValid: validDate,
      error: validDate ?
        null :
        Error('End is before start')
    }
  },

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================
  init () {
    this._super(...arguments)

    // bind context to both functions
    this.set(
      'startValidator',
      bind(this, this.startValidator)
    )
    this.set(
      'endValidator',
      bind(this, this.endValidator)
    )
  },
  actions: {
    onSelect () {
      const onSelect = this.get('onSelect')
      if (onSelect) {
        onSelect({
          start: this.get('start'),
          end: this.get('end')
        })
      }
      this.set('error', null)
    },
    onError (e) {
      const onError = this.get('onError')
      this.set('error', true)
      if (onError) {
        onError(e)
      }
      return false
    }
  }
})
