** Chords **

This library is designed to take a set of notes and return the key those notes belong to.
It currently only supports major chords

**_ Example use _**

```
const key = getMajorKey('C', 'E', 'G')
// key === 'C'

const key = getMajorKey('F', 'D', 'Bb')
// key === 'Bb'

const key = getMajorKey('F##', 'D#', 'A#)
// key === 'D#'
```

For more examples, see the test file

**Todo**

- Support 4+ notes
- Support minor chords
- Support diminished / augmented chords
- Support 7th chords
- Support 9th chords, etc
- Improve error message when empty string passed
- Better typing
