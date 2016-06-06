const getLocalePath = (locale) => (process.cwd() + '/src/locales/' + locale)

const translate = (locale) => {
  try {
    const dictionary = require(getLocalePath(locale))
  } catch(e) {
    console.log(e)
  }


  return (key) => {
    if (
      typeof dictionary[key] === 'undefined'
      && process.NODE_ENV === 'development'
    ) {
      console.log('Could not find a translation for key `' + key + '` in locale `' + locale + '`')
    }

    return dictionary[key] || key
  }
}

module.exports = translate
