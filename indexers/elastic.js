const { elasticUrl } = require('../config')
const { Client } = require('@elastic/elasticsearch')

const client = new Client({ node: elasticUrl })

exports.indexData = function ({ name, id }, data) {
  return client.index({
    index: name,
    id,
    body: data,
  })
}
