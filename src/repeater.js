// @flow

import type {
  IAny,
  IRepeater,
  ITarget,
  IOpts,
  ILimit
} from './interface'

/**
 * Creates a new repeater.
 * @param {Function} target
 * @param {number} delay
 * @param {*} [context]
 * @param {number} [limit]
 * @return {IRepeater}
 * @property {Function/IOpts} target
 * @property {number} delay
 * @property {*} context
 * @property {Array<*>} [args] arguments of the last invocation
 * @property {number} [timeout] TimeoutID
 */
export default function createRepeater (target: ITarget, delay: number, context: ?IAny, limit?: ?ILimit): IRepeater {
  if (typeof target === 'object') {
    const {target: _target, delay, context, limit}: IOpts = target

    return createRepeater(_target, delay, context, limit)
  }

  assert(target, delay)

  const repeater = (...args): IAny => {
    const {timeout, target, limit, context}: IRepeater = repeater
    let nextLimit
    clearTimeout(timeout)

    if (typeof limit === 'number') {
      nextLimit = limit - 1
    }

    if (nextLimit === undefined || nextLimit > 0) {
      repeater.limit = nextLimit
      repeater.args = args
      repeater.timeout = setTimeout(repeater.bind(repeater, ...args), delay)
    }

    return target.call(context, ...args)
  }

  repeater.target = target
  repeater.delay = delay
  repeater.limit = limit
  repeater.context = context

  return repeater
}

function assert (target: ITarget, delay: number): void {
  if (typeof target !== 'function') {
    throw new Error('repeater: target must be callable')
  }

  if (!delay) {
    throw new Error('repeater: delay must not be empty')
  }
}
