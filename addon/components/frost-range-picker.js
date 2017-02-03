/**
 * Component definition for the frost-range-picker component
 */

import Ember from 'ember'
const {get} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'
import moment from 'moment'

import layout from '../templates/components/frost-range-picker'

export default Component.extend({

  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  layout,
  classNameBindings: ['error:has-errored'],

  // == PropTypes =============================================================

  propTypes: {
    end: PropTypes.object,
    endTitle: PropTypes.string,
    isVertical: PropTypes.bool,
    start: PropTypes.object,
    startTitle: PropTypes.string,
    validator: PropTypes.func,
    value: PropTypes.shape({
      end: PropTypes.object,
      start: PropTypes.object
    }),

    onChange: PropTypes.func,
    onError: PropTypes.func
  },

  getDefaultProps () {
    const now = moment()

    return {
      endValidator: this.get('isValid'),
      isVertical: false,
      startValidator: this.get('isValid'),
      value: {
        end: now,
        start: now
      }
    }
  },

  // == Functions =============================================================

  isValid () {
    const value = this.get('value')
    const end = moment(get(value, 'end'))
    const start = moment(get(value, 'start'))

    // Validate using moment.js
    if (!end.isValid() || !start.isValid()) {
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
  @computed('value.end')
  endTime (end) {
    const endDate = moment(end)
    return `${endDate.hours()}:${endDate.minutes()}:${endDate.seconds()}`
  },

  @readOnly
  @computed('value.start')
  startTime (start) {
    const startDate = moment(start)
    return `${startDate.hours()}:${startDate.minutes()}:${startDate.seconds()}`
  },

  // == Lifecycle Hooks =======================================================

  init () {
    this._super(...arguments)

    // bind context to both functions
    this.set('startValidator', this.get('startValidator').bind(this))
    this.set('endValidator', this.get('endValidator').bind(this))
  },

  actions: {
    onEndChange () {
      this.set('error', null)
      this.onChange({
        start: this.get('start'),
        end: this.get('end')
      })
    },

    onStartChange () {
      this.set('error', null)
      this.onChange({
        start: this.get('start'),
        end: this.get('end')
      })
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
