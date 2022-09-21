export declare type Event = any;
export declare type BeatEvent = any;
export declare type ChordEvent = any;
export declare type SectionEvent = any;
declare type IPlayer = any;
declare type IMediaSuperClass = any;
declare type IHeadless = any;
declare type IHTMLMediaElement = any;
declare type INnVideo = any;
declare type IYtVideo = any;
interface IMedia {
    SuperClass: IMediaSuperClass;
    Headless: IHeadless;
    HtMLMediaElement: IHTMLMediaElement;
    NnVideo: INnVideo;
    YtVideo: IYtVideo;
}
declare type ISuperClass = any;
declare type IBeat = any;
declare type IChord = any;
declare type IMelody = any;
declare type IChorus = any;
declare type IVariation = any;
declare type ISongleSync = any;
declare type ISongleWidget = any;
interface IPlugin {
    SuperClass: ISuperClass;
    Beat: IBeat;
    Chord: IChord;
    Melody: IMelody;
    Chorus: IChorus;
    Variation: IVariation;
    SongleSync: ISongleSync;
    SongleWidget: ISongleWidget;
}
declare type ISystem = any;
export interface ISongle {
    Player: IPlayer;
    Media: IMedia;
    Plugin: IPlugin;
    System: ISystem;
}
interface SongleWindow extends Window {
    Songle: ISongle;
    onSongleAPIReady: (Songle: ISongle) => void;
}
export declare const Songle: ISongle;
export declare const songle_window: SongleWindow;
export {};
