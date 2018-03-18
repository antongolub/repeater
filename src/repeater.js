// @flow

import type {
  IAny,
  IRepeater,
  ITarget,
  IOpts
} from './interface'

/**
 * Creates a new repeater.
 * @param {Function} target
 * @param {number} delay
 * @param {*} [context]
 * @return {IRepeater}
 * @property {Function/IOpts} target
 * @property {number} delay
 * @property {*} context
 * @property {Array<*>} [args] arguments of the last invocation
 * @property {number} [timeout] TimeoutID
 */
export default function createRepeater (target: ITarget, delay: number, context: ?IAny): IRepeater {
  if (typeof target === 'object') {
    const {target: _target, delay, context}: IOpts = target

    return createRepeater(_target, delay, context)
  }

  if (typeof target !== 'function') {
    throw new Error('repeater: target must be callable')
  }

  if (!delay) {
    throw new Error('repeater: delay must not be empty')
  }

  const repeater = (...args): IAny => {
    clearTimeout(repeater.timeout)

    repeater.args = args
    repeater.timeout = setTimeout(repeater.bind(repeater, ...args), delay)

    return repeater.target.call(context, ...args)
  }

  repeater.target = target
  repeater.delay = delay
  repeater.context = context

  return repeater
}
