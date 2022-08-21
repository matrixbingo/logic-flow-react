const toString = Object.prototype.toString

function getTag(value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  return toString.call(value)
}

function isObjectLike(value) {
  return typeof value === 'object' && value !== null
}

function isNumber(value) {
  return typeof value === 'number' ||
    (isObjectLike(value) && getTag(value) == '[object Number]')
}

function isBoolean(value) {
  return value === true || value === false ||
    (isObjectLike(value) && getTag(value) == '[object Boolean]')
}

export const assertError = (props: any, keys: string[]) => {
  keys.forEach((key) => {
    const value = props[key];
    if (!isNumber(value) && !isBoolean(value) && !value) {
      throw new Error(`${key} is not existed!`);
    }
  });
};
