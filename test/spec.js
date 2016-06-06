const assert = require('assert')
const outcomes = require('../src/data/outcomes')
const spec = require('../src/helpers/spec')

const isObject = (value) => (typeof value === 'object' && value !== null)
const hasListType = (o) => (o.type === 'list')
const hasWhenFunction = (o) => (typeof o.when === 'function')
const hasValidMessage = (o) => (typeof o.message === 'string')

describe('The spec builder', () => {
  it('should return an array of objects', () => {
    assert.ok(spec.every(isObject))
  })

  it('should return objects with a `type` key set to `list`', () => {
    assert.ok(spec.every(hasListType))
  })

  it('should return objects with a function as `when`', () => {
    assert.ok(spec.every(hasWhenFunction))
  })

  it('should return objects with a `message` key', () => {
    assert.ok(spec.every(hasValidMessage))
  })
})
