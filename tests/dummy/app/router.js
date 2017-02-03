import Ember from 'ember'
const {Router: EmberRouter} = Ember

import config from './config/environment'

var Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

Router.map(function () {
  // this.nav('application', {
  //   path: '/'
  // }, function () {
  //   this.category('Components', function () {
  //     this.column('Available Components', function () {
  //       this.app('Base Usage', {
  //         route: 'base'
  //       })
  //       this.app('DateTime Component', {
  //         route: 'date-time'
  //       })
  //       this.app('RangePicker Component', {
  //         route: 'range-picker'
  //       })
  //     })
  //   })
  // })
  // this.route('base')
  // this.route('date-time')
  // this.route('range-picker')
  this.route('experiments', {path: '/'})
})

export default Router
