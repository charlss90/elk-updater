const got = require('got')
const { readHttpBody } = require('../common/readHttpBody')
const { HttpError } = require('../errors/http')
const { indexData } = require('./elastic')

module.exports = class Generic {
  constructor({ name, url, fields, indexConfig }) {
    this.name = name
    this.url = url
    this.fields = fields
    this.indexConfig = indexConfig
  }

  async index() {
    const dataList = this.onDataProcess(await this.get())

    dataList.forEach(this._indexItem)
  }

  _indexItem = async (item) => {
    try {
      const result = await indexData(this.indexConfig, item)

      if (result.statusCode !== 201 && result.statusCode !== 200) {
        throw new HttpError('an error occurren when trying to index', result)
      }

      console.log(
        'index item into %s index successfully',
        this.indexConfig.name
      )
    } catch (ex) {
      console.error(ex)
    }
  }

  async get() {
    const res = await got(this.url)

    if (res.statusCode !== 200) {
      throw new HttpError(`unabled to fetch by this url: ${this.url}`, res)
    }

    return readHttpBody(res)
  }

  /**
   * @return {Array<any>}
   */
  onDataProcess() {
    console.warn('non implemented')
    return null
  }
}
