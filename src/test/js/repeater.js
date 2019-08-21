import repeater from '../../main/js/repeater'

describe('repeater', () => {
  it('properly wraps target', () => {
    const target = () => {}
    const context = {}
    const delay = 1000000
    const rep = repeater(target, delay, context)

    expect(rep).toEqual(expect.any(Function))
    expect(rep.target).toEqual(target)
    expect(rep.context).toEqual(context)
    expect(rep.delay).toEqual(delay)

    clearTimeout(rep.timeout)
  })

  it('repeats target fn every `delay` ms with initial args', done => {
    const context = {
      i: 0
    }
    const delay = 10
    function target (step) {
      this.i += step
      if (this.i === 6) {
        clearTimeout(rep.timeout)
        done()
      }
    }

    const rep = repeater(target, delay, context)

    rep(2)
  })

  it('throws error if delay is empty', () => {
    expect(() => repeater(() => {}, 0)).toThrow('repeater: delay must not be empty')
  })

  it('throws error if target is not callable', () => {
    expect(() => repeater(1, 1000)).toThrow('repeater: target must be callable')
  })

  it('allows to combine `manual` and `automated` flows', done => {
    function target (step) { this.i += step }
    const context = { i: 0 }
    const delay = 10
    const rep = repeater(target, delay, context)

    rep(1)

    setTimeout(() => rep(4), 20)
    setTimeout(() => {
      expect(context.i > 9).toBeTruthy()
      clearTimeout(rep.timeout)
      done()
    }, 40)
  })

  it('repeats handler until the limit is reached', done => {
    const context = {
      i: 0
    }
    const limit = 2
    const delay = 5
    function target (step) {
      this.i += step
    }

    const rep = repeater(target, delay, context, limit)

    setTimeout(() => {
      clearTimeout(rep.timeout)
      expect(context.i === 2).toBeTruthy()
      done()
    }, 20)

    rep(1)
  })

  it('supports configuring through opts literal', () => {
    const target = () => {}
    const context = {}
    const delay = 1000000
    const rep = repeater({ target, delay, context })

    expect(rep).toEqual(expect.any(Function))
    expect(rep.target).toEqual(target)
    expect(rep.context).toEqual(context)
    expect(rep.delay).toEqual(delay)

    clearTimeout(rep.timeout)
  })
})
