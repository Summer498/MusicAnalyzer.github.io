export declare type SongleConstructor = any;
export declare type Event = any;
export declare type BeatEvent = any;
export declare type ChordEvent = any;
export declare type SectionEvent = any;
declare type ISongle = any;
interface SongleWindow extends Window {
    Songle: ISongle;
    onSongleAPIReady: any;
}
export declare const Songle: any;
export declare const songle_window: SongleWindow;
export {};
