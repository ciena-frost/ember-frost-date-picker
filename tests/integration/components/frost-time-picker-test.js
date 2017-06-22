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

import {openTimepicker} from 'dummy/tests/ember-frost-time-picker'

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

  describe('format is set', function () {
    beforeEach(function () {
      this.setProperties({
        myHook: 'myHook',
        timeValue: '01-23-45',
        onChange: function () {},
        timeFormat: 'hh-mm-ss'
      })

      this.render(hbs`
        {{frost-time-picker
          hook=myHook
          onChange=onChange
          value=timeValue
          format=timeFormat
        }}
      `)

      return wait()
    })

    it('time value format matches custom format', function () {
      expect($hook('myHook-input').val()).to.equal('01-23-45')
    })
  })

  describe('format is invalid', function () {
    beforeEach(function () {
      this.setProperties({
        myHook: 'myHook',
        timeValue,
        onChange: function () {},
        timeFormat: 'yyyyyy'
      })

      this.render(hbs`
        {{frost-time-picker
          hook=myHook
          onChange=onChange
          value=timeValue
          format=timeFormat
        }}
      `)

      return wait()
    })

    it('displays invalid string', function () {
      expect($hook('myHook-input').val()).to.equal('Invalid')
    })
  })

  describe('value does not match set format', function () {
    beforeEach(function () {
      this.setProperties({
        myHook: 'myHook',
        timeValue: '1995-02-27',
        onChange: function () {},
        timeFormat: 'HH:mm:ss'
      })

      this.render(hbs`
        {{frost-time-picker
          hook=myHook
          onChange=onChange
          value=timeValue
          format=timeFormat
        }}
      `)

      return wait()
    })

    it('displays invalid string', function () {
      expect($hook('myHook-input').val()).to.equal('Invalid')
    })
  })

  describe('format string is empty', function () {
    beforeEach(function () {
      this.setProperties({
        myHook: 'myHook',
        timeValue,
        onChange: function () {},
        timeFormat: ''
      })

      this.render(hbs`
        {{frost-time-picker
          hook=myHook
          onChange=onChange
          value=timeValue
          format=timeFormat
        }}
      `)

      return wait()
    })

    it('displays invalid string', function () {
      expect($hook('myHook-input').val()).to.equal('Invalid')
    })
  })

  describe('open clockpicker', function () {
    let selectedTime
    beforeEach(function () {
      this.setProperties({
        myHook: 'myHook',
        timeValue: '01:23:45',
        onChange: (val) => {
          this.setProperties({
            timeValue: val
          })
        }
      })

      this.render(hbs`
        {{frost-time-picker
          hook=myHook
          onChange=onChange
          value=timeValue
          format='HH-mm-ss'
        }}
      `)

      return wait().then(() => {
        const interactor = openTimepicker('myHook')
        selectedTime = interactor.getSelectedTime()
        this.$().click() // click outside to close clock picker
      })
    })

    it('clockpicker opens to last selected time', function () {
      expect(selectedTime.hour).to.equal('01')
      expect(selectedTime.minute).to.equal('23')
      expect(selectedTime.second).to.equal('45')
    })
  })

  describe('select new time', function () {
    let changeStub
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
          onChange=onChange
          value=timeValue
          format=timeFormat
        }}
      `)

      return wait().then(() => {
        /*
         * TODO replace with commented out selection code once fixed
         */
        $hook('myHook-input').val('05:10:15')
        openTimepicker('myHook')
        this.$().click() // click outside to close clock picker

        // const interactor = openTimepicker('myHook')
        // interactor.selectTime('12', '05', '10')
        // this.$().click() // click outside to close clock picker
      })
    })

    it('onChange method called with formatted time string', function () {
      expect(changeStub).to.have.been.calledWith('05-10-15')
    })
  })

  describe.skip('select new time and update value', function () {
    beforeEach(function () {
      this.setProperties({
        myHook: 'myHook',
        timeValue,
        timeFormat: 'HH-mm-ss',
        onChange: (val) => {
          this.setProperties({
            timeValue: val
          })
        }
      })

      this.render(hbs`
        {{frost-time-picker
          hook=myHook
          onChange=onChange
          value=timeValue
          format=timeFormat
        }}
      `)

      return wait().then(() => {
        /*
         * TODO get popup selection working
         */
        const interactor = openTimepicker('myHook')
        interactor.selectTime(5, 10, 15)
        this.$().click() // click outside to close clock picker
      })
    })

    it('input text is updated', function () {
      expect($hook('myHook-input').val()).to.equal('05-10-15')
    })
  })
})
