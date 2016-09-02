import Ember from 'ember'
import PikadayOptions from '../utils/pikaday-options'
import FrostText from 'ember-frost-core/components/frost-text'
import computed from 'ember-computed-decorators';
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
const {
  run,
  merge
} = Ember

export default FrostText.extend(PropTypeMixin, {
  classNames: ['frost-date-picker'],
  // == Pikaday Options ===========
  propTypes: {
    field: PropTypes.element,
    container: PropTypes.string,
    readonly: PropTypes.bool,
    options: PropTypes.object,
    format: PropTypes.string,
    onSelect: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onDraw: PropTypes.func
  },
  didInsertElement () {
    this._super(...arguments)
    this.set('field', this.get('element'))

    run.schedule('sync', this, function () {
      let options = {}
      let _assign = (el, value) => {
        if (value) {
          if (typeof value === 'function') {
            options[el] = run.bind(this, value)
          } else {
            options[el] = value
          }
        }
      }
      PikadayOptions.forEach(v => {
        switch (typeof v) {
          case 'object':
            _assign(v.label, this.get(v.ref))
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
      onSelect: this.actions.onSelect
    }
  },
  actions: {
    onSelect (date) {
      this.set('value', moment(date).format(this.get('format')))
    }
  }
})
