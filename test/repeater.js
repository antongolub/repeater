import chai from 'chai'
import repeater from '../src/repeater'

const { expect } = chai

describe('repeater', () => {
  it('properly wraps target', () => {
    const target = () => {}
    const context = {}
    const delay = 1000000
    const rep = repeater(target, delay, context)

    expect(rep).to.be.a('function')
    expect(rep.target).to.equal(target)
    expect(rep.context).to.equal(context)
    expect(rep.delay).to.equal(delay)
  })

  it('repeats target fn every `delay` ms with initial args', (done) => {
    const context = {
      i: 0
    }
    const delay = 10
    function target (step) {
      this.i += step
      if (this.i === 6) {
        done()
      }
    }

    const rep = repeater(target, delay, context)

    rep(2)
  })

  it('throws error if delay is empty', () => {
    expect(() => repeater(() => {}, 0)).to.throw('repeater: delay must not be empty')
  })

  it('throws error if target is not callable', () => {
    expect(() => repeater(1, 1000)).to.throw('repeater: target must be callable')
  })

  it('allows to combine `manual` and `automated` flows', (done) => {
    const context = {
      i: 0
    }
    const delay = 10
    function target (step) {
      this.i += step
    }

    const rep = repeater(target, delay, context)
    rep(1)

    setTimeout(() => rep(4), 20)
    setTimeout(() => {
      expect(context.i).to.be.above(9)
      done()
    }, 40)
  })

  it('supports option interface', () => {
    const target = () => {}
    const context = {}
    const delay = 1000000
    const rep = repeater({target, delay, context})

    expect(rep).to.be.a('function')
    expect(rep.target).to.equal(target)
    expect(rep.context).to.equal(context)
    expect(rep.delay).to.equal(delay)
  })
})
