const translate = (locale) => {
  try {
    const dictionary = require('../locales/' + locale)
  } catch(e) {
    console.log(e)
  }

  return (key) => dictionary[key] || key
}

module.exports = translate
