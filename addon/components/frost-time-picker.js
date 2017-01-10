/**
 * Component definition for the frost-time-picker component
 */
import Ember from 'ember'
import PropTypesMixin, {PropTypes} from 'ember-prop-types'
import FrostText from 'ember-frost-core/components/frost-text'
import SpreadMixin from 'ember-spread'

const {
  run: {
    scheduleOnce,
    bind
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
      timeRegex: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
      GENERIC_ERROR: 'Invalid Time Input'
    }
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================
  isValid (value) {
    const regex = this.get('timeRegex')

    if (this.validator) {
      const result = this.validator(value)
      if (result !== undefined) {
        return result
      }
    }
    return regex.test(value)
  },
  // == DOM Events ============================================================
  afterDone () {
    const previousValue = this.get('previousValue')
    const value = this.get('value')
    if (this.isValid(value)) {
      const onSelect = this.get('onSelect')
      if (onSelect && value !== previousValue) {
        onSelect(value)
        this.set('previousValue', value)
      }
    } else {
      const onError = this.get('onError')
      const e = this.get('GENERIC_ERROR')
      if (onError) {
        onError(e)
      } else {
        console.warn(e)
      }
    }
  },
  change () {
    const value = this.$('input').val()
    this.set('value', value)
  },
  // == Lifecycle Hooks =======================================================
  didInsertElement () {
    this._super(...arguments)
    scheduleOnce('sync', this, function () {
      const value = this.get('value') || moment().format(this.get('format'))

      this.set('value', value)
      this.set('previousValue', value)

      this.$().clockpicker({
        placement: this.get('placement'),
        donetext: this.get('donetext'),
        autoclose: this.get('autoclose'),
        format: this.get('format'),
        afterDone: bind(this, this.afterDone)
      })
    })
  },
  willDestroyElement () {
    this.$().clockpicker('remove')
    this._super(...arguments)
  }
})
