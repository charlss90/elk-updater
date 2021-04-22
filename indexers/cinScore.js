const Generic = require('./generic')

const END_OF_LINE = /\r?\n/

exports.CinScore = class extends Generic {
  static type = 'CinScore'

  /**
   *
   * @param {String} data
   */
  onDataProcess(data) {
    if (typeof data !== 'string') {
      throw new TypeError('data is not a string')
    }

    return [
      {
        ips_maliciosas: data
          .split(END_OF_LINE)
          .map((line) => line.trim())
          .map(this._processLine)
          .filter((x) => !!x),
      },
    ]
  }

  /**
   *
   * @param {String} line
   */
  _processLine = (line) => {
    let elasticData = {}
    const entries = Object.entries(this.fields)
    let last = null

    for (const [field, regex] of entries) {
      if (regex.test(line)) {
        elasticData[field] = last = line.match(regex)[0]
      }
    }

    return last
  }
}
