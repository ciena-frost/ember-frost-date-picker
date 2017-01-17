import Ember from 'ember'
import PikadayOptions from '../utils/pikaday-options'
import FrostText from 'ember-frost-core/components/frost-text'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import SpreadMixin from 'ember-spread'
import layout from '../templates/components/frost-date-picker'
import computed from 'ember-computed-decorators'

const {
  run,
  merge
} = Ember

const {
  moment,
  Pikaday
} = window

export default FrostText.extend(SpreadMixin, PropTypeMixin, {
  layout,
  // == Pikaday Options ===========
  propTypes: {
    options: PropTypes.object,
    hook: PropTypes.string,
    currentValue: PropTypes.string,
    format: PropTypes.string,
    theme: PropTypes.string,
    onSelect: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onDraw: PropTypes.func,
    validator: PropTypes.func,
    hideIcon: PropTypes.bool,
    GENERIC_ERROR: PropTypes.string
  },
  @computed()
  field () {
    return this.$('input')[0]
  },
  didInsertElement () {
    this._super(...arguments)
    run.scheduleOnce('sync', this, function () {
      const fmt = this.get('format')
      const _value = this.get('currentValue') || moment().format(fmt)
      this.setProperties({
        value: _value,
        currentValue: _value
      })
      let options = {}
      let _assign = (el, value, type) => {
        if (value) {
          if (type === 'callback') {
            options[el] = run.bind(this, value)
          } else {
            options[el] = value
          }
        }
      }
      PikadayOptions.forEach(v => {
        switch (typeof v) {
          case 'object':
            _assign(v.label, this.get(v.ref), v.type)
            break
          case 'string':
            _assign(v, this.get(v))
        }
      })
      options['onSelect'] = run.bind(this, this.actions._onSelect)
      this.set(
        'el',
        new Pikaday(merge(this.get('options'), options))
      )
    })
  },
  change () {
    this._actions._onSelect.call(this, null)
  },
  willDestroyElement () {
    this.get('el').destroy()
    this._super(...arguments)
  },
  isValid (value) {
    if (this.validator) {
      let result = this.validator(value)
      if (result !== undefined) {
        return result
      }
    }
    return moment(value).isValid()
  },
  getDefaultProps () {
    return {
      hook: 'date-picker',
      options: {},
      format: 'YYYY-MM-DD',
      theme: 'frost-theme',
      hideIcon: false,
      GENERIC_ERROR: 'Invalid Date Format'
    }
  },
  actions: {
    _onSelect (date) {
      const attempt = this.$('input').val()
      const value = this.get('el').toString()
      const previousValue = this.get('previousValue')

      this.set('currentValue', value)

      if (this.isValid(attempt)) {
        const onSelect = this.get('onSelect')

        if (value !== previousValue) {
          if (onSelect && !this.get('onSelectFired')) {
            onSelect(value)
          }
          this.set('didError', null)
        }
      } else if (!this.get('didError')){
        const onError = this.get('onError')
        const e = Error(this.get('GENERIC_ERROR'))
        if (onError && !this.get('onErrorFired')) {
          onError(e)
        }
        this.set('didError', true)
      }
      this.set('previousValue', value)
    }
  }
})
