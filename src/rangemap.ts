import { Exception } from 'handlebars'

interface IRange {
  start: number
  end: number
  value: any
}

export default class RangeMap {
  public ranges: IRange[] = []

  set(start: number, end: number, value: any) {
    if (this.get(start) !== undefined || this.get(end) !== undefined) {
      throw Exception('Range exists')
    }
    const insertionIndex = this.findInsertionIndex(start, end)
    this.ranges.splice(insertionIndex, 0, {
      start,
      end,
      value
    })
  }

  findInsertionIndex(start: number, end: number) {
    if (this.ranges.length === 0) {
      return 0
    }
    let lo = 0
    let hi = this.ranges.length
    while (lo < hi) {
      let mid = Math.floor((lo + hi) / 2)
      let midRange = this.ranges[mid]
      if (mid === 0) {
        if (end <= midRange.start) {
          return mid
        }
      }
      if (mid === this.ranges.length - 1) {
        if (start >= midRange.end) {
          return mid + 1
        }
      }
      let beforeMidRange = this.ranges[mid - 1]
      if (start >= beforeMidRange.end && end <= midRange.start) {
        return mid
      } else if (start < beforeMidRange.end) {
        hi = mid - 1
      } else {
        lo = mid + 1
      }
    }
    return -1
  }

  get(key: number) {
    let lo = 0
    let hi = this.ranges.length - 1
    while (lo <= hi) {
      let mid = Math.floor((lo + hi) / 2)
      let midRange = this.ranges[mid]
      if (midRange.start <= key && key <= midRange.end) {
        return midRange.value
      } else if (key <= midRange.start) {
        hi = mid - 1
      } else {
        lo = mid + 1
      }
    }
    return undefined
  }
}
