import {Player} from '../objects/player';
import {Biter} from "../objects/enemies/biter";
import {Enemy} from "../objects/enemies/enemy";
import {Spitter} from "../objects/enemies/spitter";
import {Gople} from "../objects/enemies/gople";
import {Splatter} from "../objects/enemies/splatter";
import {SplatterPool} from "../objects/splatter-pool";
import {Sword} from "../objects/sword";

export class GameScene extends Phaser.Scene {
    private background: Phaser.GameObjects.TileSprite;
    private gameBounds: Phaser.Geom.Rectangle;

    // objects
    private player: Player;
    private players: Player[];
    private enemies: Enemy[];

    // tweakable vars
    private spawnTimer = 90;
    private spawnDecreaseMultiplier = 0.97;
    // private spawnPossibilities = ['biter'];
    // private spawnPossibilities = ['gople', 'gople', 'gople', 'biter', 'spitter'];
    private spawnPossibilities = ['splatter'];
    private enemyTypes = ['gople', 'biter', 'spitter', 'spitter-bullet', 'splatter'];

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
        this.load.image('player1', 'assets/Swordcraft/swordguy.png');
        this.load.image('sword', 'assets/Swordcraft/grandsword.png');
        this.load.image('gople', 'assets/Swordcraft/green_gople.png');
        this.load.image('splatter', 'assets/Swordcraft/splatter.png');
        this.load.image('splatter-pool', 'assets/Swordcraft/splatter_pool1.png');
        this.load.image('biter', 'assets/Swordcraft/biter.png');
        this.load.image('biter-attacking', 'assets/Swordcraft/biter_attacking.png');
        this.load.image('spitter', 'assets/Swordcraft/spitter.png');
        this.load.image('spitter-bullet', 'assets/Swordcraft/spitter.png');
    }

    create(): void {
        this.gameBounds = new Phaser.Geom.Rectangle(0, 0, this.game.config.width, this.game.config.height);

        // create background
        this.background = this.add.tileSprite(Number(Number(this.game.config.width)) / 2, Number(this.game.config.height) / 2,
            Number(this.game.config.width), Number(this.game.config.height), 'background');

        this.player = new Player(this, 500, 500);
        this.players = [this.player];
        this.enemies = [];

        // const pool = new SplatterPool(this, 200, 200);

        // this.enemies.push(new Splatter(this, 500, 200));
        // this.enemies.push(new Splatter(this, 300, 200));
        // this.enemies.push(new Splatter(this, 700, 200));
        // this.enemies.push(new Splatter(this, 400, 300));
        // this.enemies.push(new Splatter(this, 600, 300));

        this.input.keyboard.on('keydown', (event) => {
            if (!this.gameOver) {
                if (event.key === "q" || event.key === "0") {
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
            // updates
            this.player.update();
            for (const enemy of this.enemies) {
                if (!enemy.isDead) {
                    enemy.update();
                }
            }

            // Spawn new enemy
            if (this.counter > this.lastSpawn + this.spawnTimer) {
                let pos = [0, 0];
                const spawnDirection = Math.random();
                if (spawnDirection < 0.25) { // top
                    pos = [Math.random() * this.game.config.width, -50];
                } else if (spawnDirection < 0.5) { // right
                    pos = [this.game.config.width + 50, Math.random() * this.game.config.height];
                } else if (spawnDirection < 0.75) { // bottom
                    pos = [Math.random() * this.game.config.width, this.game.config.height + 50];
                } else { // left
                    pos = [-50, Math.random() * this.game.config.height];
                }

                const newEnemy = this.createEnemy(pos[0], pos[1]);
                this.enemies.push(newEnemy);

                this.spawnTimer = this.spawnTimer * this.spawnDecreaseMultiplier;
                if (this.spawnTimer < 30) {
                    this.spawnTimer = 30;
                }
                this.lastSpawn = this.counter;
            }

            // Remove enemies outside bounds
            if (this.counter % 6 === 0) {
                for (const enemy of this.enemies) {
                    if (enemy.liveCounter > 100 && !Phaser.Geom.Rectangle.Overlaps(this.gameBounds, enemy.physics.getBounds())) {
                        const index = this.enemies.findIndex(o => o === enemy);
                        if (index !== -1) {
                            this.enemies.splice(index, 1);
                            enemy.destroy();
                        }
                    }
                }
            }

            this.counter++;
            this.score += 1;
            this.scoreText.text = this.score + "";
        }
    }

    private handleCollisions(event: Phaser.Physics.Matter.Events.CollisionStartEvent,
                             bodyA: Phaser.Physics.Matter.Body, bodyB: Phaser.Physics.Matter.Body) {

        // console.log(bodyA);
        // console.log(bodyB);


        if (bodyA.gameObject == null || bodyB.gameObject == null) {
            // one is a sensor
            // return;
        }

        if (bodyA.isSensor) {

        }


        const typeA = bodyA.unit.type;
        const typeB = bodyB.unit.type;
        const types = [bodyA.unit.type, bodyB.unit.type];


        // console.log(types);

        if (types.includes('sword') && (this.enemyTypes.includes(typeA) || this.enemyTypes.includes(typeB))) {
            // sword / enemy collision
            const enemyBody = this.enemies.some(b => bodyA === b.physics.body) ? bodyA : bodyB;
            const index = this.enemies.findIndex((b: Biter) => b.physics.body === enemyBody);
            if (index === -1) return;
            const deadEnemy = this.enemies.splice(index, 1)[0];

            if (enemyBody.unit.type === 'splatter') {
                this.createSplatterPool(deadEnemy as Splatter, this.player.sword);
            } else {
                deadEnemy.isDead = true;
                enemyBody.gameObject.setTint(0x888888);
            }

            this.score += 100;
        } else if (this.enemyTypes.includes(typeA) && this.enemyTypes.includes(typeB)) {
            // enemy / enemy collision
            if (!bodyA.unit.isDead) {
                bodyA.unit.stun();
            }
            if (!bodyB.unit.isDead) {
                bodyB.unit.stun();
            }
        } else if ((typeA === 'player' || typeB === 'player') && (this.enemyTypes.includes(typeA) || this.enemyTypes.includes(typeB))) {
            // player / enemy collision
            const playerBody = bodyA === this.player.physics.body ? bodyA : bodyB;
            const enemyBody = bodyB === this.player.physics.body ? bodyA : bodyB;

            if (enemyBody.unit.type !== 'biter' || enemyBody.unit.isDead || !enemyBody.unit.isAttacking) {

                if (enemyBody.unit.type === 'splatter') {
                    const index = this.enemies.findIndex((b: Biter) => b.physics.body === enemyBody);
                    if (index === -1) return;
                    const deadSplatter = this.enemies.splice(index, 1)[0] as Splatter;

                    // splat all over player
                    this.createSplatterPool(deadSplatter);
                } else {
                    playerBody.unit.stun();
                    if (!enemyBody.unit.isDead) {
                        enemyBody.unit.stun();
                    }
                }
            } else {
                playerBody.unit.die();
                this.gameOver = true;
                const t = this.add.text(-200, -200,
                    "\t\tGAME OVER\nFinal score: " + this.score,
                    {fontSize: '48px', color: '#000000', textAlign: 'center'});
                t.setPosition(this.game.config.width / 2 - t.width / 2, this.game.config.height / 2 - t.height / 2);
            }
        }
    }

    private createEnemy(x: number, y: number) {
        const newEnemy = this.spawnPossibilities[Math.floor(Math.random() * this.spawnPossibilities.length)];

        if (newEnemy === 'gople') {
            return new Gople(this, x, y);
        } else if (newEnemy === 'biter') {
            return new Biter(this, x, y, this.players);
        } else if (newEnemy === 'spitter') {
            return new Spitter(this, x, y, this.players, this.enemies);
        } else if (newEnemy === 'splatter') {
            return new Splatter(this, x, y);
        }
    }

    private createSplatterPool(deadSplatter: Splatter, sword?: Sword) {
        const [x, y, moveVector] = [deadSplatter.physics.x, deadSplatter.physics.y, deadSplatter.moveVector.clone()];
        deadSplatter.destroy();
        
        const splatterPool = new SplatterPool(this, x, y);
        const splatterDirVector = (sword ? sword.getPerpendicularVector() : moveVector).normalize().scale(splatterPool.OFFSET);

        // rotate in splatter move direction
        const splatterDirAngleRad = Phaser.Math.Angle.Between(x, y, x + splatterDirVector.x, y + splatterDirVector.y);
        const splatterDirAngleDeg = (splatterDirAngleRad / (Math.PI * 2)) * 360;
        splatterPool.physics.setAngle(splatterDirAngleDeg);

        // move by offset
        splatterPool.physics.setPosition(x + splatterDirVector.x, y + splatterDirVector.y);

        this.enemies.push(splatterPool);
    }
}
