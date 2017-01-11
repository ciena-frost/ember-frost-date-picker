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
      readonly: false,
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
  testRegex (value) {
    const regex = this.get('timeRegex')
    return regex.test(value)
  },
  isValid (value) {
    if (this.validator) {
      const result = this.validator(value)
      if (result !== undefined) {
        return result
      }
    }
    return this.testRegex(value)
  },
  syncTask (cb) {
    scheduleOnce('sync', this, cb)
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
      this.set('value', previousValue)
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
  focusOut () {
    this.syncTask(function () {
      this.$().clockpicker('hide')
    })
  },
  keyPress (e) {
    if (e.keyCode === 13) {
      this.syncTask(function () {
        this.$().clockpicker('hide')
      })
    }
  },
  // == Lifecycle Hooks =======================================================
  didInsertElement () {
    this._super(...arguments)
    this.syncTask(function () {
      const format = this.get('format')
      const value = this.get('value') || moment().format(format)

      this.set('value', value)
      this.set('previousValue', value)

      this.$().clockpicker({
        format,
        placement: this.get('placement'),
        donetext: this.get('donetext'),
        autoclose: this.get('autoclose'),
        afterDone: bind(this, this.afterDone)
      })
    })
  },
  willDestroyElement () {
    this.$().clockpicker('remove')
    this._super(...arguments)
  }
})
