/**
 * Mapping object keys
 *
 * @param {object} obj
 * @param {Function} fn
 * @returns
 */
export const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k]
    return acc
  }, {})
