const { mdlinks } = require('./index')

const path = process.argv[2]

const stastOptionIndex = process.argv.indexOf('--stats')
const validateOptionIndex = process.argv.indexOf('--validate')


const options = {
    stats: stastOptionIndex > 0,
    validate: validateOptionIndex > 0
  }

mdlinks(path, options)
  
