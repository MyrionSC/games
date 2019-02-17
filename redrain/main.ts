// import log = require('./log')
import {Player} from './player';
import {Projectile} from './projectile';
import {Enemy} from './Enemy';
import {Game} from './game';
import {AnimatedObject} from './AnimatedObject';

// init variables
var canvas = <HTMLCanvasElement> document.getElementById("canvas1");
var ctx = canvas.getContext("2d");

let game: Game = new Game(canvas, ctx);
game.keys = new Array<boolean>();
game.player = new Player(canvas, ctx, game.keys, game);
game.gameObjects.push(game.player);

// start animation
animate();

function animate () {
	window.requestAnimationFrame(animate);
	game.score++;
	if (game.score % 500 === 0) {
		Game.multiplier += 0.25;
	}

	let d: Date = new Date();
	tryShootProjectile(d, game.mouseX, game.mouseY);
	spawnEnemy(d);

	clear();
	collisionDetection();
	calculateMovement();
	draw();
}

function clear () {
	for (let obj of game.gameObjects) {
	    obj.clear();
	}
	game.clearScore();
}
function calculateMovement () {
	for (let obj of game.gameObjects) {
	    obj.move();
	}
}
function draw () {
	for (let obj of game.gameObjects) {
	    obj.draw();
	}
	game.drawScore();
}



function collisionDetection () {
	// if player hits an enemy, loss
	for (let e of game.enemies) {
		var p = game.player;
        var a = p.posX - e.posX;
        var b = p.posY - e.posY;
        var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        if (c < p.width + e.width) {
        	game.loss();
        }
	}

	// if projectile hits enemy, enemy disapears
	for (let p of game.projectiles) {
	    for (let e of game.enemies) {
	        var a = p.posX - e.posX;
	        var b = p.posY - e.posY;
	        var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
	        if (c < p.width + e.width) {
	        	e.remove();
	        }
	    }
	}
}

function spawnEnemy (d: Date): void {
	if (game.enemySpawnCooldown < d.getTime()) {
		game.enemySpawnCooldown = d.getTime() + game.enemySpawnDelay;
		let x = (Math.random() * (game.width - 20)) + 10;
		let enemy: Enemy = new Enemy(canvas, ctx, game, x);
		game.gameObjects.push(enemy);
		game.enemies.push(enemy);
	}
}
function tryShootProjectile (d: Date, mouseX: number, mouseY: number): void {
	if (game.mouseDown) {
		if (game.shotCooldown < d.getTime()) {
			game.shotCooldown = d.getTime() + game.shotDelay;
			shootProjectile(mouseX, mouseY);
		}
	}
}
function shootProjectile (mouseX: number, mouseY: number): void {
	let projectile: Projectile = new Projectile(canvas, ctx, game, game.player.posX, game.player.posY);

	let a = (mouseX - game.offsetX) - game.player.posX;
	let b = (mouseY - game.offsetY) - game.player.posY;
	let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

	let d = projectile.moveSpeed / c;

	projectile.moveX = a * d;
	projectile.moveY = b * d;

	game.gameObjects.push(projectile);
	game.projectiles.push(projectile);
}


// eventhandlers
window.onkeydown = function(e) {game.keys[e.keyCode]=true;}
window.onkeyup = function(e) {game.keys[e.keyCode]=false;}
window.onmousedown = function(e) {
	game.mouseDown = true;
}
window.onmouseup = function(e) {
	game.mouseDown = false;
}
window.onmousemove = function (e) {
	game.mouseX = e.clientX;
	game.mouseY = e.clientY;
}
