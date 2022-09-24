import { IMedia } from "./IMedia/IMedia.js";
import { PlayerBase } from "./IPlayer/IPlayer.js";
import { IPlugin } from "./IPlugin/IPlugin.js";
import { ISongleAPI } from "./IsongleAPI/ISongleAPI.js";
import { ISyncPlayer } from "./ISyncPlayer/ISyncPlayer.js";
import { ISystem } from "./ISystem/ISystem.js";


export type Event = any;
export type BeatEvent = any;
export type ChordEvent = any;
export type SectionEvent = any;



export interface ISongle {
	Media: IMedia,
	Player: PlayerBase,
	Plugin: IPlugin,
	SongleAPI: ISongleAPI,
	SyncPlayer: ISyncPlayer,
	System: ISystem,
}
