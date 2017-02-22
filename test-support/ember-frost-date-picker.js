/* global $ */

import {$hook} from 'ember-hook'

// Helpers taken from ember-pickaday

/**
 * Open the specified date picker and get an interactor for it
 * @param {String} hook - the hook for the date picker component
 * @returns {Object} an object than can selectDate
 */
export function openDatepicker (hook) {
  hook = hook || 'bunsenForm'

  const hookName = `${hook}-input`
  const $input = $hook(hookName)
  $input.click()

  return PikadayInteractor
}

const PikadayInteractor = {
  selectorForMonthSelect: '.pika-lendar:visible .pika-select-month',
  selectorForYearSelect: '.pika-lendar:visible .pika-select-year',
  selectDate: function (date) {
    var day = date.getDate()
    var month = date.getMonth()
    var year = date.getFullYear()
    var selectEvent = 'ontouchend' in document ? 'touchend' : 'mousedown'

    $(this.selectorForYearSelect).val(year)
    triggerNativeEvent($(this.selectorForYearSelect)[0], 'change')
    $(this.selectorForMonthSelect).val(month)
    triggerNativeEvent($(this.selectorForMonthSelect)[0], 'change')

    triggerNativeEvent($('td[data-day="' + day + '"] button:visible')[0], selectEvent)
  },
  selectedDay: function () {
    return $('.pika-single td.is-selected button').html()
  },
  selectedMonth: function () {
    return $(this.selectorForMonthSelect + ' option:selected').val()
  },
  selectedYear: function () {
    return $(this.selectorForYearSelect + ' option:selected').val()
  },
  minimumYear: function () {
    return $(this.selectorForYearSelect).children().first().val()
  },
  maximumYear: function () {
    return $(this.selectorForYearSelect).children().last().val()
  }
}

function triggerNativeEvent (element, eventName) {
  if (document.createEvent) {
    var event = document.createEvent('Events')
    event.initEvent(eventName, true, false)
    element.dispatchEvent(event)
  } else {
    element.fireEvent('on' + eventName)
  }
}
