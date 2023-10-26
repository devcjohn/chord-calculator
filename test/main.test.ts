import { getMajorKey } from '../src/main'

describe('getMajorKey', () => {
  ;[
    // C Major
    { input: ['C', 'E', 'G'], expected: { key: 'C', category: 'Major', inversion: 'root' } },
    { input: ['E', 'G', 'C'], expected: { key: 'C', category: 'Major', inversion: '1st' } },
    { input: ['G', 'C', 'E'], expected: { key: 'C', category: 'Major', inversion: '2nd' } },
    { input: ['C', 'G', 'E'], expected: { key: 'C', category: 'Major', inversion: 'root' } },
    { input: ['E', 'C', 'G'], expected: { key: 'C', category: 'Major', inversion: '1st' } },
    { input: ['G', 'E', 'C'], expected: { key: 'C', category: 'Major', inversion: '2nd' } },

    // // Lower case
    { input: ['c', 'e', 'g'], expected: { key: 'C', category: 'Major', inversion: 'root' } },
    { input: ['c', 'g', 'e'], expected: { key: 'C', category: 'Major', inversion: 'root' } },

    // // D Major
    { input: ['D', 'F#', 'A'], expected: { key: 'D', category: 'Major', inversion: 'root' } },
    { input: ['D', 'A', 'F#'], expected: { key: 'D', category: 'Major', inversion: 'root' } },
    { input: ['F#', 'D', 'A'], expected: { key: 'D', category: 'Major', inversion: '1st' } },
    { input: ['F#', 'A', 'D'], expected: { key: 'D', category: 'Major', inversion: '1st' } },
    { input: ['A', 'F#', 'D'], expected: { key: 'D', category: 'Major', inversion: '2nd' } },
    { input: ['A', 'D', 'F#'], expected: { key: 'D', category: 'Major', inversion: '2nd' } },

    // // F Major
    { input: ['F', 'A', 'C'], expected: { key: 'F', category: 'Major', inversion: 'root' } },
    { input: ['F', 'C', 'A'], expected: { key: 'F', category: 'Major', inversion: 'root' } },
    { input: ['A', 'F', 'C'], expected: { key: 'F', category: 'Major', inversion: '1st' } },
    { input: ['A', 'C', 'F'], expected: { key: 'F', category: 'Major', inversion: '1st' } },
    { input: ['C', 'A', 'F'], expected: { key: 'F', category: 'Major', inversion: '2nd' } },
    { input: ['C', 'F', 'A'], expected: { key: 'F', category: 'Major', inversion: '2nd' } },

    // // C# Major
    { input: ['C#', 'E#', 'G#'], expected: { key: 'C#', category: 'Major', inversion: 'root' } },
    { input: ['C#', 'F', 'G#'], expected: { key: 'C#', category: 'Major', inversion: 'root' } },
    { input: ['C#', 'G#', 'F'], expected: { key: 'C#', category: 'Major', inversion: 'root' } },
    { input: ['C#', 'G#', 'E#'], expected: { key: 'C#', category: 'Major', inversion: 'root' } },
    { input: ['E#', 'G#', 'C#'], expected: { key: 'C#', category: 'Major', inversion: '1st' } },

    // // Double sharps
    { input: ['D#', 'F##', 'A#'], expected: { key: 'D#', category: 'Major', inversion: 'root' } },
    { input: ['F##', 'D#', 'A#'], expected: { key: 'D#', category: 'Major', inversion: '1st' } },
    { input: ['A#', 'D#', 'F##'], expected: { key: 'D#', category: 'Major', inversion: '2nd' } },
    { input: ['A#', 'C##', 'E#'], expected: { key: 'A#', category: 'Major', inversion: 'root' } },

    // // Double flats
    { input: ['Bbb', 'Dbb', 'F'], expected: { key: 'F', category: 'Major', inversion: '1st' } }, // A, C, F = F

    // // Others
    { input: ['Db', 'Bb', 'Gb'], expected: { key: 'Gb', category: 'Major', inversion: '2nd' } },
    { input: ['Eb', 'G', 'Bb'], expected: { key: 'Eb', category: 'Major', inversion: 'root' } },
    { input: ['Gb', 'Bb', 'Db'], expected: { key: 'Gb', category: 'Major', inversion: 'root' } },
    { input: ['F#', 'A#', 'C#'], expected: { key: 'F#', category: 'Major', inversion: 'root' } },
    { input: ['A#', 'D#', 'F##'], expected: { key: 'D#', category: 'Major', inversion: '2nd' } },
    { input: ['Bb', 'D', 'F'], expected: { key: 'Bb', category: 'Major', inversion: 'root' } },
    { input: ['Bb', 'F', 'D'], expected: { key: 'Bb', category: 'Major', inversion: 'root' } },
    { input: ['Db', 'F', 'Ab'], expected: { key: 'Db', category: 'Major', inversion: 'root' } },
  ].forEach(({ input, expected }) => {
    it(`should  ${expected} for ${input}`, () => {
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
