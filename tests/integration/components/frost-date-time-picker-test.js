/**
 * Integration test for the frost-date-time-picker component
 */

import {expect} from 'chai'
import {$hook, initialize as initializeHook} from 'ember-hook'
import {describeComponent, it} from 'ember-mocha'
import wait from 'ember-test-helpers/wait'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe} from 'mocha'
import sinon from 'sinon'

describeComponent.skip(
  'frost-date-time-picker',
  'Integration: EmberFrostDateTimePickerComponent',
  {
    integration: true
  },
  function () {
    let sandbox

    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      initializeHook()
    })

    afterEach(function () {
      sandbox.restore()
    })

    describe('after render', function () {
      beforeEach(function () {
        this.setProperties({
          myHook: 'myThing'
        })

        this.render(hbs`
          {{frost-date-time-picker
            hook=myHook
          }}
        `)

        return wait()
      })
      it('should have an element', function () {
        expect(this.$()).to.have.length(1)
      })

      it('should be accessible via the hook', function () {
        expect($hook('myThing')).to.have.length(1)
      })
    })
  })
