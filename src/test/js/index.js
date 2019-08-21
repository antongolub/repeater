import repeater from '../../main/js'

describe('index', () => {
  it('exports repeater as default', () => {
    expect(repeater).toEqual(expect.any(Function))
  })
})
