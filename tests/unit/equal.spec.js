import equal from '../../src/utils/equal'

describe('equal', () => {
  it('returns true if "a" deeply equals "b"', () => {
    expect(equal('a', 'a')).toBe(true)
    expect(equal(1, 1)).toBe(true)
    expect(equal(true, true)).toBe(true)
    expect(equal(false, false)).toBe(true)
    expect(equal({}, {})).toBe(true)
    expect(equal(null, null)).toBe(true)
    expect(equal({ a: 1, b: true, c: 'foo' }, { c: 'foo', a: 1, b: true })).toBe(true)
    expect(equal({ a: { foo: { a: 1 } }, b: false }, { b: false, a: { foo: { a: 1 } } })).toBe(true)
  })

  it('returns false if "a" not deeply equals "b"', () => {
    expect(equal('a', 'b')).toBe(false)
    expect(equal(1, 2)).toBe(false)
    expect(equal(1, null)).toBe(false)
    expect(equal(null, {})).toBe(false)
    expect(equal('foo', {})).toBe(false)
    expect(equal(true, false)).toBe(false)
    expect(equal(false, true)).toBe(false)
    expect(equal({ a: 1 }, { b: 2 })).toBe(false)
    expect(equal({ a: 1, b: true, c: 'foo' }, { a: 1, b: true })).toBe(false)
    expect(equal({ a: { foo: { a: 1 } }, b: false }, { b: false, a: { foo: { a: 2 } } })).toBe(false)
  })
})
