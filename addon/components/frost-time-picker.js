/**
 * Component definition for the frost-time-picker component
 */

import PropTypesMixin, {PropTypes} from 'ember-prop-types'
import computed, {readOnly} from 'ember-computed-decorators'
import FrostText from 'ember-frost-core/components/frost-text'
import SpreadMixin from 'ember-spread'
const {
  run: {
    scheduleOnce
  }
} = Ember

export default FrostText.extend(SpreadMixin, PropTypesMixin, {
  // == Dependencies ==========================================================

  // == PropTypes =============================================================
  propTypes: {
    value: PropTypes.string,
    readonly: PropTypes.bool,
    placement: PropTypes.string,
    align: PropTypes.string,
    donetext: PropTypes.string,
    autoclose: PropTypes.bool,
    validator: PropTypes.func,
    onSelect: PropTypes.func.isRequired,
    onError: PropTypes.func
  },

  /** @returns {Object} the default property values when not provided by consumer */
  getDefaultProps () {
    return {
      value: '00:00:00',
      readonly: true,
      placement: 'right',
      donetext: 'Done',
      autoclose: true,
      isValid: this.get('isValid'),
      hook: 'my-time-picker'
    }
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================
  isValid () {
    const regex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/
    return regex.test(this.get('value'))
  },
  // == DOM Events ============================================================
  change () {
    if (this.isValid()) {
      const onSelect = this.get('onSelect')
      const value = this.$('input').val()
      this.set('value', value)
      if (onSelect) {
        onSelect(value)
      }
    } else {
      const onError = this.get('onError')
      if (onError) {
        onError(new Error('Invalid input'))
      }
    }
  },
  // == Lifecycle Hooks =======================================================
  didInsertElement () {
    this._super(...arguments)
    scheduleOnce('sync', this, function () {
      this.$().clockpicker({
        placement: this.get('placement'),
        donetext: this.get('donetext'),
        autoclose: this.get('autoclose')
      })
    })
  },
  willDestroyElement () {
    this._super(...arguments)
    scheduleOnce('sync', this, function () {
      this.$().clockpicker('remove')
    })
  }
})
