import Ember from 'ember'
import PikadayOptions from '../utils/pikaday-options'
import FrostText from 'ember-frost-core/components/frost-text'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-date-picker';

const {
  run,
  merge
} = Ember

export default FrostText.extend(PropTypeMixin, {
  layout,
  classNames: ['frost-date-picker'],
  // == Pikaday Options ===========
  propTypes: {
    options: PropTypes.object,
    format: PropTypes.string,
    theme: PropTypes.string,
    onSelect: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onDraw: PropTypes.func
  },
  didInsertElement () {
    this._super(...arguments)
    run.schedule('sync', this, function () {
      this.set('field', this.get('element'))
      this.set(
        'value',
        this.get('value') || moment().format(this.get('format'))
      )
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
      this.set(
        'el',
        new window.Pikaday(merge(this.get('options'), options))
      )
    })
  },
  willDestroyElement () {
    this._super(...arguments)
    this.get('el').destroy()
  },
  getDefaultProps () {
    return {
      options: {},
      format: 'YYYY-MM-DD',
      theme: 'frost-theme',
      onSelect: this.actions.onSelect
    }
  },
  actions: {
    onSelect (date) {
      this.set('value', moment(date).format(this.get('format')))
    }
  }
})
