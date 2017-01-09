/**
 * Component definition for the frost-time-picker component
 */
import Ember from 'ember'
import PropTypesMixin, {PropTypes} from 'ember-prop-types'
import FrostText from 'ember-frost-core/components/frost-text'
import SpreadMixin from 'ember-spread'

const {
  run: {
    scheduleOnce
  }
} = Ember

const {
  moment
} = window

export default FrostText.extend(SpreadMixin, PropTypesMixin, {
  // == Dependencies ==========================================================

  // == PropTypes =============================================================
  propTypes: {
    hook: PropTypes.string,
    options: PropTypes.object,
    format: PropTypes.string,
    readonly: PropTypes.bool,
    placement: PropTypes.string,
    align: PropTypes.string,
    timeRegex: PropTypes.object,
    donetext: PropTypes.string,
    autoclose: PropTypes.bool,
    validator: PropTypes.func,
    onSelect: PropTypes.func,
    onError: PropTypes.func
  },

  /** @returns {Object} the default property values when not provided by consumer */
  getDefaultProps () {
    return {
      format: 'HH:mm:ss',
      readonly: true,
      placement: 'right',
      donetext: 'Done',
      autoclose: true,
      hook: 'time-picker',
      timeRegex: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/
    }
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================
  isValid (value) {
    const regex = this.get('timeRegex')

    if (this.validator) {
      let result = this.validator(value)
      if (result === false) {
        return {
          isValid: false,
          error: 'Validation error'
        }
      } else if (result.isValid === false) {
        return result
      }
    }
    return {
      isValid: regex.test(value),
      error: Error('Time does not match intended format')
    }
  },
  // == DOM Events ============================================================
  change () {
    const value = this.$('input').val()

    this.set('value', value)
    let result = this.isValid(value)
    if (result.isValid) {
      const onSelect = this.get('onSelect')
      if (onSelect) {
        onSelect(value)
      }
    } else {
      const onError = this.get('onError')
      const e = result.error || 'Invalid input'
      if (onError) {
        onError(e)
      } else {
        console.warn(e)
      }
    }
  },
  // == Lifecycle Hooks =======================================================
  didInsertElement () {
    this._super(...arguments)
    scheduleOnce('sync', this, function () {
      this.set(
        'value',
        this.get('value') || moment().format(this.get('format'))
      )
      this.$().clockpicker({
        placement: this.get('placement'),
        donetext: this.get('donetext'),
        autoclose: this.get('autoclose')
      })
    })
  },
  willDestroyElement () {
    this.$().clockpicker('remove')
    this._super(...arguments)
  }
})
