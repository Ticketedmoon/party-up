export type Game = {
	id: number;
	name: string;
	summary: string;
	screenshots: GameScreenshot[]
}

type GameScreenshot = {
	id: number,
	game: number,
	url: string,
	height: number,
	width: number
}