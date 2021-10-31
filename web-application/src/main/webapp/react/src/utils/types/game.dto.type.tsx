export type Game = {
	guid: number;
	name: string;
	description: string;
	image: GameScreenshot;
}

type GameScreenshot = {
	original_url: string;
}