const assert = require('assert')
const specifications = require('../src/data/specifications')
const utils = require('./utils')

const hasValidName = (specification) =>
  utils.hasValidQuestionName(specification.name)

const hasValidChoices = (specification) =>
  utils.isArray(specification.choices)
  && specification.choices.every(utils.hasValidChoiceName)

const hasValidRequirements = (specification) =>
  utils.isObject(specification.requirements)

describe('Specifications', () => {
  it('should all be objects', () => {
    assert.ok(specifications.every(utils.isObject))
  })

  it('should all have a `name` key starting with `q.`', () => {
    assert.ok(specifications.every(hasValidName))
  })

  it('should all have a `choices` key containing an array of choices starting with `a.`', () => {
    assert.ok(specifications.every(hasValidChoices))
  })

  it('should all have a `requirements` key containing an object', () => {
    assert.ok(specifications.every(hasValidRequirements))
  })
})
