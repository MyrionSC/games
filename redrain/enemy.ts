import {Game} from './game';
import {AnimatedObject} from './AnimatedObject';

export class Enemy extends AnimatedObject {
	constructor (Canvas: HTMLElement, Ctx: CanvasRenderingContext2D, G: Game, 
				PosX: number) {
		super(Canvas, Ctx, G, "rgb(180, 0, 0)", PosX, -10, 15 + Math.random() * 10, (0.5 + Math.random() * 0.2) * Game.multiplier);
	}

	move () {
		this.posY += this.moveSpeed;
		if (this.posY > this.game.height) {
			this.game.loss();
		}
	}

	remove () {
		this.game.gameObjects.splice(this.game.gameObjects.indexOf(this), 1);
		this.game.enemies.splice(this.game.enemies.indexOf(this), 1);
	}
}