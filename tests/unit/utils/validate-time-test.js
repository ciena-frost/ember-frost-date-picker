import {expect} from 'chai'
import validateTime from 'ember-frost-date-picker/utils/validate-time'
import {describe, it} from 'mocha'

describe('Unit / Utility / validateTime', function () {
  describe('when hour is a valid format', function () {
    it('should accept 12 hr format without leading number "0"', function () {
      expect(validateTime('1:10:10')).to.equal(true)
    })

    it('should accept 12 hr format when leading number is "0"', function () {
      expect(validateTime('01:10:10')).to.equal(true)
    })

    it('should accept 12 hr format when leading number is "1"', function () {
      expect(validateTime('11:10:10')).to.equal(true)
    })

    it('should accept 12 hr format when leading number is "2"', function () {
      expect(validateTime('12:10:10')).to.equal(true)
    })

    it('should accept 24 hr format', function () {
      expect(validateTime('23:10:10')).to.equal(true)
    })
  })

  describe('when minutes are a valid format', function () {
    it('should accept format with "00"', function () {
      expect(validateTime('1:00:10')).to.equal(true)
    })

    it('should accept format with "59"', function () {
      expect(validateTime('1:59:10')).to.equal(true)
    })
  })

  describe('when seconds are a valid format', function () {
    it('should accept format with "00"', function () {
      expect(validateTime('1:10:00')).to.equal(true)
    })

    it('should accept format with "59"', function () {
      expect(validateTime('1:10:59')).to.equal(true)
    })
  })

  describe('when 24 hour format is not a valid', function () {
    it('should not accept 24 hr format with leading number "3"', function () {
      expect(validateTime('31:10:10')).to.equal(false)
    })

    it('should not accept 24 hr format with trailing number "4"', function () {
      expect(validateTime('24:10:10')).to.equal(false)
    })
  })

  describe('when minutes are not a valid format', function () {
    it('should not accept format with leading number "6"', function () {
      expect(validateTime('1:60:10')).to.equal(false)
    })
  })

  describe('when seconds are not a valid format', function () {
    it('should not accept format with leading number "6"', function () {
      expect(validateTime('1:10:60')).to.equal(false)
    })
  })
})
