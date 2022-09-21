export type Event = any;
export type BeatEvent = any;
export type ChordEvent = any;
export type SectionEvent = any;

type IPlayer = any;
/*
type IPlayerArgs
	= { accessToken: string | null }
	| { secretToken: string | null }
	| { mediaElement: HTMLElement | string | null };
interface IPlayer{
	new (args: IPlayerArgs):IPlayer
		
	// Constants
	// Static constant variables of this class
	MinVolume: number
	MaxVolume: number

	
	// Properties (Getter/Setter)
	// Properties of this class instance
	accessToken: string
	secretToken: string
	mediaElement: HTMLElement | string
	volume: number	

	// Properties (Getter)
	// Get only properties of this class instance
	media: Songle.Media.SuperClass
	musicMap: any
	isReady: boolean
	isPlaying: boolean
	isPaused: boolean
	isSeeking: boolean
	duration: number
	position: number
}
*/

type IMediaSuperClass = any;
type IHeadless = any;
type IHTMLMediaElement = any;
type INnVideo = any;
type IYtVideo = any;
interface IMedia {
	SuperClass: IMediaSuperClass,
	Headless: IHeadless,
	HtMLMediaElement: IHTMLMediaElement,
	NnVideo: INnVideo,
	YtVideo: IYtVideo,
}

type ISuperClass = any;
type IBeat = any;
type IChord = any;
type IMelody = any;
type IChorus = any;
type IVariation = any;
type ISongleSync = any;
type ISongleWidget = any;

interface IPlugin {
	SuperClass: ISuperClass,
	Beat: IBeat,
	Chord: IChord,
	Melody: IMelody,
	Chorus: IChorus,
	Variation: IVariation,
	SongleSync: ISongleSync,
	SongleWidget: ISongleWidget,
}

type ISystem = any;

export interface ISongle {
	Player: IPlayer,
	Media: IMedia,
	Plugin: IPlugin,
	System: ISystem,
}



interface SongleWindow extends Window {
	Songle: ISongle;
	onSongleAPIReady: (Songle: ISongle) => void;
}
declare const globalThis: SongleWindow;
if (globalThis.Songle === undefined) { throw ReferenceError('Songle API を HTML からインポートする必要があります. HTML ファイル内に, "<script src="https://api.songle.jp/v2/api.js"></script>" と記述してください.'); }
export const Songle = globalThis.Songle;  // eslint-disable-line no-undef

export const songle_window = globalThis;
