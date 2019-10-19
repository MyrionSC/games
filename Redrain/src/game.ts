import {AnimatedObject} from './AnimatedObject';
import {Projectile} from './projectile';
import {Enemy} from './enemy';
import {Player} from './player';

export class Game {
	private canvas: HTMLElement;
	private ctx: CanvasRenderingContext2D;
	keys: Array<boolean>;

	width: number = 500;
	height: number = 500;
	offsetX: number = 208;
	offsetY: number = 58;

	mouseDown: boolean = false;
	mouseX: number = 0;
	mouseY: number = 0;
	shotDelay: number = 100; // ms
	shotCooldown: number = 0;

	enemySpawnDelay: number = 50;
	enemySpawnCooldown: number = 0;

	static multiplier = 2;
	score = 0;

	gameObjects: Array<AnimatedObject> = new Array<AnimatedObject>();
	projectiles: Array<Projectile> = new Array<Projectile>();
	enemies: Array<Enemy> = new Array<Enemy>();
	player: Player;

	constructor (Canvas: HTMLElement, Ctx: CanvasRenderingContext2D) {
		this.canvas = Canvas;
		this.ctx = Ctx;
	}

	loss (): void {
		this.gameObjects = new Array<AnimatedObject>();
		this.projectiles = new Array<Projectile>();
		this.enemies = new Array<Enemy>();
		this.player.posX = 250;
		this.player.posY = 400;
		this.gameObjects.push(this.player);

		this.ctx.clearRect(0, 0, this.width, this.height);
		alert("you have lost the game. Your final score was " + this.score);
		Game.multiplier = 1;
		this.score = 0;
	}

	drawScore (): void {
		this.ctx.font = "30px Arial";
		this.ctx.fillStyle = "rgb(0,0,0)";
		this.ctx.fillText(this.score.toString(), 425, 50);
	}
	clearScore (): void {
		this.ctx.clearRect(425, 20, 100, 50);
	}
}