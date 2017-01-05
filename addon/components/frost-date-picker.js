import Ember from 'ember'
import PikadayOptions from '../utils/pikaday-options'
import FrostText from 'ember-frost-core/components/frost-text'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import SpreadMixin from 'ember-spread'
import layout from '../templates/components/frost-date-picker'

const {
  run,
  merge,
  computed
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
    format: PropTypes.string,
    theme: PropTypes.string,
    onSelect: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onDraw: PropTypes.func,
    validator: PropTypes.func,
    hideIcon: PropTypes.bool,
    currentDate: PropTypes.string,
    INVALID_DATE_ERROR: PropTypes.string
  },
  field: computed(function () {
    return this.$('input')[0]
  }),
  didInsertElement () {
    this._super(...arguments)
    run.schedule('sync', this, function () {
      this.set(
        'value',
        this.get('value') || moment().format(this.get('format'))
      )
      this.set('currentDate', this.get('value'))
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
  willDestroyElement () {
    this._super(...arguments)
    this.get('el').destroy()
  },
  isValid (v) {
    if (this.validator) {
      debugger

      if (!this.validator(v)) {
        return false
      }
    }
    return moment(v).isValid()
  },
  getDefaultProps () {
    return {
      options: {},
      format: 'YYYY-MM-DD',
      theme: 'frost-theme',
      hideIcon: false,
      INVALID_DATE_ERROR: 'Invalid Date Format, default is YYYY-MM-DD'
    }
  },
  actions: {
    _onSelect (date) {
      const input = this.$('.frost-text-input')
      let el = this.get('el')
      let value = el.toString()
      if (this.isValid(value)) {
        const onSelect = this.get('onSelect')
        this.set('value', value)
        this.set('currentDate', value)
        input.removeClass('error-invalid')

        if (onSelect) {
          onSelect(value, el)
        }
      } else {
        const onError = this.get('onError')
        const e = Error(this.get('INVALID_DATE_ERROR'))
        this.set('field.value', this.get('currentDate'))
        input.addClass('error-invalid')
        if (onError) {
          onError(e)
        } else {
          console.warn(e)
        }
      }
    },
    _onKeyPress (e) {
      if (e.keyCode === 13) {
        let v = this.$('input').val()
        if (this.isValid(v)) {
          this.set('field.value', v)
        } else {
          const onError = this.get('onError')
          const e = Error(this.get('INVALID_DATE_ERROR'))
          if (onError) {
            onError(e)
          } else {
            console.warn(e)
          }
          let d = moment(this.get('el').getDate())
          this.set('field.value', d.format(this.get('format')))
        }
      }
    }
  }
})
