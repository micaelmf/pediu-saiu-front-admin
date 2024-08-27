/**
 * Check whether specified param is a function
 *
 * @param {any} fn
 * @returns
 */
export const isFunction = (fn) => {
  return fn && {}.toString.call(fn) === "[object Function]";
};
