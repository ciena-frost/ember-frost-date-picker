import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'frost-date-picker',
  'Integration: EmberFrostDatePickerComponent',
  {
    integration: true
  },
  function () {
    it('renders', function () {
      // Set any properties with this.set('myProperty', 'value')
      // Handle any actions with this.on('myAction', function (val) { ... })
      // Template block usage:
      // this.render(hbs`
      //   {{#frost-date-picker}}
      //     template content
      //   {{/frost-date-picker}}
      // `)

      this.render(hbs`{{frost-date-picker}}`)
      expect(this.$()).to.have.length(1)
    })
  }
)
