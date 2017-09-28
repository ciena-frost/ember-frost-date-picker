import Ember from 'ember'
const {isEmpty, run, typeOf} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {Component, EventsProxyMixin} from 'ember-frost-core'
import {Format} from 'ember-frost-date-picker'
import {PropTypes} from 'ember-prop-types'
import moment from 'moment'
import Pikaday from 'pikaday'

import layout from '../templates/components/frost-date-picker'
import PikadayOptions from '../utils/pikaday-options'

const DEFAULT_DATE_FORMAT = Format.date

export default Component.extend(EventsProxyMixin, {

  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  layout,

  // == PropTypes =============================================================

  propTypes: {
    // Pikaday has a number of options, see utils/pikaday-options

    // Options
    isIconVisible: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.null
    ]),  // No longer required, because UX requires us to be able to present empty selections
    format: PropTypes.string,

    // Events
    onChange: PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
      // Options for Pikaday
      theme: 'frost-theme',
      format: DEFAULT_DATE_FORMAT,

      // Options
      isIconVisible: true
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('value')
  _value (value) {
    if (isEmpty(value)) {
      // UX requires us to support date pickers that do not yet have a date picked.
      return undefined  // explicitly allow empty values for un-picked date values.
    }
    const validatedValue = moment(value, this.get('format'))
    if (validatedValue.isValid()) {
      return validatedValue.format(this.get('format'))
    }
    return 'Invalid'
  },

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
        onSelect: run.bind(this, this._onSelect),
        format: this.get('format')
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
