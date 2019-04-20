import {Player} from '../objects/player';
import {Biter} from "../objects/biter";
import {Enemy} from "../objects/enemy";
import {Spitter} from "../objects/spitter";

export class GameScene extends Phaser.Scene {
    private background: Phaser.GameObjects.TileSprite;
    private gameBounds: Phaser.Geom.Rectangle;

    // objects
    private player: Player;
    private enemies: Enemy[];
    private deadFuckers: any[];

    // tweakable vars
    private spawnTimer = 100;
    private spawnDecreaseMultiplier = 0.97;
    private spawnPossibilities: any = [Biter, Biter, Spitter];

    // non tweakable
    private counter = 1;
    private lastSpawn = 0;
    private score = 0;
    private scoreText: Phaser.GameObjects.Text;

    private gameOver = false;

    constructor() {
        super({
            key: 'GameScene'
        });
    }

    preload(): void {
        this.load.image('background', 'assets/Background/grasstile.png');
        this.load.image('player', 'assets/Swordcraft/swordguy.png');
        this.load.image('sword', 'assets/Swordcraft/grandsword.png');
        this.load.image('biter', 'assets/Swordcraft/biter.png');
        this.load.image('spitter', 'assets/Swordcraft/spitter.png');
    }

    create(): void {
        this.gameBounds = new Phaser.Geom.Rectangle(0, 0, this.game.config.width, this.game.config.height);

        // create background
        this.background = this.add.tileSprite(Number(Number(this.game.config.width)) / 2, Number(this.game.config.height) / 2,
            Number(this.game.config.width), Number(this.game.config.height), 'background');

        this.player = new Player(this, 500, 500);
        this.enemies = [];
        this.deadFuckers = [];

        this.input.keyboard.on('keydown', (event) => {
            if (!this.gameOver) {
                if (event.key === "q") {
                    if (!this.player.isAttacking) {
                        this.player.startAttack();
                    }
                }
            }
        });

        this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            this.handleCollisions(event, bodyA, bodyB);
        });


        this.scoreText = this.add.text(10, 10, this.scoreText + "",
            {fontSize: '18px', color: '#222222'});
    }

    update(): void {
        if (!this.gameOver) {
            this.player.update();

            for (const enemy of this.enemies) {
                enemy.update();
            }

            if (this.counter > this.lastSpawn + this.spawnTimer) {
                const randomEnemy = this.spawnPossibilities[Math.floor(Math.random() * this.spawnPossibilities.length)];

                const spawnDirection = Math.random();
                if (spawnDirection < 0.25) { // top
                    this.enemies.push(new randomEnemy(this, Math.random() * this.game.config.width, -50, this.player));
                } else if (spawnDirection < 0.5) { // right
                    this.enemies.push(new randomEnemy(this, this.game.config.width + 50,
                        Math.random() * this.game.config.height, this.player));
                } else if (spawnDirection < 0.75) { // bottom
                    this.enemies.push(new randomEnemy(this, Math.random() * this.game.config.width,
                        this.game.config.height + 50, this.player));
                } else { // left
                    this.enemies.push(new randomEnemy(this, -50, Math.random() * this.game.config.height, this.player));
                }

                this.spawnTimer = this.spawnTimer * this.spawnDecreaseMultiplier;
                if (this.spawnTimer < 20) {
                    this.spawnTimer = 20;
                }
                this.lastSpawn = this.counter;
            }

            // Remove dead guys outside bounds
            if (this.counter % 10 === 0) {
                for (const deadguy of this.deadFuckers) {
                    if (!Phaser.Geom.Rectangle.Overlaps(this.gameBounds, deadguy.physics.getBounds())) {
                        const index = this.deadFuckers.findIndex(o => o === deadguy);
                        if (index !== -1) {
                            this.deadFuckers.splice(index, 1);
                            deadguy.destroy();
                        }
                    }
                }
            }

            this.counter++;
            this.score += 1;
            this.scoreText.text = this.score + "";
        }
    }

    private handleCollisions(event: any, bodyA: any, bodyB: any) {
        // sword / enemy collision
        if (this.player.sword &&
            (bodyA === this.player.sword.physics.body || bodyB === this.player.sword.physics.body) &&
            (this.enemies.some(b => bodyA === b.physics.body)  || this.enemies.some(b => bodyB === b.physics.body))) {
            const sword = bodyA === this.player.sword.physics.body ? bodyA : bodyB;
            const enemyBody = this.enemies.some(b => bodyA === b.physics.body) ? bodyA : bodyB;
            const index = this.enemies.findIndex((b: Biter) => b.physics.body === enemyBody);
            const deadEnemy = this.enemies.splice(index, 1)[0];
            this.deadFuckers.push(deadEnemy);
            enemyBody.gameObject.setTint(0x888888);
            this.score += 100;
        }

        // player / biter collision
        if ((bodyA === this.player.physics.body || bodyB === this.player.physics.body) &&
            (this.enemies.some(b => bodyA === b.physics.body)  || this.enemies.some(b => bodyB === b.physics.body))) {
            const player = bodyA === this.player.physics.body ? bodyA : bodyB;
            const biter = this.enemies.some(b => bodyA === b.physics.body) ? bodyA : bodyB;
            console.log("player biter coll");
            player.gameObject.setTint(0x888888);

            this.gameOver = true;
            const t = this.add.text(- 200, -200,
                "\t\tGAME OVER\nFinal score: " + this.score,
                {fontSize: '48px', color: '#000000', textAlign: 'center'});
            t.setPosition(this.game.config.width / 2 - t.width / 2, this.game.config.height / 2 - t.height / 2);
        }
    }
}
