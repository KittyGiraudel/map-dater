const assert = require('assert')
const specifications = require('../src/data/specifications')
const outcomes = require('../src/data/outcomes')

const isContained = (a, b) => Object
  .keys(b)
  .every((key) => a[key] === b[key])

const getEntryName = (entry) =>
  Object.keys(entry)[0]

const findSpec = (entry) =>
  specifications.find((specification) => specification.name === getEntryName(entry))

const isRoot = (spec) =>
  Object.keys(spec.requirements).length === 0

const isRequirementFulfilled = (requirement, previousSpec) => (
  isRoot(previousSpec)
  || isContained(previousSpec.requirements, requirement)
)

const testPath = (path, expect) => {
  if (typeof outcomes[expect] === 'undefined') {
    throw new Error(expect + ' cannot be an outcome.')
  }

  var previousSpec = findSpec(outcomes[expect])
  const actualPath = path.reverse().slice(1)

  actualPath.forEach((requirement) => {
    const isFulfilled = isRequirementFulfilled(requirement, previousSpec)

    if (!isFulfilled) throw new Error(
      'Cannot come to '
      + JSON.stringify(previousSpec.requirements)
      + ' from '
      + JSON.stringify(requirement)
    )

    previousSpec = findSpec(requirement)
  })
}

describe('The map dater', () => {

  it('should return `o.english_map` for the correct paths', () => {
    assert.doesNotThrow(() => {
      testPath([
        { 'q.istanbul_constantinople': 'a.constantinople' },
        { 'q.canada_alaska_tokyo': 'a.no' },
        { 'q.holy_roman_empire': 'a.no' },
        { 'q.united_states': 'a.no' }
      ], 'o.english_map')
    })
  })

  it('should return `o.1805` for the correct paths', () => {
    assert.doesNotThrow(() => {
      testPath([
        { 'q.istanbul_constantinople': 'a.constantinople' },
        { 'q.canada_alaska_tokyo': 'a.no' },
        { 'q.holy_roman_empire': 'a.yes' }
      ], 'o.1805')
    })

    assert.doesNotThrow(() => {
      testPath([
        { 'q.istanbul_constantinople': 'a.neither' },
        { 'q.ottoman_empire': 'a.yes' },
        { 'q.canada_alaska_tokyo': 'a.no' },
        { 'q.holy_roman_empire': 'a.yes' }
      ], 'o.1805')
    })
  })

  it('should return `o.1834-45` for the correct paths', () => {
    assert.doesNotThrow(() => {
      testPath([
        { 'q.istanbul_constantinople': 'a.constantinople' },
        { 'q.canada_alaska_tokyo': 'a.no' },
        { 'q.holy_roman_empire': 'a.no' },
        { 'q.united_states': 'a.yes' },
        { 'q.texas': 'a.independant' }
      ], 'o.1834-45')
    })
  })

  it('should return `o.1806-10` for the correct paths', () => {
    assert.doesNotThrow(() => {
      testPath([
        { 'q.istanbul_constantinople': 'a.constantinople' },
        { 'q.canada_alaska_tokyo': 'a.no' },
        { 'q.holy_roman_empire': 'a.no' },
        { 'q.united_states': 'a.yes' },
        { 'q.texas': 'a.part_of_mexico' },
        { 'q.florida': 'a.part_of_spain' },
        { 'q.paraguay': 'a.no' }
      ], 'o.1806-10')
    })
  })

  it('should return `o.1811-17` for the correct paths', () => {
    assert.doesNotThrow(() => {
      testPath([
        { 'q.istanbul_constantinople': 'a.constantinople' },
        { 'q.canada_alaska_tokyo': 'a.no' },
        { 'q.holy_roman_empire': 'a.no' },
        { 'q.united_states': 'a.yes' },
        { 'q.texas': 'a.part_of_mexico' },
        { 'q.florida': 'a.part_of_spain' },
        { 'q.paraguay': 'a.yes' }
      ], 'o.1811-17')
    })
  })

  it('should return `o.1818-29` for the correct paths', () => {
    assert.doesNotThrow(() => {
      testPath([
        { 'q.istanbul_constantinople': 'a.constantinople' },
        { 'q.canada_alaska_tokyo': 'a.no' },
        { 'q.holy_roman_empire': 'a.no' },
        { 'q.united_states': 'a.yes' },
        { 'q.texas': 'a.part_of_mexico' },
        { 'q.florida': 'a.part_of_us' },
        { 'q.venezuela_equador': 'a.no' }
      ], 'o.1818-29')
    })
  })

  it('should return `o.1830-33` for the correct paths', () => {
    assert.doesNotThrow(() => {
      testPath([
        { 'q.istanbul_constantinople': 'a.constantinople' },
        { 'q.canada_alaska_tokyo': 'a.no' },
        { 'q.holy_roman_empire': 'a.no' },
        { 'q.united_states': 'a.yes' },
        { 'q.texas': 'a.part_of_mexico' },
        { 'q.florida': 'a.part_of_us' },
        { 'q.venezuela_equador': 'a.yes' }
      ], 'o.1830-33')
    })
  })

  it('should return `o.1858-67` for the correct paths', () => {
    assert.doesNotThrow(() => {
      testPath([
        { 'q.istanbul_constantinople': 'a.constantinople' },
        { 'q.canada_alaska_tokyo': 'a.no' },
        { 'q.holy_roman_empire': 'a.no' },
        { 'q.united_states': 'a.yes' },
        { 'q.texas': 'a.part_of_us' },
        { 'q.russia_sea_japan': 'a.yes' },
      ], 'o.1858-67')
    })
  })

  it('should return `o.1846-53` for the correct paths', () => {
    assert.doesNotThrow(() => {
      testPath([
        { 'q.istanbul_constantinople': 'a.constantinople' },
        { 'q.canada_alaska_tokyo': 'a.no' },
        { 'q.holy_roman_empire': 'a.no' },
        { 'q.united_states': 'a.yes' },
        { 'q.texas': 'a.part_of_us' },
        { 'q.russia_sea_japan': 'a.no' },
        { 'q.us_southern_border': 'a.weird' },
      ], 'o.1846-53')
    })
  })

  it('should return `o.1854-56` for the correct paths', () => {
    assert.doesNotThrow(() => {
      testPath([
        { 'q.istanbul_constantinople': 'a.constantinople' },
        { 'q.canada_alaska_tokyo': 'a.no' },
        { 'q.holy_roman_empire': 'a.no' },
        { 'q.united_states': 'a.yes' },
        { 'q.texas': 'a.part_of_us' },
        { 'q.russia_sea_japan': 'a.no' },
        { 'q.us_southern_border': 'a.norm' },
      ], 'o.1854-56')
    })
  })

  /*
  it('should return `o.1830s-80s` for the correct paths', () => {
    
  })

  it('should return `o.1860s-1900s` for the correct paths', () => {
    
  })

  it('should return `o.1910s` for the correct paths', () => {
    
  })

  it('should return `o.1920s-50s` for the correct paths', () => {
    
  })

  it('should return `o.1960s-1970s` for the correct paths', () => {
    
  })

  it('should return `o.1910-12` for the correct paths', () => {
    
  })

  it('should return `o.1913-18` for the correct paths', () => {
    
  })

  it('should return `o.1919-23` for the correct paths', () => {
    
  })

  it('should return `o.1924-29` for the correct paths', () => {
    
  })

  it('should return `o.1896-1905` for the correct paths', () => {
    
  })

  it('should return `o.1906-09` for the correct paths', () => {
    
  })

  it('should return `o.1884-95` for the correct paths', () => {
    
  })

  it('should return `o.1862-72` for the correct paths', () => {
    
  })

  it('should return `o.1873-83` for the correct paths', () => {
    
  })
  */
})
