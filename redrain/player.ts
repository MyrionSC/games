import {Game} from './game';
import {AnimatedObject} from './AnimatedObject';

export class Player extends AnimatedObject {
	private keys: Array<boolean>;

	constructor (Canvas: HTMLElement, Ctx: CanvasRenderingContext2D, Keys: Array<boolean>, G: Game) {
		super(Canvas, Ctx, G, "rgb(0, 107, 17)", 250, 400, 10, 6);
		this.keys = Keys;
	}

	move () {
		if (this.keys[38] === true || this.keys[87] === true) { // up | w
			if (this.posY > this.width) {
				this.posY += -this.moveSpeed;
			}
		}
		if (this.keys[39] === true || this.keys[68] === true) { // right | d
			if (this.posX < this.game.width - this.width) {
				this.posX += this.moveSpeed;
			}
		}
		if (this.keys[40] === true || this.keys[83] === true) { // down | s
			if (this.posY < this.game.height - this.width) {
				this.posY += this.moveSpeed;
			}
		}
		if (this.keys[37] === true || this.keys[65] === true) { // left | a
			if (this.posX > this.width) {
				this.posX += -this.moveSpeed;
			}			
		}
	}
}