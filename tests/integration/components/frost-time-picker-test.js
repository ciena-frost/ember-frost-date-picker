/**
 * Integration test for the frost-time-picker component
 */

import {expect} from 'chai'
import {Format} from 'ember-frost-date-picker'
import {$hook, initialize as initializeHook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import moment from 'moment'
import sinon from 'sinon'

const test = integration('frost-time-picker')
describe(test.label, function () {
  test.setup()

  const timeValue = moment().subtract(1, 'hour').format(Format.time)
  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    initializeHook()
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('default rendered state', function () {
    beforeEach(function () {
      this.setProperties({
        myHook: 'myHook',
        onChange: function () {},
        timeValue
      })

      this.render(hbs`
        {{frost-time-picker
          hook=myHook
          onChange=onChange
          value=timeValue
        }}
      `)

      return wait()
    })

    it('should be accessible via the hook', function () {
      expect($hook('myHook-input')).to.have.value(timeValue)
    })
  })
})
