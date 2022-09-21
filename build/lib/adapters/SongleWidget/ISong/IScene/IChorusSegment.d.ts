export interface IChorusSegment {
    duration: number;
    index: number;
    isChorus: number;
    repeats: {
        duration: number;
        index: number;
        start: number;
    }[];
}
