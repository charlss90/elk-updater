const { readHttpBody } = require('../common/readHttpBody')

exports.HttpError = class HttpError extends Error {
  get status() {
    return this._res.status
  }

  /**
   *
   * @param {String} message
   * @param {Response} res
   */
  constructor(message, res) {
    super(`${message} ${readHttpBody(res)}`)

    this.code = res.status
    this._res = res
  }
}
