import { Chord, NoteLiteral, Scale } from "../adapters/Tonal.js";
export declare class RomanChord {
    readonly scale: Scale;
    readonly chord: Chord;
    constructor(scale: Scale, chord: Chord);
}
export declare const getChord: (chord_string: string) => Chord;
export declare const getIntervalDegree: (src: NoteLiteral, dst: NoteLiteral) => number;
export declare const getNonNullableChroma: (note: NoteLiteral) => any;
