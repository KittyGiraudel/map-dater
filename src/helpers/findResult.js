const outcomes = require('../data/outcomes')
const translate = require('./translate')
const t = translate('en')

const getPossibleOutcomes = () => Object.keys(outcomes)
const getOutcomeRequirements = (outcome) => Object.keys(outcomes[outcome])

const findResult = (replies) => {
  const answer = getPossibleOutcomes().filter((outcome) => {
    const requirements = outcomes[outcome]

    return Object.keys(requirements).every((requirement) => {
      const actual = replies[requirement]
      const expected = requirements[requirement]
      return actual === expected
    })
  })

  if (answer.length === 0) {
    return t('i.error')
  }

  return t(answer[0])
}

module.exports = findResult
