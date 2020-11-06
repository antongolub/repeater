import def, { repeater } from '../../main/js'

describe('index', () => {
  it('exports repeater as named const and as module default', () => {
    expect(def).toEqual(expect.any(Function))
    expect(repeater).toEqual(expect.any(Function))
  })
})

describe('target/es5', () => {
  it('exports repeater', () => {
    expect(require('../../../target/es5').default).toEqual(expect.any(Function))
    expect(require('../../../target/es5').repeater).toEqual(expect.any(Function))
  })
})
