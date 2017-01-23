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

import wait from 'ember-test-helpers/wait'

import {afterEach, beforeEach, describe} from 'mocha'
import sinon from 'sinon'

const {
  moment
} = window

describeComponent(
  'frost-date-picker',
  'Integration: EmberFrostDatePickerComponent',
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

    describe('behaviour', function () {
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
        const mValue = '2010-10-10'
        this.set('mValue', mValue)
        this.render(hbs`
          {{frost-date-picker
            hook='my-picker'
            currentValue=mValue
          }}`)
        run.later(() => {
          const value = $hook('my-picker-input').val()
          expect(value, 'currentValue').to.equal(mValue)
          done()
        })
      })

      it('fetches now when no date provided', function (done) {
        const fmt = 'YYYY-MM-DD'
        this.set('fmt', fmt)
        this.render(hbs`
          {{frost-date-picker
            hook='my-picker'
            currentValue=mValue
            format=format
          }}`)
        run.later(() => {
          const mValue = this.get('mValue')
          expect(mValue, 'currentValue').to.equal(moment().format(fmt))
          done()
        })
      })
      it('applies provided format', function (done) {
        const fmt = 'YYYY-MM-DD-[test]'
        this.set('fmt', fmt)
        this.render(hbs`
          {{frost-date-picker
            hook='my-picker'
            currentValue=mValue
            format=fmt
          }}`)
        run.later(() => {
          const mValue = this.get('mValue')
          expect(mValue, 'currentValue').to.equal(moment().format(fmt))
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
  }
)
