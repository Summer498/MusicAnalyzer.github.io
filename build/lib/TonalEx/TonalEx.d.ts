import { Chord, NoteLiteral, Scale } from "../adapters/Tonal.js";
export declare class RomanChord {
    readonly scale: Scale;
    readonly chord: Chord;
    constructor(scale: Scale, chord: Chord);
}
export declare const getIntervalDegree: (src: NoteLiteral, dst: NoteLiteral) => number;
export declare const getNonNullableChroma: (note: NoteLiteral) => any;
export declare const getChord: (chord_string: string) => Chord;
declare class RomanChordIdDictionary {
    #private;
    register(chord: Chord, scale: Scale): number;
    getRomanId(chord: Chord, scale: Scale): number;
    getChordId(chord: Chord): number;
    getItemFromRomanId(id: number): RomanChord;
    showAll(): {
        id2scale: string[];
        id2chord: string[];
    };
}
export declare class ChordProgression {
    #private;
    lead_sheet_chords: string[];
    debug(): {
        lead_sheet_chords: string[];
        dict: RomanChordIdDictionary;
    };
    constructor(lead_sheet_chords: string[]);
    getStatesAtTheTime(t: number): number[];
    getChordIdSequence(): number[];
    getDistanceOfStates(s1: number, s2: number): number;
    getMinimumPath(): RomanChord[];
}
export {};
