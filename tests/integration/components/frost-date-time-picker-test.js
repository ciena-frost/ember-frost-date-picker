/**
 * Integration test for the frost-date-time-picker component
 */

import {expect} from 'chai'
import {Format} from 'ember-frost-date-picker'
import {$hook, initialize as initializeHook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import {registerMockComponent, unregisterMockComponent} from 'ember-test-utils/test-support/mock-component'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import moment from 'moment'
import sinon from 'sinon'

const test = integration('frost-date-time-picker')
describe(test.label, function () {
  test.setup()

  const dateTimeValue = moment().subtract(1, 'day').subtract(1, 'hour').format(Format.dateTime)
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
        dateTimeValue,
        onChange: function () {}
      })

      this.render(hbs`
        {{frost-date-time-picker
          hook=myHook
          onChange=onChange
          value=dateTimeValue
        }}
      `)

      return wait()
    })

    it('should use frost-date-picker component by default', function () {
      expect($hook('myHook-date-picker-input')).to.have.length(1)
    })

    it('should use frost-time-picker component by default', function () {
      expect($hook('myHook-time-picker-input')).to.have.length(1)
    })
  })

  describe('when the date property is set', function () {
    beforeEach(function () {
      registerMockComponent(this, 'mock-date', {
        classNames: 'mock-date'
      })

      this.setProperties({
        myHook: 'myHook',
        dateTimeValue,
        onChange: function () {}
      })

      this.render(hbs`
        {{frost-date-time-picker
          date=(component 'mock-date')
          hook=myHook
          onChange=onChange
          value=dateTimeValue
        }}
      `)

      return wait()
    })

    afterEach(function () {
      unregisterMockComponent(this, 'mock-date')
    })

    it('should use provided date component', function () {
      expect(this.$('.mock-date')).to.have.length(1)
    })
  })

  describe('when the time property is set', function () {
    beforeEach(function () {
      registerMockComponent(this, 'mock-time', {
        classNames: 'mock-time'
      })

      this.setProperties({
        myHook: 'myHook',
        dateTimeValue,
        onChange: function () {}
      })

      this.render(hbs`
        {{frost-date-time-picker
          time=(component 'mock-time')
          hook=myHook
          onChange=onChange
          value=dateTimeValue
        }}
      `)

      return wait()
    })

    afterEach(function () {
      unregisterMockComponent(this, 'mock-time')
    })

    it('should use provided time component', function () {
      expect(this.$('.mock-time')).to.have.length(1)
    })
  })

  describe('value is invalid', function () {
    beforeEach(function () {
      this.setProperties({
        myHook: 'myHook',
        dateTimeValue: 'invalid',
        onChange: function () {}
      })

      this.render(hbs`
        {{frost-date-time-picker
          hook=myHook
          onChange=onChange
          value=dateTimeValue
        }}
      `)

      return wait()
    })

    it('should error class on frost-date-picker', function () {
      expect($hook('myHook-date-picker')).to.have.class('error')
    })

    it('should error class on frost-date-picker', function () {
      expect($hook('myHook-time-picker')).to.have.class('error')
    })
  })
})
