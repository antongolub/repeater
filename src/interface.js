// @flow

export type IAny = any

export type IHandler = (...args: any) => any

export type IOpts = {
  target: IHandler,
  delay: number,
  context?: ?IAny
}

export type ITarget = IHandler | IOpts

export type IRepeater = {
  (...args: any): any;
  target: ITarget,
  timeout: TimeoutID,
  delay?: ?number,
  args?: ?Array<IAny>
}

export type IWrapper = {
  (fn:ITarget): IRepeater
}
