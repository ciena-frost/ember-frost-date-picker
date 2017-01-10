import Ember from 'ember'
const {$, run} = Ember
import {expect} from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {
  $hook,
  initialize as initializeHook
} from 'ember-hook'
import { beforeEach } from 'mocha'
import sinon from 'sinon'

const selectorForMonthSelect = '.pika-lendar:visible .pika-select-month option:selected'
const selectorForYearSelect = '.pika-lendar:visible .pika-select-year option:selected'

function selectedDay () {
  return $('.pika-single td.is-selected button').html()
}

function selectedMonth () {
  return $(selectorForMonthSelect).val()
}

function selectedYear () {
  return $(selectorForYearSelect).val()
}

describeComponent(
  'frost-date-picker',
  'Integration: EmberFrostDatePickerComponent',
  {
    integration: true
  },
  function () {
    beforeEach(function () {
      initializeHook()
    })

    it('opens on click', function (done) {
      this.render(hbs`
      {{frost-date-picker
        hook='my-picker'
      }}`)
      run.later(() => {
        $hook('my-picker-input').click()
        expect($('.pika-single.is-hidden'), 'Is visible').to.have.length(0)
        done()
      })
    })
    it('sends actions on open', function (done) {
      let onDrawCalled = sinon.spy()
      let onOpenCalled = sinon.spy()
      this.set('onDraw', onDrawCalled)
      this.set('onOpen', onOpenCalled)
      this.render(hbs`
      {{frost-date-picker
        hook='my-picker'
        onDraw=onDraw
        onOpen=onOpen
      }}`)
      run.later(() => {
        $hook('my-picker-input').click()
        run.later(() => {
          expect(onDrawCalled.callCount, 'onDraw called').to.equal(1)
          expect(onOpenCalled.callCount, 'onOpen called').to.equal(1)
          done()
        })
      })
    })

    it('sets the date when the value is set', function (done) {
      this.set('value', '2010-10-10')
      this.render(hbs`
        {{frost-date-picker
          hook='my-picker'
          value=value
        }}`)
      run.later(() => {
        $hook('my-picker-input').click()
        expect(selectedYear(), 'selected year').to.equal('2010')
        expect(selectedMonth(), 'selected month').to.equal('9')
        expect(selectedDay(), 'selected day').to.equal('10')
        done()
      })
    })

    it('closes on outside click', function (done) {
      let onCloseCalled = sinon.spy()
      this.set('onClose', onCloseCalled)
      this.render(hbs`
      {{frost-date-picker
        hook='my-picker'
        onClose=onClose
      }}`)
      run.later(() => {
        $hook('my-picker-input').click()
        run.later(() => {
          this.$().click()
          expect(onCloseCalled.callCount, 'onClose called').to.equal(1)
          expect($('.pika-single.is-hidden'), 'Is hidden').to.have.length(1)
          done()
        })
      })
    })
  }
)
