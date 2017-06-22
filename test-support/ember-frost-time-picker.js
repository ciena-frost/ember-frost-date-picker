/* global $ */

import {$hook} from 'ember-hook'

/*
 * NOTE the interactor will only work when passed in seconds
 * and minutes that are multiples of 5
 */

/**
 * Open the specified time picker and get an interactor for it
 * @param {String} hook - the hook for the time picker component
 * @returns {Object} an object than can selectTime
 */
export function openTimepicker (hook) {
  hook = hook || 'bunsenForm'

  const hookName = `${hook}-input`
  const $input = $hook(hookName)
  $input.click()

  return ClockpickerInteractor
}

const ClockpickerInteractor = {
  getSelectedTime: function () {
    return {
      hour: $('.clockpicker-popover:visible .clockpicker-span-hours').text(),
      minute: $('.clockpicker-popover:visible .clockpicker-span-minutes').text(),
      second: $('.clockpicker-popover:visible .clockpicker-span-seconds').text()
    }
  },

  selectTime: function (hour, minute, second) {
    let selectorForHour = `.clockpicker-popover:visible .clockpicker-hours .clockpicker-tick:contains("${hour}")`
    let selectorForMinute = `.clockpicker-popover:visible .clockpicker-minutes .clockpicker-tick:contains("${minute}")`
    let selectorForSecond = `.clockpicker-popover:visible .clockpicker-seconds .clockpicker-tick:contains("${second}")`

    this.simulateClick($(selectorForHour)[0])
    this.simulateClick($(selectorForMinute)[0])
    this.simulateClick($(selectorForSecond)[0])
  },

  /*
   * TODO not working currently. Does not work when the datepicker is not in view
   * (need to scroll to see it). Pulled inspiration from:
   * https://stackoverflow.com/questions/26126663/jquery-click-on-a-div-button-wont-fire
   */
  simulateClick: function (element) {
    let rect = element.getBoundingClientRect()

    // Absolute position
    const top = rect.top
    const left = rect.left

    // Coordinates of center of element
    const yMiddle = top + (rect.height / 2)
    const xMiddle = left + (rect.width / 2)

    // Event options
    const options = {bubbles: false, clientX: xMiddle, clientY: yMiddle}

    /* eslint-disable */
    element.dispatchEvent(new MouseEvent('mouseover', options))
    element.dispatchEvent(new MouseEvent('mousedown', options))
    element.dispatchEvent(new MouseEvent('mouseup', options))
    element.dispatchEvent(new MouseEvent('click', options))
    /* eslint-enable */
    setTimeout(function () { }, 150)
  }
}
