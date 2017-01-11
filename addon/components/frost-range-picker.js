/**
 * Component definition for the frost-range-picker component
 */
import Ember from 'ember'
import PropTypesMixin, {PropTypes} from 'ember-prop-types'
import SpreadMixin from 'ember-spread'
import computed, {readOnly} from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'

import layout from '../templates/components/frost-range-picker'

const {
  run: {
    bind
  }
} = Ember

const {
  moment
} = window

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
    hook: PropTypes.string,
    timeRegex: PropTypes.object,
    isVertical: PropTypes.bool,
    separator: PropTypes.object,
    startDate: PropTypes.string,
    startTime: PropTypes.string,
    startTitle: PropTypes.string,
    endDate: PropTypes.string,
    endTime: PropTypes.string,
    endTitle: PropTypes.string,
    startValidator: PropTypes.func,
    endValidator: PropTypes.func,
    onSelect: PropTypes.func,
    onError: PropTypes.func,
    validator: PropTypes.func
  },

  /** @returns {Object} the default property values when not provided by consumer */
  getDefaultProps () {
    return {
      hook: 'range-picker',
      timeRegex: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
      startValidator: this.get('isValid'),
      endValidator: this.get('isValid'),
      isVertical: false
    }
  },

  // == Functions =============================================================
  validTime (value) {
    const regex = this.get('timeRegex')
    return regex.test(value)
  },
  isValid (value) {
    const start = moment(this.get('startDate'))
    const end = moment(this.get('endDate'))

    const startTime = this.get('startTime')
    const endTime = this.get('endTime')

    if (!this.validTime(startTime) || !this.validTime(endTime)) {
      return false
    }

    let st = startTime.split(':')
    let et = endTime.split(':')
    start
      .hours(st[0])
      .minutes(st[1])
      .seconds(st[2])
    end
      .hours(et[0])
      .minutes(et[1])
      .seconds(et[2])

    this.set('start', start)
    this.set('end', end)

    if (this.validator) {
      let result = this.validator(start, end)
      if (result !== undefined) {
        return result
      }
    }

    return end.isSameOrAfter(start)
  },
  // == Computed Properties ===================================================

  @readOnly
  @computed('isVertical')
  layoutStyle (isVertical) {
    return isVertical ? 'column' : 'row'
  },
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
