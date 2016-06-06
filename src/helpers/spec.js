const specifications = require('../data/specifications')
const t = require('./translate')('en')

// Check whether given requirements are being satisfied.
const isSatisfyingRequirements = (requirements, replies) =>
  Object.keys(requirements).some((question) => {
    return replies[question] === requirements[question]
  })

// Check whether the question is the root of the tree.
const isRoot = (requirements) =>
  (Object.keys(requirements).length === 0)

// Build a proper array of choices objects for `inquirer`.
const getChoices = (choices) =>
  choices.map((choice) => ({
    value: choice,
    name: t(choice)
  }))

// Whether or not a question should be asked based on requirements and existing
// replies.
const shouldAsk = (requirements, replies) =>
  isRoot(requirements) || isSatisfyingRequirements(requirements, replies)

// Enhance an entry specification to provide everything needed to `inquirer`.
const completeSpecification = (spec) =>
  Object.assign({}, spec, {
    choices: getChoices(spec.choices),
    message: t(spec.name),
    type: 'list',
    when: (replies) => shouldAsk(spec.requirements, replies)
  })

module.exports = specifications.map(completeSpecification)
