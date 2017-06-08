import Ember from 'ember'
const {run, typeOf} = Ember
import {Component, EventsProxyMixin} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'
import Pikaday from 'pikaday'

import layout from '../templates/components/frost-date-picker'
import PikadayOptions from '../utils/pikaday-options'

export default Component.extend(EventsProxyMixin, {

  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  layout,

  // == PropTypes =============================================================

  propTypes: {
    // Pikaday has a number of options, see utils/pikaday-options

    // Options
    isIconVisible: PropTypes.bool,
    value: PropTypes.string.isRequired,

    // Events
    onChange: PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
      // Options for Pikaday
      theme: 'frost-theme',

      // Options
      isIconVisible: true
    }
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================

  _assignPikadayOption (pikadayOptions, el, value, type) {
    if (value) {
      if (type === 'callback') {
        pikadayOptions[el] = run.bind(this, value)
      } else {
        pikadayOptions[el] = value
      }
    }
  },

  // Named to match the event from Pikaday
  _onSelect () {
    const value = this.$('input').val()
    this.onChange(value)
  },

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  didInsertElement () {
    this._super(...arguments)

    run.scheduleOnce('sync', this, function () {
      const pikadayOptions = {
        field: this.$('input')[0],
        onSelect: run.bind(this, this._onSelect)
      }

      // Bind any other applicable local values and functions into the Pikaday options
      PikadayOptions.forEach(option => {
        switch (typeOf(option)) {
          case 'object':
            this._assignPikadayOption(pikadayOptions, option.label, this.get(option.ref), option.type)
            break
          case 'string':
            this._assignPikadayOption(pikadayOptions, option, this.get(option))
            break
        }
      })

      // Create the Pikaday element
      this.set('pikadayElement', new Pikaday(pikadayOptions))
    })
  },

  willDestroyElement () {
    // TODO: This will not be necessary once https://github.com/dbushell/Pikaday/issues/630 is fixed - @dafortin 2017.06.08
    document.removeEventListener('keydown', this.get('pikadayElement')._onKeyChange)
    this.get('pikadayElement').destroy()
    this._super(...arguments)
  }

  // == Actions ===============================================================

})
