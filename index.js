const { repositories } = require('./config')
const { resolveParser } = require('./indexers')

;(async function main() {
  try {
    repositories.forEach(async (config) => {
      try {
        const parser = resolveParser(config)
        await parser.index()
      } catch (ex) {
        console.error(ex)
      }
    })
  } catch (ex) {
    console.error(ex)
  }
})()
