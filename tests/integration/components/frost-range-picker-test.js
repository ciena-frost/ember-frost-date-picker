/**
 * Integration test for the frost-range-picker component
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

const test = integration('frost-range-picker')
describe(test.label, function () {
  test.setup()

  const rangeValue = {
    end: moment().subtract(1, 'day').subtract(1, 'hour').format(Format.dateTime),
    start: moment().subtract(2, 'day').subtract(1, 'hour').format(Format.dateTime)
  }
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
        rangeValue
      })

      this.render(hbs`
        {{frost-range-picker
          hook=myHook
          onChange=onChange
          value=rangeValue
        }}
      `)

      return wait()
    })

    it('should be set to horizontal display', function () {
      expect($hook('myHook')).to.have.class('horizontal')
    })
  })

  describe('when startTitle property is set', function () {
    const startTitle = 'Start Range'

    beforeEach(function () {
      this.setProperties({
        myHook: 'myHook',
        onChange: function () {},
        rangeValue,
        startTitle
      })

      this.render(hbs`
        {{frost-range-picker
          hook=myHook
          onChange=onChange
          startTitle=startTitle
          value=rangeValue
        }}
      `)

      return wait()
    })

    it('should be set in DOM', function () {
      expect($hook('myHook-start-title').text().trim()).to.equal(startTitle)
    })
  })

  describe('when endTitle property is set', function () {
    const endTitle = 'End Range'

    beforeEach(function () {
      this.setProperties({
        endTitle,
        myHook: 'myHook',
        onChange: function () {},
        rangeValue
      })

      this.render(hbs`
        {{frost-range-picker
          endTitle=endTitle
          hook=myHook
          onChange=onChange
          value=rangeValue
        }}
      `)

      return wait()
    })

    it('should be set in DOM', function () {
      expect($hook('myHook-end-title').text().trim()).to.equal(endTitle)
    })
  })

  describe('when isVertical property is set', function () {
    beforeEach(function () {
      this.setProperties({
        isVertical: true,
        myHook: 'myHook',
        onChange: function () {},
        rangeValue
      })

      this.render(hbs`
        {{frost-range-picker
          endTitle=endTitle
          hook=myHook
          isVertical=isVertical
          onChange=onChange
          value=rangeValue
        }}
      `)

      return wait()
    })

    it('should be set to vertical display', function () {
      expect($hook('myHook')).to.have.class('vertical')
    })
  })

  describe('when the start property is set', function () {
    beforeEach(function () {
      registerMockComponent(this, 'mock-start', {
        classNames: 'mock-start'
      })

      this.setProperties({
        myHook: 'myHook',
        onChange: function () {},
        rangeValue
      })

      this.render(hbs`
        {{frost-range-picker
          hook=myHook
          onChange=onChange
          start=(component 'mock-start')
          value=rangeValue
        }}
      `)

      return wait()
    })

    afterEach(function () {
      unregisterMockComponent(this, 'mock-start')
    })

    it('should use provided start component', function () {
      expect(this.$('.mock-start')).to.have.length(1)
    })
  })

  describe('when the end property is set', function () {
    beforeEach(function () {
      registerMockComponent(this, 'mock-end', {
        classNames: 'mock-end'
      })

      this.setProperties({
        myHook: 'myHook',
        onChange: function () {},
        rangeValue
      })

      this.render(hbs`
        {{frost-range-picker
          hook=myHook
          onChange=onChange
          end=(component 'mock-end')
          value=rangeValue
        }}
      `)

      return wait()
    })

    afterEach(function () {
      unregisterMockComponent(this, 'mock-end')
    })

    it('should use provided end component', function () {
      expect(this.$('.mock-end')).to.have.length(1)
    })
  })
})
