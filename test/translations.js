const assert = require('assert')
const specifications = require('../src/data/specifications')
const outcomes = require('../src/data/outcomes')
const t = require('../src/helpers/translate')('en')

const hasTranslation = (value) =>
  value !== t(value)

describe('Translations', () => {
  it('should exist for outcomes', () => {
    const allOutcomesTranslated = Object.keys(outcomes).every(hasTranslation)

    assert.ok(allOutcomesTranslated)
  })

  it('should exist for questions', () => {
    const allQuestionsTranslated = specifications.every((specification) =>
      hasTranslation(specification.name))

    assert.ok(allQuestionsTranslated)
  })

  it('should exist for choices', () => {
    const allChoicesTranslated = specifications.every((specification) =>
      specification.choices.every(hasTranslation))

    assert.ok(allChoicesTranslated)
  })
})
