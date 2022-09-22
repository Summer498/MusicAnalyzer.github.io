import { ISong } from "./ISong/ISong.js";
import { IDataset } from "./IDataset.js";
import { IPosition } from "./ITime/IPosition.js";
import { IDuration } from "./ITime/IDuration.js";
import { ICurrentBeat } from "./ISong/IScene/IBeat.js";
import { IChord } from "./ISong/IScene/IChord.js";
import { ISegment } from "./ISong/IScene/ISegment.js";
import { INote } from "./ISong/IScene/INote.js";
import { IRepeat } from "./ISong/IScene/IRepeat.js";

type IChorus = any;

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
    get beatEventPriority(): number;
    set beatEventPriority(e: number);
    get beatEventTimingOffset(): number;
    set beatEventTimingOffset(e: number);
    get bpm(): number;
    get chordEventPriority(): number;
    set chordEventPriority(e: number);
    get chordEventTimingOffset(): number;
    set chordEventTimingOffset(e: number);
    get chorusSegmentEventPriority(): number;
    set chorusSegmentEventPriority(e: number);
    get chorusSegmentEventTimingOffset(): number;
    set chorusSegmentEventTimingOffset(e: number);
    get currentBeat(): ICurrentBeat;
    get currentChord(): IChord;
    get currentChorus(): IChorus;
    get currentChorusSegment(): ISegment;
    get currentNote(): INote;
    get currentRepeat(): {
        repeat: IRepeat,
        segment: ISegment,
    };
    get currentRepeatSegment(): {
        repeat: IRepeat,
        segment: ISegment,
    };
    get dataset(): IDataset;
    get duration(): IDuration;
    get eventPollingInterval(): number;
    set eventPollingInterval(e: number);
    get isPaused(): boolean;
    get isPlaying(): boolean;
    get isPlayingChorus(): boolean;
    get isPlayingChorusSegment(): boolean;
    get isPlayingRepeat(): boolean;
    get isPlayingRepeatSegment(): boolean;
    get isSeeking(): boolean;
    get isStopped(): boolean;
    get loadedRatio(): number;
    get mode(): string;
    get noteEventPriority(): number;
    set noteEventPriority(e: number);
    get noteEventTimingOffset(): number;
    set noteEventTimingOffset(e: number);
    get playedRatio(): number;
    get position(): IPosition;
    get repeatSegmentEventPriority(): number;
    set repeatSegmentEventPriority(e: number);
    get repeatSegmentEventTimingOffset(): number;
    set repeatSegmentEventTimingOffset(e: number);
    get rootElement(): HTMLElement | undefined;
    get song(): ISong;
    get uuid(): string;
    get videoID(): string;
    get volume(): number;
    set volume(e: number);
}
