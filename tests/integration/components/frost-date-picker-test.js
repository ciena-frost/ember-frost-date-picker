import {expect} from 'chai'
import Ember from 'ember'
const {$} = Ember
import {Format} from 'ember-frost-date-picker'
import {$hook, initialize as initializeHook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import moment from 'moment'
import sinon from 'sinon'

import {openDatepicker} from 'dummy/tests/ember-frost-date-picker'

/**
 * Click outside the date picker to close it
 * @param {Object} context - the test context
 */
function closePikaday (context) {
  context.$().click()
}

const test = integration('frost-date-picker')
describe(test.label, function () {
  test.setup()

  const dateValue = moment().subtract(1, 'day').format(Format.date)
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
        dateValue,
        myHook: 'myHook',
        onChange: function () {}
      })

      this.render(hbs`
        {{frost-date-picker
          hook=myHook
          onChange=onChange
          value=dateValue
        }}
      `)

      return wait()
    })

    it('should have an element', function () {
      expect(this.$()).to.have.length(1)
    })

    it('should be accessible via the hook', function () {
      expect($hook('myHook')).to.have.length(1)
    })

    it('should have the icon displayed', function () {
      expect($hook('myHook-calendar')).to.have.length(1)
    })

    it('should set the date', function () {
      expect($hook('myHook-input')).to.have.value(dateValue)
    })
  })

  describe('when no value is provided', function () {
    // Note: UX requires us to be able to show a date input which has no date selected.
    // Auto-defaulting undefined date values to the current date will break any form that
    // wants to have an optional date field.
    beforeEach(function () {
      this.setProperties({
        myHook: 'myHook',
        onChange: function () {}
      })

      this.render(hbs`
        {{frost-date-picker
          hook=myHook
          onChange=onChange
        }}
      `)

      return wait()
    })

    it('should show a blank value', function () {
      expect($hook('myHook-input')).to.have.value('')
    })
  })

  describe('when empty string is provided', function () {
    beforeEach(function () {
      this.setProperties({
        dateValue: '',
        myHook: 'myHook',
        onChange: function () {}
      })

      this.render(hbs`
        {{frost-date-picker
          hook=myHook
          onChange=onChange
          value=dateValue
        }}
      `)

      return wait()
    })

    it('should show a blank value', function () {
      expect($hook('myHook-input')).to.have.value('')
    })
  })

  describe('when null is provided', function () {
    beforeEach(function () {
      this.setProperties({
        dateValue: null,
        myHook: 'myHook',
        onChange: function () {}
      })

      this.render(hbs`
        {{frost-date-picker
          hook=myHook
          onChange=onChange
          value=dateValue
        }}
      `)

      return wait()
    })

    it('should show a blank value', function () {
      expect($hook('myHook-input')).to.have.value('')
    })
  })

  describe('when clicking inside the <input>', function () {
    beforeEach(function () {
      this.setProperties({
        dateValue,
        myHook: 'myHook',
        onChange: function () {}
      })

      this.render(hbs`
        {{frost-date-picker
          hook=myHook
          onChange=onChange
          value=dateValue
        }}
      `)

      return wait().then(() => {
        $hook('myHook-input').click()
      })
    })

    it('should open the datepicker', function () {
      expect($('.pika-single.is-hidden')).to.have.length(0)
    })
  })

  describe('when datepicker is opened', function () {
    let onDrawCalled
    let onOpenCalled

    beforeEach(function () {
      onDrawCalled = sandbox.spy()
      onOpenCalled = sandbox.spy()
      this.setProperties({
        dateValue,
        myHook: 'myHook',
        onChange: function () {},
        onDraw: onDrawCalled,
        onOpen: onOpenCalled
      })

      this.render(hbs`
        {{frost-date-picker
          hook=myHook
          onChange=onChange
          onDraw=onDraw
          onOpen=onOpen
          value=dateValue
        }}
      `)

      return wait().then(() => {
        $hook('myHook-input').click()
      })
    })

    it('should call onDraw datepicker method', function () {
      expect(onDrawCalled).to.have.callCount(1)
    })

    it('should call onOpen datepicker method', function () {
      expect(onOpenCalled).to.have.callCount(1)
    })
  })

  describe('when pikaday format setting is provided', function () {
    const dateFormat = 'YYYY-MM-DD-[test]'
    const testValue = '2017-01-24'

    beforeEach(function () {
      this.setProperties({
        dateFormat,
        testValue,
        myHook: 'myHook',
        onChange: function () {}
      })

      this.render(hbs`
        {{frost-date-picker
          format=dateFormat
          hook=myHook
          onChange=onChange
          value=testValue
        }}
      `)

      return wait()
    })

    it('should format the date correctly', function () {
      expect($hook('myHook-input')).to.have.value(moment('2017-01-24').format(dateFormat))
    })
  })

  describe('when an outside click event occurs', function () {
    let onCloseCalled

    beforeEach(function () {
      onCloseCalled = sandbox.spy()
      this.setProperties({
        dateValue,
        myHook: 'myHook',
        onChange: function () {},
        onClose: onCloseCalled
      })

      this.render(hbs`
        {{frost-date-picker
          hook=myHook
          onChange=onChange
          onClose=onClose
          value=dateValue
        }}
      `)

      return wait().then(() => {
        $hook('myHook-input').click()
      }).then(() => {
        this.$().click()
      })
    })

    it('should call the onClose datepicker method', function () {
      expect(onCloseCalled).to.have.callCount(1)
    })

    it('should close the datepicker', function () {
      expect($('.pika-single.is-hidden')).to.have.length(1)
    })
  })

  describe('pikaday onSelect method', function () {
    let changeStub

    beforeEach(function () {
      changeStub = sandbox.stub()
      this.setProperties({
        dateValue: '2017-06-19',
        myHook: 'myHook',
        onChange: changeStub
      })

      this.render(hbs`
        {{frost-date-picker
          hook=myHook
          onChange=onChange
          value=dateValue
        }}
      `)

      return wait().then(() => {
        const interactor = openDatepicker('myHook')
        interactor.selectDate(new Date(2017, 5, 24))
        closePikaday(this)
      })
    })

    it('should call onChange with the updated value', function () {
      expect(changeStub).to.have.been.calledWith('2017-06-24')
    })

    it('input text should be changed', function () {
      expect($hook('myHook-input')).to.have.value('2017-06-24')
    })
  })

  describe('uses specified format', function () {
    let changeStub

    beforeEach(function () {
      changeStub = function (val) {
        this.setProperties({
          dateValue: val
        })
      }
      this.setProperties({
        dateValue: '1995/02/27',
        myHook: 'myHook',
        dateFormat: 'YYYY/MM/DD',
        onChange: changeStub
      })

      this.render(hbs`
        {{frost-date-picker
          hook=myHook
          onChange=onChange
          value=dateValue
          format=dateFormat
        }}
      `)

      return wait()
    })

    it('should display the formatted value', function () {
      expect($hook('myHook-input')).to.have.value('1995/02/27')
    })
  })

  describe('value does not match specified format', function () {
    beforeEach(function () {
      this.setProperties({
        dateValue,
        myHook: 'myHook',
        dateFormat: 'abcdefgh',
        onChange: function () {}
      })

      this.render(hbs`
        {{frost-date-picker
          hook=myHook
          onChange=onChange
          value=dateValue
          format=dateFormat
        }}
      `)

      return wait()
    })

    it('should display the invalid value', function () {
      expect($hook('myHook-input')).to.have.value('Invalid')
    })
  })

  describe('updates using specified format', function () {
    beforeEach(function () {
      let changeStub = (val) => {
        this.setProperties({
          dateValue: val
        })
      }
      this.setProperties({
        dateValue: '2017/01/01',
        myHook: 'myHook',
        dateFormat: 'YYYY/MM/DD',
        onChange: changeStub
      })

      this.render(hbs`
        {{frost-date-picker
          hook=myHook
          onChange=onChange
          value=dateValue
          format=dateFormat
        }}
      `)

      return wait().then(() => {
        const interactor = openDatepicker('myHook')
        interactor.selectDate(new Date(2017, 0, 24))
        closePikaday(this)
      })
    })

    it('should display the updated, formatted value', function () {
      expect($hook('myHook-input')).to.have.value('2017/01/24')
    })
  })
})
