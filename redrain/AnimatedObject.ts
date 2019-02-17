import {Game} from './game';

export class AnimatedObject {
	protected canvas: HTMLElement;
	protected ctx: CanvasRenderingContext2D;
	protected game: Game;
	protected id: number;

	protected fillStyle: string;
	posX: number;
	posY: number;
	width: number;
	moveSpeed: number;
	private static idCounter: number = 0;

	constructor(Canvas: HTMLElement, Ctx: CanvasRenderingContext2D, G: Game, FillStyle: string,
				PosX: number, PosY: number, Width: number, MoveSpeed: number) {
			this.canvas = Canvas;
			this.ctx = Ctx;
			this.game = G;
			this.fillStyle = FillStyle;
			this.posX = PosX;
			this.posY = PosY;
			this.width = Width;
			this.moveSpeed = MoveSpeed;
			this.id = AnimatedObject.idCounter++;
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.fillStyle = this.fillStyle;
		this.ctx.arc(this.posX, this.posY, this.width, 0, 2*Math.PI);
		this.ctx.fill();
	}

	clear(): void {
		this.ctx.clearRect(this.posX - this.width - 2, this.posY - this.width - 2, this.width*2 + 4, this.width*2 + 4);
	};
	move(): void {};
	remove(): void {};
}