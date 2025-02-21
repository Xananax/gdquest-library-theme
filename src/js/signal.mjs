// @ts-check


/**
 * A signal encloses a value and a set of listeners.
 * It can be conceptually thought of as an event emitter.
 * @template T
 * @template V
 * @param {T} initialValue
 */
export function signal(initialValue) {
    /**
     * @typedef { (arg:T)=>void } Listener
     */

    let value = structuredClone(initialValue);

  /** @type {Set<Listener>} */
  const listeners = new Set();

  const get = () => {
    return value
  };

  /**
   * @template V
   * @param {(arg:T)=>V} fn 
   * @returns 
   */
  const map = fn => {
    const nextSignal = signal(fn(value));
    on(nextValue => nextSignal.set(fn(nextValue)));
    return nextSignal;
  }

  /**
   * @param {Listener} subscription
   */
  const on = (subscription) => {
    listeners.add(subscription);
    return off.bind(null, subscription);
  };

  /**
   * @param {Listener} subscription
   */
  const off = (subscription) => {
    listeners.delete(subscription);
  };

  /**
   * @param {T} nextValue
   */
  const set = (nextValue) => {
    value = structuredClone(nextValue);
    listeners.forEach((listener) => listener(value));
  };

  return { get, set, on, off, map }
}
