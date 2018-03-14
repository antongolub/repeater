// @flow

import type {
  IAny,
  IRepeater,
  ITarget
} from './interface'

/**
 * Creates a new repeater.
 * @param {Function} target
 * @param {number} delay
 * @param {*} [context]
 * @return {IRepeater}
 * @property {Function} target
 * @property {number} delay
 * @property {*} context
 * @property {Array<*>} [args] arguments of the last invocation
 * @property {number} [timeout] TimeoutID
 */
export default function createRepeater (target: ITarget, delay: number, context: ?IAny): IRepeater {
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
