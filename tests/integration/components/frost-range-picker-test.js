/**
 * Integration test for the frost-range-picker component
 */

import {expect} from 'chai'
import {$hook, initialize as initializeHook} from 'ember-hook'
import {describeComponent, it} from 'ember-mocha'
import wait from 'ember-test-helpers/wait'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe} from 'mocha'
import sinon from 'sinon'

describeComponent(
  'frost-range-picker',
  'Integration: EmberFrostRangePickerComponent',
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
          {{frost-range-picker
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
