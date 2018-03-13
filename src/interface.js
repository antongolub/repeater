// @flow

export type IAny = any

export type ITarget = {
  (...args: any): any
}

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
