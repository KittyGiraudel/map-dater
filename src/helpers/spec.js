const prompt = require('prompt')
const specifications = require('../data/spec')
const translate = require('./translate')
const t = translate('en')

// Check whether given requirements are being satisfied.
const isSatisfyingRequirements = (requirements, replies) =>
  Object.keys(requirements).some((question) => {
    return replies[question] === requirements[question]
  })

// Check whether the question is the root of the tree.
const isRoot = (requirements) =>
  Object.keys(requirements).length === 0

// Build a proper array of answer objects for `inquirer`.
const getChoices = (answers) =>
  answers.map((answer) => ({
    value: answer,
    name: t(answer)
  }))

// Enhance the specifications to give everything needed to `inquirer`.
const properties = specifications.map((spec) => Object.assign(spec, {
  choices: getChoices(spec.answers),
  message: t(spec.name),
  type: 'list',
  when: (replies) => (
    isRoot(spec.requirements) ||
    isSatisfyingRequirements(spec.requirements, replies)
  )
}))

module.exports = properties
