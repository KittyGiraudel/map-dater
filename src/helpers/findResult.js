const chalk = require('chalk')
const outcomes = require('../data/outcomes')
const translate = require('./translate')
const t = translate('en')

const formatResult = (result) => '\n' + [
    chalk.green(t(result || 'i.error')),
    chalk.cyan(t('i.credits'))
  ].join('\n')

const findResult = (replies) => {
  const result = Object.keys(outcomes).find((outcome) => {
    const requirements = outcomes[outcome]

    return Object.keys(requirements).every((requirement) => {
      const actual = replies[requirement]
      const expected = requirements[requirement]
      return actual === expected
    })
  })

  return formatResult(result)
}

module.exports = findResult
