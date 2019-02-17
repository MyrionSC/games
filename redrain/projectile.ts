import {Game} from './game';
import {AnimatedObject} from './AnimatedObject';

export class Projectile extends AnimatedObject {
	moveX: number;
	moveY: number;

	constructor (Canvas: HTMLElement, Ctx: CanvasRenderingContext2D, G: Game, 
				PosX: number, PosY: number) {
		super(Canvas, Ctx, G, "rgb(0,0,0)", PosX, PosY, 5, 9);
	}

	move () {
		this.posX += this.moveX;
		this.posY += this.moveY;

		if (this.posX < 0 || this.posX > this.game.width || this.posY < 0 || this.posY > this.game.height) {
			this.game.gameObjects.splice(this.game.gameObjects.indexOf(this), 1);
			this.game.projectiles.splice(this.game.projectiles.indexOf(this), 1);
		}
	}
}