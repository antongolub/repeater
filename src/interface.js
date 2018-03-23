// @flow

export type IAny = any

export type IHandler = (...args: any) => any
export type ILimit = number

export type IOpts = {
  target: IHandler,
  delay: number,
  context?: ?IAny,
  limit?: ?ILimit
}

export type ITarget = IHandler | IOpts

export type IRepeater = {
  (...args: any): any;
  target: IHandler,
  timeout: TimeoutID,
  limit?: ?ILimit,
  delay?: ?number,
  args?: ?Array<IAny>,
  context?: ?IAny
}

export type IWrapper = {
  (fn:ITarget): IRepeater
}
