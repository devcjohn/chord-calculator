import { getMajorKey } from '../src/main'

describe('getMajorKey', () => {
  ;[
    // C Major
    { input: ['C', 'E', 'G'], expected: 'C' },
    { input: ['E', 'G', 'C'], expected: 'C' },
    { input: ['G', 'C', 'E'], expected: 'C' },
    { input: ['C', 'G', 'E'], expected: 'C' },
    { input: ['E', 'C', 'G'], expected: 'C' },
    { input: ['G', 'E', 'C'], expected: 'C' },

    // Lower case
    { input: ['c', 'e', 'g'], expected: 'C' },
    { input: ['c', 'g', 'e'], expected: 'C' },

    // D Major
    { input: ['D', 'F#', 'A'], expected: 'D' },
    { input: ['D', 'A', 'F#'], expected: 'D' },
    { input: ['F#', 'D', 'A'], expected: 'D' },
    { input: ['F#', 'A', 'D'], expected: 'D' },
    { input: ['A', 'F#', 'D'], expected: 'D' },
    { input: ['A', 'D', 'F#'], expected: 'D' },

    // F Major
    { input: ['F', 'A', 'C'], expected: 'F' },
    { input: ['F', 'C', 'A'], expected: 'F' },
    { input: ['A', 'F', 'C'], expected: 'F' },
    { input: ['A', 'C', 'F'], expected: 'F' },
    { input: ['C', 'A', 'F'], expected: 'F' },
    { input: ['C', 'F', 'A'], expected: 'F' },

    // C# Major
    { input: ['C#', 'E#', 'G#'], expected: 'C#' },
    { input: ['C#', 'F', 'G#'], expected: 'C#' },
    { input: ['C#', 'G#', 'F'], expected: 'C#' },
    { input: ['C#', 'G#', 'E#'], expected: 'C#' },
    { input: ['C#', 'E#', 'G#'], expected: 'C#' },
    { input: ['C#', 'F', 'G#'], expected: 'C#' },
    { input: ['C#', 'G#', 'F'], expected: 'C#' },
    { input: ['C#', 'G#', 'E#'], expected: 'C#' },

    // Double sharps
    { input: ['D#', 'F##', 'A#'], expected: 'D#' },
    { input: ['F##', 'D#', 'A#'], expected: 'D#' },
    { input: ['D#', 'F##', 'A#'], expected: 'D#' },
    { input: ['F##', 'D#', 'A#'], expected: 'D#' },
    { input: ['A#', 'D#', 'F##'], expected: 'D#' },
    { input: ['A#', 'C##', 'E#'], expected: 'A#' },

    // Double flats
    { input: ['Bbb', 'Dbb', 'F'], expected: 'F' }, // A, C, F = F

    // Others
    { input: ['Db', 'Bb', 'Gb'], expected: 'Gb' },
    { input: ['Eb', 'G', 'Bb'], expected: 'Eb' },
    { input: ['Gb', 'Bb', 'Db'], expected: 'Gb' },
    { input: ['F#', 'A#', 'C#'], expected: 'F#' },
    { input: ['A#', 'D#', 'F##'], expected: 'D#' },
    { input: ['Bb', 'D', 'F'], expected: 'Bb' },
    { input: ['Bb', 'F', 'D'], expected: 'Bb' },
    { input: ['Db', 'F', 'Ab'], expected: 'Db' },
  ].forEach(({ input, expected }) => {
    it(`should return ${expected} for ${input}`, () => {
      const actual = getMajorKey(input[0], input[1], input[2])
      expect(actual).toEqual(expected)
    })
  })

  it('should throw error if notes are duplicated', () => {
    expect(() => getMajorKey('E', 'E', 'B')).toThrowError('3 unique notes are required')
    expect(() => getMajorKey('E', 'E', 'E')).toThrowError('3 unique notes are required')
  })

  it('should throw error chord is not a real major chord', () => {
    expect(() => getMajorKey('E', 'G##', 'B')).toThrowError('Major chord not found')
  })

  it('should throw error if unknown note provided', () => {
    expect(() => getMajorKey('C', 'E', 'H')).toThrowError(
      'Invalid note: H. Valid notes are C, G, D, A, E, B, F#, C#, G#, D#, A#, F, E#, Fb, Cb, Db, Ab, Eb, Bb, Gb, F##, C##, Bbb, Dbb, G##'
    )
  })
})
