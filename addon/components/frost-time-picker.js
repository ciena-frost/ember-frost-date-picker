/**
 * Component definition for the frost-time-picker component
 */

import Ember from 'ember'
import computed, {readOnly} from 'ember-computed-decorators'
const {run} = Ember
import {Text, utils} from 'ember-frost-core'
import {Format} from 'ember-frost-date-picker'
import {PropTypes} from 'ember-prop-types'
import moment from 'moment'

const DEFAULT_TIME_FORMAT = Format.time

export default Text.extend({

  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  // == PropTypes =============================================================

  propTypes: {
    // Options for https://weareoutman.github.io/clockpicker/
    autoclose: PropTypes.bool,
    donetext: PropTypes.string,
    format: PropTypes.string,
    placement: PropTypes.string,

    // Options
    value: PropTypes.string.isRequired,

    // Events
    onChange: PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
      // Options for https://weareoutman.github.io/clockpicker/
      autoclose: false,
      donetext: 'Set',
      format: DEFAULT_TIME_FORMAT,
      placement: 'right'
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('value')
  _value (value) {
    const momentValue = moment(value, this.get('format'))
    if (momentValue.isValid()) {
      return momentValue.format(this.get('format'))
    }
    return 'Invalid'
  },

  // == Functions =============================================================

  _clockPickerFormat (value) {
    return moment(value, this.get('format')).format(DEFAULT_TIME_FORMAT)
  },

  _displayFormat (value) {
    return moment(value, DEFAULT_TIME_FORMAT).format(this.get('format'))
  },

  // Named to match the event from https://weareoutman.github.io/clockpicker/
  _afterDone () {
    const value = this.$('input').val()
    this.onChange(this._displayFormat(value))
  },

  // Named to match the event from https://weareoutman.github.io/clockpicker/
  _beforeShow () {
    let value = this.$('input').val()
    this.$('input').val(this._clockPickerFormat(value)) // Clock picker only works with this format
  },

  // Named to match the event from https://weareoutman.github.io/clockpicker/
  _init () {
    this.$('input').val(this.get('_value'))
  },

  // == DOM Events ============================================================

  keyPress (e) {
    if (e.keyCode === utils.keyCodes.ENTER) {
      run.scheduleOnce('sync', this, function () {
        this.$().clockpicker('hide')
      })
    }
  },

  // == Lifecycle Hooks =======================================================

  didInsertElement () {
    this._super(...arguments)

    run.scheduleOnce('sync', this, function () {
      this.$().clockpicker({
        autoclose: this.get('autoclose'),
        donetext: this.get('donetext'),
        format: this.get('format'),
        placement: this.get('placement'),
        afterDone: run.bind(this, this._afterDone),
        beforeShow: run.bind(this, this._beforeShow),
        init: run.bind(this, this._init)
      })
    })
  },

  willDestroyElement () {
    this.$().clockpicker('remove')
    this._super(...arguments)
  }

  // == Actions ===============================================================

})
