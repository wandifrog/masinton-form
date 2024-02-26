/**
 * Compares two objects for equality using JSON.stringify.
 *
 * @param {Object} obj1 - The first object to compare.
 * @param {Object} obj2 - The second object to compare.
 * @returns {boolean} Returns true if the objects are equal, false otherwise.
 *
 * @example
 * const objA = { a: 1, b: { c: 2, d: 3 } };
 * const objB = { a: 1, b: { c: 2, d: 3 } };
 * const objC = { a: 1, b: { c: 2, d: 4 } };
 *
 * console.log(objectsEqual(objA, objB)); // Output: true
 * console.log(objectsEqual(objA, objC)); // Output: false
 */
export const objectsEqual = (obj1, obj2) => {
    const stringifiedObj1 = JSON.stringify(obj1);
    const stringifiedObj2 = JSON.stringify(obj2);

    return stringifiedObj1 === stringifiedObj2;
  };