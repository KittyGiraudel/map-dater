const IS_DEVELOPMENT = (process.NODE_ENV === 'development')

// Return path to the locale file.
const getLocalePath = (locale) =>
  (process.cwd() + '/src/locales/' + locale)

const setLocale = (locale) => {
  try {
    var dictionary = require(getLocalePath(locale))
  } catch(e) {
    console.log(e)
  }

  // Return the translation mapped to the given key, or the key itself if no
  // translation found.
  return (key) => {
    if (!dictionary[key] && IS_DEVELOPMENT) {
      console.log('Could not find a translation for key `' + key + '` in locale `' + locale + '`')
    }

    return dictionary[key] || key
  }
}

module.exports = setLocale
