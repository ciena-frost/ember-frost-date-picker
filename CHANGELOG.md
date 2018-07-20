# 11.1.1 (2018-07-20)

* **Fixed** Travis API key.


# 11.1.0 (2018-06-13)

* Support manual time entry in input field
  * Debounce interval for entry is configurable property
* Bugfix: now close clock picker UI when ESC key is pressed

# 11.0.1 (2018-05-30)
* **Updated** Pin `ember-cli-notifications` to version `4.2.1` to fix broken demo app

# 11.0.0 (2018-04-16)

* Updated `ember-frost-core` to version `^8.0.0`
* Updated `ember-frost-navigation` to version `^10.0.0`

# 10.0.0 (2018-03-21)
* **Updated** pull request template
* **Added** issue template
* **Updated** to `pr-bumper` version `3`
* **Updated** to node 8
* **Added** slack integration
* **Updated** `ember-frost-test` to `^4.0.1`
* **Updated** `ember-test-utils` to `^8.1.1`
* **Updated** `ember-cli-frost-blueprints` to `^5.0.2`
* **Updated** `ember-frost-navigation` to `^9.0.0`
* **Updated** `pr-bumper` to `^3.7.0`
* **Updated** `ember-prop-types` to `^7.0.1`
* **Updated** `ember-frost-core` to `^7.0.0`
* **Updated** `ember-pikaday-shim` to `^1.0.1`
* **Removed** ignoring of `package-lock.json` file
* **Added** `package-lock.json` file
* **Updated** Travis CI scripts to allow non-exact node version
* **Updated** test helpers to now be provided from addon-test-support. For example, test helpers previously available at dummy/tests/helpers/ember-frost-date-picker/<ember-frost-date-picker> are now available via ember-frost-date-picker/test-support/<frost-date-picker>
* **Updated** add information to README.md about test helpers

# 9.0.1 (2018-01-23)
* **Updated** to provide the clockpicker-seconds css via the index.js hook (was getting a missing file path error in consumer of this add-on's builds when the import of the css was inside the add-on.scss file)

# 9.0.0 (2018-01-10)
* **Added** `ember-frost-test` @ `^4.0.0`
* **Updated** `ember-cli-chai` to `0.4.3`
* **Updated** `ember-cli-mocha` to `0.14.4`
* **Added** `ember-hook` @ `1.4.2`
* **Added** `ember-sinon` @ `^0.7.0`
* **Updated** `ember-test-utils` to `^8.1.0`
* **Added** `sinon-chai` @ `^2.14.0`
* **Updated** `ember-cli-frost-blueprints` to `^5.0.1`
* **Added** ignoring of `package-lock` until we are ready to move to node 8
* **Removed** useLintTree ember-cli-mocha configuration from `ember-cli-build.js`
* **Added** ignoring of linting `CHANGELOG.md`
* **Removed** `.remarkrc` file since it is now provided by `ember-test-utils`
* **Added** `broccoli-funnel` to `^2.0.1`
* **Added** `broccoli-merge-trees` to `^2.0.0`
* **Added** `ember-browserify` @ `^1.2.0`
* **Updated** pin `ember-code-snippet` to `1.7.0`
* **Updated** `ember-frost-navigation` to `^8.0.0`
* **Removed** `clockpicker-seconds` bower dependency and migrated to npm package.
* **Added** `clockpicker-seconds` npm package and updated `index.js` to provide with add-on.
* **Updated** `ember-cli-sass` to `7.1.1`
* **Updated** `ember-computed-decorators` to be a dependency instead of a devDependency
* **Updated** `ember-frost-core` to `^5.0.0`
* **Updated** `ember-hook` to `1.4.2` and moved to a dependency instead of a devDependency
* **Updated** `ember-pikaday-shim` to `1.0.0`
* **Updated** `ember-prop-types` to `^6.0.0` and moved to a dependency instead of a devDependency
* **Updated** `ember-truth-helpers` to `^1.3.0` and moved to a dependency instead of a devDependency
* **Removed** unused `ember-concurrency` package
* **Removed** unused `ember-elsewhere` package
* **Removed** unused `estraverse-fb` package
* **Removed** unused `liquid-fire` package
* **Removed** blueprint files since packages are now provided via dependencies



# 8.0.2 (2017-12-12)
* **Updated** version of `ember-pikaday-shim` to `0.1.4`
* **Added** bower since it is no longer included by Ember CLI


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

