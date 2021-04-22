/**
 *
 * @param {Response} res
 * @returns {Object|String}
 */
exports.readHttpBody = function readHttpBody(res) {
  let content = res.body

  try {
    content = JSON.parse(res.body)
  } catch (ex) {
    console.warn('cannot to convert body in json')
  }

  return content
}
