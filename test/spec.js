const assert = require('assert')
const outcomes = require('../src/data/outcomes')
const spec = require('../src/helpers/spec')
const utils = require('./utils')

const hasListType = (o) => (o.type === 'list')
const hasWhenFunction = (o) => utils.isFunction(o.when)
const hasValidMessage = (o) => utils.isString(o.message)

describe('The spec builder', () => {
  it('should return an array of objects', () => {
    assert.ok(spec.every(utils.isObject))
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
