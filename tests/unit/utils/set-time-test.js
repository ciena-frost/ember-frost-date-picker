import {expect} from 'chai'
import setTime from 'ember-frost-date-picker/utils/set-time'
import {describe, it} from 'mocha'
import moment from 'moment'

describe('Unit / Utility / setTime', function () {
  it('should set the time on the moment object', function () {
    const time = '12:12:12'
    let result = setTime(moment(), time).toString().split(' ')

    /**
     * result will be the array:
     *
     * [
     *   0: Day of Week
     *   1: Month
     *   2: Day
     *   3: Year
     *   4: Time
     *   5: Time zone
     * ]
     */

    expect(result[4]).to.equal(time)
  })
})
