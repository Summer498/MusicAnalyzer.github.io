import { IBar } from "./IBar";
import { IBeat } from "./IBeat";
import { IChord } from "./IChord";
import { IChorusSegment } from "./IChorusSegment";
import { INote } from "./INote";
import { IRepeatSegment } from "./IRepeatSegment";

export interface IScene {
    bars: IBar[];
    beats: IBeat[];
    chords: IChord[];
    chorusSegments: IChorusSegment[];
    notes: INote[];
    repeatSegments: IRepeatSegment[];
}
