import { ISong } from "./ISong/ISong.js";

export interface ISongleWidget {
    // methods
    off: (i: any, n: any) => any;
    on: (i: any, n: any, o: any) => any;
    pause: (t: any) => any;
    play: (t: any) => any;
    remove: (t: any) => any;
    seekTo: (t: any, i: any) => any;
    seekToNextChorus: (t: any) => any;
    seekToNextRepeat: (t: any) => any;
    seekToPrevChorus: (t: any) => any;
    seekToPrevRepeat: (t: any) => any;
    serialize: () => any;
    setAllEventTimingOffset: (t: any) => any;
    stop: (t: any) => any;

    // fields
    beatEventPriority: number;
    beatEventTimingOffset: number;
    bpm: number;
    chordEventPriority: number;
    chordEventTimingOffset: number;
    chorusSegmentEventPriority: number;
    chorusSegmentEventTimingOffset: number;
    currentBeat: any;  //null
    currentChord: any;  //null
    currentChorus: any;  //null
    currentChorusSegment: any;  //null
    currentNote: any;  //null
    currentRepeat: any;  //null
    currentRepeatSegment: any;  //null
    dataset: Object;
    duration: Object;
    eventPollingInterval: number;
    isPaused: boolean;
    isPlaying: boolean;
    isPlayingChorus: boolean;
    isPlayingChorusSegment: boolean;
    isPlayingRepeat: boolean;
    isPlayingRepeatSegment: boolean;
    isSeeking: boolean;
    isStopped: boolean;
    loadedRatio: number;
    mode: string;
    noteEventPriority: number;
    noteEventTimingOffset: number;
    playedRatio: number;
    position: Object;
    repeatSegmentEventPriority: number;
    repeatSegmentEventTimingOffset: number;
    rootElement: any;  //div
    song: ISong;
    uuid: string;
    videoID: string;
    volume: number;
}
