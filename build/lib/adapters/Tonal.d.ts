export interface Named {
    readonly name: string;
}
export declare type PcsetChroma = string;
export declare type IntervalName = string;
export interface Pcset extends Named {
    readonly empty: boolean;
    readonly setNum: number;
    readonly chroma: PcsetChroma;
    readonly normalized: PcsetChroma;
    readonly intervals: IntervalName[];
}
export declare type ChordQuality = "Major" | "Minor" | "Augmented" | "Diminished" | "Unknown";
export interface ChordType extends Pcset {
    name: string;
    quality: ChordQuality;
    aliases: string[];
}
declare type Fraction = [number, number];
export interface DurationValue {
    empty: boolean;
    value: number;
    name: string;
    fraction: Fraction;
    shorthand: string;
    dots: string;
    names: string[];
}
export interface Key {
    readonly type: "major" | "minor";
    readonly tonic: string;
    readonly alteration: number;
    readonly keySignature: string;
}
export interface Mode extends Pcset {
    readonly name: string;
    readonly modeNum: number;
    readonly alt: number;
    readonly triad: string;
    readonly seventh: string;
    readonly aliases: string[];
}
export declare type Direction = 1 | -1;
export interface Pitch {
    readonly step: number;
    readonly alt: number;
    readonly oct?: number;
    readonly dir?: Direction;
}
export declare type NoteWithOctave = string;
export declare type PcName = string;
export declare type NoteName = NoteWithOctave | PcName;
export declare type NoteLiteral = NoteName | Pitch | Named;
export interface Chord extends ChordType {
    tonic: string | null;
    type: string;
    root: string;
    rootDegree: number;
    symbol: string;
    notes: NoteName[];
}
export interface RomanNumeral extends Pitch, Named {
    readonly empty: boolean;
    readonly roman: string;
    readonly interval: string;
    readonly acc: string;
    readonly chordType: string;
    readonly major: boolean;
    readonly dir: 1;
}
export interface ScaleType extends Pcset {
    readonly name: string;
    readonly aliases: string[];
}
export interface Scale extends ScaleType {
    tonic: string | null;
    type: string;
    notes: NoteName[];
}
export interface ScaleType extends Pcset {
    readonly name: string;
    readonly aliases: string[];
}
export declare type ValidTimeSignature = {
    readonly empty: false;
    readonly name: string;
    readonly upper: number | number[];
    readonly lower: number;
    readonly type: "simple" | "compound" | "irregular";
    readonly additive: number[];
};
export declare type InvalidTimeSignature = {
    readonly empty: true;
    readonly name: "";
    readonly upper: undefined;
    readonly lower: undefined;
    readonly type: undefined;
    readonly additive: [];
};
export declare type TimeSignature = ValidTimeSignature | InvalidTimeSignature;
interface ICore {
    Chord: any;
    ChordType: any;
    DurationValue: any;
    Key: any;
    Mode: any;
    Pcset: any;
    RomanNumeral: any;
    Scale: any;
    ScaleType: any;
    TimeSignature: any;
    Note: any;
    Interval: any;
    Midi: any;
    Progression: any;
}
export declare const Tonal: ICore;
export declare const Chord_default: any;
export declare const ChordType_default: any;
export declare const DurationValue_default: any;
export declare const Key_default: any;
export declare const Mode_default: any;
export declare const Pcset_default: any;
export declare const RomanNumeral_default: any;
export declare const Scale_default: any;
export declare const ScaleType_default: any;
export declare const TimeSignature_default: any;
export declare const Note: any;
export declare const Interval: any;
export declare const Midi: any;
export declare const Progression: any;
export {};
