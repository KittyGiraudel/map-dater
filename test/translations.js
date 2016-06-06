const assert = require('assert')
const specifications = require('../src/data/specifications')
const outcomes = require('../src/data/outcomes')
const translate = require('../src/helpers/translate')
const t = translate('en')

describe('Translation', () => {
  Object.keys(outcomes).forEach((outcome) => {
    it('should exist for `' + outcome + '`', () => {
      assert.notEqual(outcome, t(outcome))
    })
  })

  specifications.forEach((specification) => {
    it('should exist for `' + specification.name + '`', () => {
      assert.notEqual(specification.name, t(specification.name))
    })
  })

  specifications.forEach((specification) => {
    specification.choices.forEach((choice) => {
      it('should exist for `' + choice + '`', () => {
        assert.notEqual(choice, t(choice))
      })
    })
  })
})
