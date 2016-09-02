import Ember from 'ember'
import PikadayOptions from '../utils/pikaday-options'
import FrostText from 'ember-frost-core/components/frost-text'
import computed from 'ember-computed-decorators';

const {
  run,
  merge
} = Ember

export default FrostText.extend({
  classNames: ['frost-date-picker'],
  // == Pikaday Options ===========

  // allow options to be provided as hash
  options: {},
  @computed
  field () {
    return this.get('element')
  },
  format: 'YYYY-MM-DD',
  onSelect (date) {
    this.set('value', moment(date).format(this.get('format')))
  },
  didInsertElement () {
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
  }
})
