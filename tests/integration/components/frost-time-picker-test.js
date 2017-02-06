/**
 * Integration test for the frost-time-picker component
 */

import {expect} from 'chai'
import {$hook, initialize as initializeHook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import {integration} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = integration('frost-time-picker')
describe(test.label, function () {
  test.setup()

  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    initializeHook()
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe.skip('after render', function () {
    beforeEach(function () {
      this.setProperties({
        myHook: 'myThing'
      })

      this.render(hbs`
        {{frost-time-picker
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
