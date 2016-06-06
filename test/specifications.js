const assert = require('assert')
const specifications = require('../src/data/specifications')

const isObject = (value) => (typeof value === 'object' && value !== null)

const hasValidName = (specification) => (
  typeof specification.name === 'string'
  && specification.name.slice(0, 2) === 'q.')

const hasValidChoices = (specification) => (
  Array.isArray(specification.choices)
    && specification.choices.every((choice) => (
      typeof choice === 'string' && choice.slice(0, 2) === 'a.'
    )))

const hasValidRequirements = (specification) => isObject(specification.requirements)

describe('Specifications', () => {
  it('should all be objects', () => {
    assert.ok(specifications.every(isObject))
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
