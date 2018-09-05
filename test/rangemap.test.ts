import RangeMap from '../src/rangemap'

/**
 * Dummy test
 */
describe('RangeMap', () => {
  it('RangeMap is instantiable', () => {
    expect(new RangeMap()).toBeInstanceOf(RangeMap)
  })

  it('should return undefined when map is empty', () => {
    expect(new RangeMap().get(1)).toBeUndefined()
  })

  it('should return a valid value when key exists in range', () => {
    const rangeMap = new RangeMap()
    rangeMap.set(20, 30, 84)
    expect(rangeMap.get(25)).toBe(84)
    rangeMap.set(0, 10, 42)
    expect(rangeMap.get(5)).toBe(42)
  })

  it("should return undefined when key doesn't exist in range", () => {
    const rangeMap = new RangeMap()
    rangeMap.set(0, 10, 42)
    expect(rangeMap.get(25)).toBeUndefined()
  })

  it('should throw an exception when setting a range that overlaps previous values', () => {
    expect(() => {
      const rangeMap = new RangeMap()
      rangeMap.set(0, 10, 42)
      rangeMap.set(0, 10, 42)
    }).toThrow()
  })

  it('should new range into the right position', () => {
    const rangeMap = new RangeMap()
    rangeMap.set(0, 10, 42)
    rangeMap.set(20, 30, 84)
    expect(rangeMap.ranges.length).toBe(2)
    expect(rangeMap.ranges[0].value).toBe(42)
    expect(rangeMap.ranges[1].value).toBe(84)
  })

  it('should pass general test', () => {
    const rangeMap = new RangeMap()
    rangeMap.set(0, 1, 1)
    rangeMap.set(6, 7, 7)
    rangeMap.set(3, 4, 4)
    expect(rangeMap.get(2)).toBeUndefined()
    expect(rangeMap.get(0)).toBe(1)
    expect(rangeMap.get(6)).toBe(7)
    expect(rangeMap.get(4)).toBe(4)
    expect(rangeMap.get(-1)).toBeUndefined()
    expect(rangeMap.get(10)).toBeUndefined()
  })
})
