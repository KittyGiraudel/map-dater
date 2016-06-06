const specifications = require('../data/specifications')
const translate = require('./translate')
const t = translate('en')

// Check whether given requirements are being satisfied.
const isSatisfyingRequirements = (requirements, replies) =>
  Object.keys(requirements).some((question) => {
    return replies[question] === requirements[question]
  })

// Check whether the question is the root of the tree.
const isRoot = (requirements) => (Object.keys(requirements).length === 0)

// Build a proper array of choices objects for `inquirer`.
const getChoices = (choices) =>
  choices.map((choice) => ({
    value: choice,
    name: t(choice)
  }))

// Enhance the specifications to give everything needed to `inquirer`.
const properties = specifications.map((spec) => Object.assign({}, spec, {
  choices: getChoices(spec.choices),
  message: t(spec.name),
  type: 'list',
  when: (replies) => (
    isRoot(spec.requirements) ||
    isSatisfyingRequirements(spec.requirements, replies)
  )
}))

module.exports = properties
