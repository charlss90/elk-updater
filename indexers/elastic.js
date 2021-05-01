const { elasticUrl } = require('../config')
const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  node: elasticUrl,
  ssl: { rejectUnauthorized: false },
})

exports.indexData = async function ({ name, id, mappings, type }, data) {
  await createIndexIfNotExists(name, mappings)

  return client.index({
    index: name,
    id,
    body: data,
  })
}

async function createIndexIfNotExists(name, mappings) {
  if (await isNotExists(name)) {
    const { statusCode } = await client.indices.create({
      index: name,
      body: {
        mappings,
      },
    })

    if (!(statusCode === 200 || statusCode === 201)) {
      throw new Error('Cannot add index')
    }
  }
}

async function isNotExists(name) {
  const { statusCode } = await client.indices.exists({ index: name })

  return statusCode === 404
}
