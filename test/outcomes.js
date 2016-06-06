const assert = require('assert')
const specifications = require('../src/data/specifications')
const outcomes = require('../src/data/outcomes')

const getEntryName = (entry) =>
  Object.keys(entry)[0]

const findSpec = (entry) =>
  specifications.find((specification) => specification.name === getEntryName(entry))

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
})
