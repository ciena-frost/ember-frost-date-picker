/**
 * Component definition for the frost-time-picker component
 */

import Ember from 'ember'
const {run} = Ember
import {Text, utils} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

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
      format: 'HH:mm:ss',
      placement: 'right'
    }
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================

  // Named to match the event from https://weareoutman.github.io/clockpicker/
  afterDone () {
    const value = this.$('input').val()
    this.onChange(value)
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
        afterDone: run.bind(this, this.afterDone)
      })
    })
  },

  willDestroyElement () {
    this.$().clockpicker('remove')
    this._super(...arguments)
  }

  // == Actions ===============================================================

})
