# 8.0.1 (2017-11-10)
* **Updated** to latest version of `ember-pikaday-shim` which now includes `pikaday` and `ember-cli-moment-shim` in its dependencies.
* **Removed** no longer needed `pikaday`
* **Removed** no longer needed `ember-cli-moment-shim`
* **Updated** blueprints to no longer include dependencies being provided by `ember-pikaday-shim`
* **Updated** `index.js` to correctly bind context to call of this._super.included()

# 8.0.0 (2017-11-08)
* Use the latest `ember-frost-core`, with a flexible minor version (`^3.0.1`)


# 7.3.1 (2017-09-28)

* Passing `null` or `''` to `frost-date-picker` will now show as empty instead of invalid


# 7.3.0 (2017-09-13)
- The `value` property of `frost-date-picker` is again optional, so that
  it will work correctly with Bunsen forms which require _optional_ date
  fields.
- Added demo styling and headings to clarify examples
- Added code samples to widget demo
- Pinned more dependencies to fix the build

# 7.2.7 (2017-08-11)
* **Updated** move `coverage.js` config file to be in the correct location


# 7.2.6 (2017-08-09)
* **Updated** internal frost dependencies to match 2.12.3 versions
* **Updated** `ember-cli-htmlbars-inline-precompile` to pin to version 0.3.12 until ember-cli/ember-cli-htmlbars-inline-precompile#90 is resolved. (See issue: #488)

# 7.2.5 (2017-07-24)
* **Reverted** changes to gh-pages scripts because demo app was not updated on the gh-pages branch

# 7.2.4 (2017-07-24)
* **Updated** to pr-bumper version 2


# 7.2.3 (2017-07-11)
* **Updated** added code coverage validation


# 7.2.2 (2017-07-11)
Upgrade Ember-cli to 2.12.3


# 7.2.1 (2017-06-26)
* **Use** date prop type for date-time-picker

# 7.2.0 (2017-06-23)
* **Add** support for `minDate` in `date-time-picker`

# 7.1.0 (2017-06-22)
 * **Added** ability to format date and time strings


# 7.0.12 (2017-06-08)
* **Fixed** `pikaday` memory leak on `_onKeyChange`

# 7.0.11 (2017-05-10)
* **Updated** the secure tokens in `.travis.yml`

# 7.0.10 (2017-05-05)
* **Added** - new tests
* **Added** - hooks for the startTitle and endTitle of the range-picker component
* **Added** - functionality to enable test validation regression
* **Updated** - existing tests so that they are working again
* **Updated** - name of validateTime method (it had a copy/paste mistake)

# 7.0.9 (2017-04-27)
* for the bower directory search to work in an engine env, **added** code to climb the tree to find the real parent `app`


# 7.0.8 (2017-04-24)
* **Removed** unecessary dependencies blueprint

# 7.0.7 (2017-04-21)
* **Added** blueprint check

# 7.0.6 (2017-03-23)
* **Fixed** `ember` and `ember-cli` dependencies


# 7.0.5
* **Updated** the travis.yml and package.json to run code coverage

# 7.0.4
* **Updated** the travis scripts used for bumping and publishing

# 7.0.3
* **Updated** to use latest pr-bumper which supports being able to set a PR to `none` when publishing a new version is not desired.

<!-- Reviewable:start -->
---
This change is [<img src="https://reviewable.io/review_button.svg" height="34" align="absmiddle" alt="Reviewable"/>](https://reviewable.io/reviews/ciena-frost/ember-frost-date-picker/41)
<!-- Reviewable:end -->


# 7.0.2
**Added** clockpicker styles to override z-index on clockpicker-popover to 9999 (same as the date picker)
as the pulled in value (1010) is below that of ember-frost-modal (8000).


# 7.0.1
* **Updated** integration tests to remove the deprecated use of `describeComponent()`


# 7.0.0
* All interfaces changed to make a `value` and `onChange` required
* Validation is performed externally and can be bound back via `class=error`
* Refer to the `experiments` route in the demo for the usage (sorry - this will be cleaned up later)


# 6.0.0

* The `frost-date-picker` component now defaults to empty instead of the current date.


# 5.2.1

* **Fixed** blueprint to not crash.


# 5.2.0

* **Added** additional builds to CI to make sure addon works with latest versions of Ember.
* **Repalced** `moment` and `pikaday` bower deps with Ember shims/npm deps.
* **Removed** files from npm package that aren't necessary (all of the various config files).
* **Updated** dependencies to latest versions.


# 5.1.2
- Remove font-size: 40px

# 5.1.1
- Added default separator
- Cleaner validation for date-picker
- Fix date-picker test

# 5.1.0
Please add a description of your change here, it will be automatically prepended to the `CHANGELOG.md` file.


# 5.0.1
- [x] Accessibility
    - [x] bump and pin pikaday to ~1.5.1 (newly added kb features)
    - [x] https://github.com/srowhani/clockpicker-seconds/issues/1
- [x] Styling fixes to account for accessibility
- [x] Fix calendar icon positioning
- [x] Improve validation to account for kb inputs

Closes #19 #20

# 5.0.0
- `frost-date-time-picker`
- `frost-range-picker`
- `frost-time-picker`
-  validation (wip)
- scss changes

# TODO
- [x] testing
- [ ] coverage
- [x] lint fix
- [x] validation
- [x] datetime
- [x] rangepicker
- [x] timepicker
- [x] update demo

# 4.0.0
upgrade to frost-core 1.0.0



# 3.0.1
- Fix the demo


# 3.0.0
**updated** supported node version to 6



# 2.0.0
Upgraded ember to 2.8
Added linting and badges
Added integration tests
Updated README

# 1.0.2
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 1.0.1
- let to var

# 1.0.0
- Included Pikaday
- Events binded to ember run loop
- Ember CLI Deploy for ez gh-page pushes
- Styling similar to proposed UX spec
    - https://confluence.ciena.com/pages/viewpage.action?pageId=171217370

