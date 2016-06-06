const assert = require('assert')
const specifications = require('../src/data/specifications')
const outcomes = require('../src/data/outcomes')
const utils = require('./utils')

// Find matching spec with `name` key matching first key of `object`.
const findSpec = (object) =>
  specifications.find((specification) =>
    specification.name === utils.getFirstKey(object))

// Check whether a requirement is fulfilled based on the previous specification.
const isRequirementFulfilled = (requirement, previousSpec) => (
  !utils.hasRequirements(previousSpec)
  || utils.isObjectContained(previousSpec.requirements, requirement)
)

// Test whether it’s possible to reach `expect` with `path`.
const testPath = (path, expect) => {
  if (typeof outcomes[expect] === 'undefined') {
    return false
  }

  var spec = findSpec(outcomes[expect].pop())

  return path.reverse().every((requirement) => {
    const previousSpec = spec
    spec = findSpec(requirement)
    return isRequirementFulfilled(requirement, previousSpec)
  })
}

// Check whether an outcome is reachable at all, that is has a connection up to
// the root entry.
const isOutcomeReachable = (outcome) => {
  const path = outcomes[outcome]
  const endPath = path[path.length - 1]
  var spec = findSpec(endPath)

  while (utils.hasRequirements(spec)) {
    spec = findSpec(spec.requirements)
  }

  return true
}

describe('Outcome', () => {
  it('should have a key starting with `o.`', () => {
    assert.ok(Object.keys(outcomes).every(utils.hasValidOutcomeName))
  })

  Object.keys(outcomes).forEach((outcome) => {
    it('`' + outcome + '` should be reachable', () => {
      assert.ok(isOutcomeReachable(outcome))
    })
  })

  Object.keys(outcomes).forEach((outcome) => {
    it('should return `' + outcome + '` for its path', () => {
      assert.ok(testPath(outcomes[outcome], outcome))
    })
  })
})
