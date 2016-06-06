const outcomes = require('../data/outcomes')
const translate = require('./translate')
const t = translate('en')

const findResult = (replies) => {
  const answer = Object.keys(outcomes).find((outcome) => {
    const requirements = outcomes[outcome]

    return Object.keys(requirements).every((requirement) => {
      const actual = replies[requirement]
      const expected = requirements[requirement]
      return actual === expected
    })
  })

  return t(answer || 'i.error')
}

module.exports = findResult
