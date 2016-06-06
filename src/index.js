#!/usr/bin/env node

const inquirer = require('inquirer')
const spec = require('./helpers/spec')
const findResult = require('./helpers/findResult')

inquirer.prompt(spec)
  .then(findResult)
  .then(console.log)
  .catch(console.log)
