import repeater from '../src'

describe('index', () => {
  it('exports repeater as default', () => {
    expect(repeater).toEqual(expect.any(Function))
  })
})
