/*
export { Chord } from "@tonaljs/chord";
export { ChordType } from "@tonaljs/chord-type";
export { DurationValue } from "@tonaljs/duration-value";
export { Key } from "@tonaljs/key";
export { Mode } from "@tonaljs/mode";
export { Pcset } from "@tonaljs/pcset";
export { RomanNumeral } from "@tonaljs/roman-numeral";
export { Scale } from "@tonaljs/scale";
export { ScaleType } from "@tonaljs/scale-type";
export { TimeSignature } from "@tonaljs/time-signature";

import Chord_default from "@tonaljs/chord";
export { Chord_default };
import ChordType_default from "@tonaljs/chord-type";
export { ChordType_default };
import DurationValue_default from "@tonaljs/duration-value";
export { DurationValue_default };
import Key_default from "@tonaljs/key";
export { Key_default };
import Mode_default from "@tonaljs/mode";
export { Mode_default };
import Pcset_default from "@tonaljs/pcset";
export { Pcset_default };
import RomanNumeral_default from "@tonaljs/roman-numeral";
export { RomanNumeral_default };
import Scale_default from "@tonaljs/scale";
export { Scale_default };
import ScaleType_default from "@tonaljs/scale-type";
export { ScaleType_default };
import TimeSignature_default from "@tonaljs/time-signature";
export { TimeSignature_default };


export {
    Array,
    Core,
    AbcNotation,
    Collection,
    Interval,
    Midi,
    Note,
    Progression,
    Range,
    Tonal,
    PcSet,
    ChordDictionary,
    ScaleDictionary,
    fillStr,
    deprecate,
    Named,
    NamedFound,
    NotFound,
    isNamed,
    Direction,
    PitchClassCoordinates,
    NoteCoordinates,
    IntervalCoordinates,
    PitchCoordinates,
    Pitch,
    isPitch,
    encode,
    decode,
    NoteWithOctave,
    PcName,
    NoteName,
    NoteLiteral,
    NoNote,
    stepToLetter,
    altToAcc,
    accToAlt,
    note,
    tokenizeNote,
    coordToNote,
    IntervalName,
    IntervalLiteral,
    NoInterval,
    tokenizeInterval,
    interval,
    coordToInterval,
    transpose,
    distance,
} from "@tonaljs/tonal";

//*/
if (window.Tonal === undefined) {
    throw ReferenceError('Tonal.js を HTML からインポートする必要があります. HTML ファイル内に, "<script src="https://cdn.jsdelivr.net/npm/@tonaljs/tonal/browser/tonal.min.js"></script>" と記述してください.');
}
export const Tonal = globalThis.Tonal; // eslint-disable-line no-undef
export const Chord_default = Tonal.Chord;
export const ChordType_default = Tonal.ChordType;
export const DurationValue_default = Tonal.DurationValue;
export const Key_default = Tonal.Key;
export const Mode_default = Tonal.Mode;
export const Pcset_default = Tonal.Pcset;
export const RomanNumeral_default = Tonal.RomanNumeral;
export const Scale_default = Tonal.Scale;
export const ScaleType_default = Tonal.ScaleType;
export const TimeSignature_default = Tonal.TimeSignature;
export const Note = Tonal.Note;
export const Interval = Tonal.Interval;
export const Midi = Tonal.Midi;
export const Progression = Tonal.Progression;
//*/
