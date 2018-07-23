/**
 * Integration test for the frost-date-time-picker component
 */

import {expect} from 'chai'
import Ember from 'ember'
import {utils} from 'ember-frost-core'
import {Format} from 'ember-frost-date-picker'
import {openDatepicker} from 'ember-frost-date-picker/test-support/frost-date-picker'
import {openTimepicker} from 'ember-frost-date-picker/test-support/frost-time-picker'
import {$hook, initialize as initializeHook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import {registerMockComponent, unregisterMockComponent} from 'ember-test-utils/test-support/mock-component'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import moment from 'moment'
import sinon from 'sinon'

const {$} = Ember

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

  describe('when no value is provided', function () {
    beforeEach(function () {
      this.setProperties({
        myHook: 'myHook',
        dateTimeValue: undefined,
        onChange: function () {}
      })

      this.render(hbs`
        {{frost-date-time-picker
          hook=myHook
          onChange=onChange
          value=dateTimeValue
        }}
      `)
    })

    it('should show a blank date value', function () {
      expect($hook('myHook-date-picker')).to.have.value('')
    })

    it('should show a blank time value', function () {
      expect($hook('myHook-time-picker')).to.have.value('')
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

  describe('date pickers dateFormat is set', function () {
    const dateTimeValue = moment('2017 01 01 01 23 45', 'YYYY MM DD hh mm ss').format(Format.dateTime)
    beforeEach(function () {
      this.setProperties({
        myHook: 'myHook',
        dateTimeValue: dateTimeValue,
        onChange: function () {},
        dateFormat: 'MM/DD/YY'
      })

      this.render(hbs`
        {{frost-date-time-picker
          hook=myHook
          onChange=onChange
          value=dateTimeValue
          dateFormat=dateFormat
        }}
      `)

      return wait()
    })

    it('should format selected date with provided date format', function () {
      expect($hook('myHook-date-picker-input').val()).to.equal('01/01/17')
    })
  })

  describe('time pickers timeFormat is set', function () {
    const dateTimeValue = moment('2017 01 01 01 23 45', 'YYYY MM DD hh mm ss').format(Format.dateTime)
    beforeEach(function () {
      this.setProperties({
        myHook: 'myHook',
        dateTimeValue: dateTimeValue,
        onChange: function () {},
        timeFormat: 'hh-mm-ss'
      })

      this.render(hbs`
        {{frost-date-time-picker
          hook=myHook
          onChange=onChange
          value=dateTimeValue
          timeFormat=timeFormat
        }}
      `)

      return wait()
    })

    it('should format selected time with provided time format', function () {
      expect($hook('myHook-time-picker-input').val()).to.equal('01-23-45')
    })
  })

  describe('dateTimeFormat is set', function () {
    const dateTimeValue = moment('2017 01 01 01 23 45', 'YYYY MM DD hh mm ss').format(Format.dateTime)
    let changeStub
    beforeEach(function () {
      changeStub = sandbox.stub()
      this.setProperties({
        myHook: 'myHook',
        dateTimeValue: dateTimeValue,
        onChange: changeStub,
        dateTimeFormat: 'MM/DD/YY :: hh-mm-ss'
      })
      this.render(hbs`
        {{frost-date-time-picker
          hook=myHook
          onChange=onChange
          value=dateTimeValue
          dateTimeFormat=dateTimeFormat
        }}
      `)

      return wait().then(() => {
        const interactor = openDatepicker('myHook-date-picker')
        interactor.selectDate(new Date(2017, 0, 24))
        this.$().click() // Click outside date picker to close it
      })
    })

    it('should have selected time passed to onChange using provided dateTimeFormat', function () {
      expect(changeStub).to.have.been.calledWith('01/24/17 :: 01-23-45')
    })
  })

  describe('enter new time in input field', function () {
    let changeStub
    let timepicker
    beforeEach(function () {
      changeStub = sandbox.stub()
      this.setProperties({
        myHook: 'myHook',
        timeValue: '01-23-45',
        timeFormat: 'HH-mm-ss',
        onChange: changeStub
      })

      this.render(hbs`
        {{frost-time-picker
          hook=myHook
          value=timeValue
          format=timeFormat
          onChange=onChange
        }}
      `)

      return wait().then(() => {
        timepicker = openTimepicker('myHook')
      })
    })

    it('should initially display expected hour value', function () {
      expect(timepicker.getSelectedTime().hour).to.eql('01')
    })

    it('should initially display expected minute value', function () {
      expect(timepicker.getSelectedTime().minute).to.eql('23')
    })

    it('should initially display expected second value', function () {
      expect(timepicker.getSelectedTime().second).to.eql('45')
    })

    describe('when enter new time', function () {
      const hour = '05'
      const minute = '22'
      const seconds = '15'

      beforeEach(function () {
        return wait().then(() => {
          $hook('myHook-input').val(`${hour}:${minute}:${seconds}`)
          $hook('myHook-input').trigger($.Event('keyup', {keyCode: utils.keyCodes.KEY_0}))
        })
      })

      it('should display updated hour value', function () {
        expect(timepicker.getSelectedTime().hour).to.eql(hour)
      })

      it('should display updated minute value', function () {
        expect(timepicker.getSelectedTime().minute).to.eql(minute)
      })

      it('should display updated second value', function () {
        expect(timepicker.getSelectedTime().second).to.eql(seconds)
      })
    })
  })
})
