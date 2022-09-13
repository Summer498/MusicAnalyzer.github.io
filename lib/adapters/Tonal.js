/*
export { Tonal, Chord, Pcset, Note, Interval, Scale, Midi } from "@tonaljs/tonal";
//*/
if (window.Tonal === undefined) {
    throw ReferenceError('Tonal.js を HTML からインポートする必要があります. HTML ファイル内に, "<script src="https://cdn.jsdelivr.net/npm/@tonaljs/tonal/browser/tonal.min.js"></script>" と記述してください.');
}
export const Tonal = globalThis.Tonal; // eslint-disable-line no-undef
export const Chord = Tonal.Chord;
export const Pcset = Tonal.Pcset;
export const Note = Tonal.Note;
export const Interval = Tonal.Interval;
export const Scale = Tonal.Scale;
export const Midi = Tonal.Midi;
//*/
