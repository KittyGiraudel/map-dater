const chalk = require('chalk')
const outcomes = require('../data/outcomes')
const t = require('./translate')('en')

const formatResult = (result) => '\n' + [
    chalk.green(t(result || 'i.error')),
    chalk.cyan(t('i.credits'))
  ].join('\n')

const findResult = (replies) => {
  const result = Object.keys(outcomes).filter((outcome) => {
    const path = outcomes[outcome]
    const endPath = path[path.length - 1]

    return Object.keys(endPath).every((requirement) => {
      const actual = replies[requirement]
      const expected = endPath[requirement]
      return actual === expected
    })
  })

  return formatResult(result)
}

module.exports = findResult
