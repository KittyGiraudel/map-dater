const assert = require('assert')
const specifications = require('../src/data/specifications')
const outcomes = require('../src/data/outcomes')
const outcomesSpec = require('./outcomes-spec')

const isContained = (a, b) => Object
  .keys(b)
  .every((key) => a[key] === b[key])

const getEntryName = (entry) =>
  Object.keys(entry)[0]

const findSpec = (entry) =>
  specifications.find((specification) => specification.name === getEntryName(entry))

const isRoot = (spec) =>
  Object.keys(spec.requirements).length === 0

const isRequirementFulfilled = (requirement, previousSpec) => (
  isRoot(previousSpec)
  || isContained(previousSpec.requirements, requirement)
)

const stringifyPath = (path) => path.map(JSON.stringify).join(' > ')

const testPath = (path, expect) => {
  if (typeof outcomes[expect] === 'undefined') {
    throw new Error(expect + ' cannot be an outcome.')
  }

  var previousSpec = findSpec(outcomes[expect])
  const actualPath = path.reverse().slice(1)

  actualPath.forEach((requirement) => {
    const isFulfilled = isRequirementFulfilled(requirement, previousSpec)

    if (!isFulfilled) throw new Error(
      'Cannot come to '
      + JSON.stringify(previousSpec.requirements)
      + ' from '
      + JSON.stringify(requirement)
    )

    previousSpec = findSpec(requirement)
  })
}

describe('Outcome', () => {
  it('should have a key starting with `o.`', () => {
    assert.ok(Object.keys(outcomes).every((outcome) => {
      return typeof outcome === 'string'
        && outcome.slice(0, 2) === 'o.'
    }))
  })

  Object.keys(outcomes).forEach((outcome) => {
    it('Outcome `' + outcome + '` should be reachable', () => {
      var question = findSpec(outcomes[outcome])

      while (Object.keys(question.requirements).length > 0) {
        question = findSpec(question.requirements)
      }

      assert.equal(Object.keys(question.requirements).length, 0)
    })
  })

  Object.keys(outcomesSpec).forEach((spec) => {
    it('should return `' + spec + '` for path: ' + stringifyPath(outcomesSpec[spec]), () => {
      assert.doesNotThrow(() => testPath(outcomesSpec[spec], spec))
    })
  })
})
