"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMajorKey = void 0;
/* An alternative would be to use the chromatic circle of fifths, but this works too */
const circleOfFifths = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'];
const enharmonicEquivalents = {
    'E#': 'F',
    Fb: 'E',
    Cb: 'B',
    Db: 'C#',
    Ab: 'G#',
    Eb: 'D#',
    Bb: 'A#',
    Gb: 'F#',
    'F##': 'G',
    'C##': 'D',
    Bbb: 'A',
    Dbb: 'C',
    'G##': 'A#',
};
const validNotes = [...circleOfFifths, ...Object.keys(enharmonicEquivalents)];
/* Convert flats, sharps, double flats, and double sharps to an enharmonic equivalent that appears in our circle of fifths */
const convert = (note) => {
    return enharmonicEquivalents[note] || note;
};
/* Capitalize the first letter of a note, e.g. 'c' -> 'C' or 'f#' -> F#' */
const capitalizeNote = (note) => note.charAt(0).toUpperCase() + note.slice(1);
const getMajorKey = (note1, note2, note3) => {
    const uniqueNotes = [...new Set([note1, note2, note3])];
    if (uniqueNotes.length > 3 || uniqueNotes.length < 3) {
        throw new Error('3 unique notes are required');
    }
    const capitalizedNotes = uniqueNotes.map(capitalizeNote);
    const allSharpNotes = capitalizedNotes.map(convert);
    allSharpNotes.forEach((note) => {
        if (!circleOfFifths.includes(note)) {
            throw new Error(`Invalid note: ${note}. Valid notes are ${validNotes.join(', ')}`);
        }
    });
    /* The index of each notes in the circle of fifths from 0 to 11 */
    const noteIndex1 = circleOfFifths.indexOf(allSharpNotes[0]);
    const noteIndex2 = circleOfFifths.indexOf(allSharpNotes[1]);
    const noteIndex3 = circleOfFifths.indexOf(allSharpNotes[2]);
    /* The raw distance between the notes in the circle of fifths */
    const halfSteps1 = Math.abs(noteIndex2 - noteIndex1);
    const halfSteps2 = Math.abs(noteIndex3 - noteIndex2);
    /* The number of half steps between the notes if the shortest path is taken */
    const closestSteps1 = halfSteps1 > 6 ? 12 - halfSteps1 : halfSteps1;
    const closestSteps2 = halfSteps2 > 6 ? 12 - halfSteps2 : halfSteps2;
    if (closestSteps1 === 4 && closestSteps2 === 3) {
        //root, 1 3 5
        return { key: capitalizedNotes[0], category: 'Major', inversion: 'root' };
    }
    if (closestSteps1 === 3 && closestSteps2 === 1) {
        // first inversion, 3 5 1
        return { key: capitalizedNotes[2], category: 'Major', inversion: '1st' };
    }
    if (closestSteps1 === 1 && closestSteps2 === 4) {
        // second inversion,  5 1 3
        return { key: capitalizedNotes[1], category: 'Major', inversion: '2nd' };
    }
    if (closestSteps1 === 1 && closestSteps2 === 3) {
        //root, 1 5 3
        return { key: capitalizedNotes[0], category: 'Major', inversion: 'root' };
    }
    if (closestSteps1 === 4 && closestSteps2 === 1) {
        // first inversion, 3 1 5
        return { key: capitalizedNotes[1], category: 'Major', inversion: '1st' };
    }
    if (closestSteps1 === 3 && closestSteps2 === 4) {
        // second inversion, 5 3 1
        return { key: capitalizedNotes[2], category: 'Major', inversion: '2nd' };
    }
    throw new Error('Major chord not found');
};
exports.getMajorKey = getMajorKey;
