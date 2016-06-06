const isArray = (value) =>
  Array.isArray(value)

const isFunction = (value) =>
  typeof value === 'function'

const isString = (value) =>
  typeof value === 'string'

const isObject = (value) =>
  (typeof value === 'object' && value !== null)

const isObjectContained = (a, b) => Object
  .keys(b)
  .every((key) => a[key] === b[key])

const hasRequirements = (object) =>
  Object.keys(object.requirements).length !== 0

const hasValidOutcomeName = (value) =>
  isString(value) && value.slice(0, 2) === 'o.'

const hasValidQuestionName = (value) =>
  isString(value) && value.slice(0, 2) === 'q.'

const hasValidChoiceName = (value) =>
  isString(value) && value.slice(0, 2) === 'a.'

const getFirstKey = (object) =>
  Object.keys(object)[0]

module.exports = {
  isArray,
  isFunction,
  isString,
  isObject,
  isObjectContained,
  hasRequirements,
  hasValidOutcomeName,
  hasValidQuestionName,
  hasValidChoiceName,
  getFirstKey
}
