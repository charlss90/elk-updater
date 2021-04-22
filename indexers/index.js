const { CinScore } = require('./cinScore')

exports.resolveParser = function ({ type, ...config }) {
  switch (type) {
    case CinScore.type:
      return new CinScore(config)

    default:
      return null
  }
}
