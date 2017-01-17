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
    bind,
    scheduleOnce
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
    currentValue: PropTypes.object,
    currentStart: PropTypes.object,
    currentEnd: PropTypes.object,
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
    const now = moment()

    return {
      hook: 'range-picker',
      timeRegex: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
      startValidator: this.get('isValid'),
      endValidator: this.get('isValid'),
      isVertical: false,
      currentStart: now,
      currentEnd: now,
      currentValue: {
        start: now,
        end: now
      }
    }
  },

  // == Functions =============================================================
  isValid (value) {
    const start = moment(this.get('currentStart'))
    const end = moment(this.get('currentEnd'))

    if (!start.isValid() || !end.isValid()) {
      return false
    }
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
  @computed('currentStart', 'currentEnd')
  value: {
    get (start, end) {
      return {
        start,
        end
      }
    },
    set (value) {
      return value
    }
  },

  @computed('value')
  currentValue: {
    get (value) {
      return value
    },
    set (value) {
      return value
    }
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
  didInsertElement () {
    this._super(...arguments)

    const now = moment()

    const props = this.get('getDefaultProps.lastObject').call(this)
    const get = (e) => {
      return this.get(e) || props[e]
    }
    scheduleOnce('sync', this, function () {
      this.setProperties({
        currentStart: get('currentStart'),
        currentEnd: get('currentEnd'),
        value: get('currentValue')
      })
    })
  },
  actions: {
    onSelect () {
      const onSelect = this.get('onSelect')
      const value = {
        start: this.get('currentStart'),
        end: this.get('currentEnd')
      }
      this.set('value', value)
      if (onSelect) {
        onSelect(value)
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
