/**
 * Component definition for the frost-date-time-picker component
 */
import Ember from 'ember'
const {run} = Ember
import computed from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'
import PropTypesMixin, {PropTypes} from 'ember-prop-types'
import SpreadMixin from 'ember-spread'
import moment from 'moment'

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
    hook: PropTypes.string,
    readonly: PropTypes.bool,
    dateFormat: PropTypes.string,
    timeFormat: PropTypes.string,
    defaultDate: PropTypes.string,
    defaultTime: PropTypes.string,
    dateValidator: PropTypes.func,
    timeValidator: PropTypes.func,
    onSelect: PropTypes.func,
    onError: PropTypes.func
  },

  /** @returns {Object} the default property values when not provided by consumer */
  getDefaultProps () {
    return {
      hook: 'date-time-picker',
      readonly: false,
      dateFormat: 'YYYY-MM-DD',
      timeFormat: 'HH:mm:ss'
    }
  },

  // == Computed Properties ===================================================
  @computed('defaultDate', 'defaultTime')
  currentValue: {
    get (date, time) {
      if (!date || !time) {
        return 'Invalid Date'
      }

      const d = moment(date)
      const s = time.split(':')

      d
        .hours(s[0])
        .minutes(s[1])
        .seconds(s[2])
      return d
    },
    set (value) {
      const df = this.get('dateFormat')
      const tf = this.get('timeFormat')
      const now = moment()

      if (value && value._isMomentObject) {
        this.setProperties({
          defaultDate: now.format(df),
          defaultTime: now.format(tf)
        })
      }
      return value
    }
  },
  // == Functions =============================================================
  didInsertElement () {
    this._super(...arguments)
    const df = this.get('dateFormat')
    const tf = this.get('timeFormat')

    const now = moment()
    run.scheduleOnce('sync', this, function () {
      this.setProperties({
        defaultDate: this.get('defaultDate') || now.format(df),
        defaultTime: this.get('defaultTime') || now.format(tf)
      })
    })
  },
  // == Actions ===============================================================
  actions: {
    onSelect () {
      const value = this.get('currentValue')
      const onSelect = this.get('onSelect')
      if (onSelect) {
        onSelect(value)
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
    },
    focusDatePicker () {
      this.$('.frost-date-picker input').click()
    }
  }
})
