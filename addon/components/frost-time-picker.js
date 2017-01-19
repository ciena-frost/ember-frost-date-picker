/**
 * Component definition for the frost-time-picker component
 */
import Ember from 'ember'
import PropTypesMixin, {PropTypes} from 'ember-prop-types'
import FrostText from 'ember-frost-core/components/frost-text'
import SpreadMixin from 'ember-spread'
import computed from 'ember-computed-decorators'

const {
  run: {
    scheduleOnce,
    bind
  }
} = Ember

const {
  moment
} = window

const {
  max,
  min
} = Math
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
  @computed('value')
  currentValue: {
    get (value) {
      if (!value) {
        return ''
      }
      const d = moment()
      const s = value.split(':')
      const format = this.get('format')

      return d
        .hours(max(0, min(23, +s[0] || 0)))
        .minutes(max(0, min(59, +s[1] || 0)))
        .seconds(max(0, min(59, +s[2] || 0)))
        .format(format)
    },
    set (value) {
      return value
    }
  },
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
  sync (cb) {
    scheduleOnce('sync', this, cb)
  },
  // == DOM Events ============================================================
  afterDone () {
    const previousValue = this.get('previousValue')
    const value = this.get('currentValue')
    this.set('value', value)

    if (value === previousValue) {
      return
    }
    if (this.isValid(value)) {
      const onSelect = this.get('onSelect')
      if (onSelect) {
        onSelect(value)
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
    this.set('previousValue', value)
  },
  change () {
    const value = this.$('input').val()
    this.set('value', value)
  },
  keyPress (e) {
    if (e.keyCode === 13) {
      this.sync(function () {
        this.$().clockpicker('hide')
      })
    }
  },
  // == Lifecycle Hooks =======================================================
  didInsertElement () {
    this._super(...arguments)
    this.sync(function () {
      const format = this.get('format')
      const value = this.get('currentValue') || moment().format(format)

      this.setProperties({
        value,
        previousValue: value
      })

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
