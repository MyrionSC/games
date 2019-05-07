import {Player} from '../objects/player';
import {Biter} from "../objects/enemies/biter";
import {Enemy} from "../objects/enemies/enemy";
import {Spitter} from "../objects/enemies/spitter";
import {Gople} from "../objects/enemies/gople";

export class CoopScene extends Phaser.Scene {
    private background: Phaser.GameObjects.TileSprite;
    private gameBounds: Phaser.Geom.Rectangle;

    // objects
    private player1: Player;
    private player2: Player;
    private players: Player[];
    private enemies: Enemy[];

    // tweakable vars
    private spawnTimer = 90;
    private spawnDecreaseMultiplier = 0.97;
    // private spawnPossibilities = ['biter'];
    private spawnPossibilities = ['gople', 'gople', 'gople', 'biter', 'spitter'];
    private enemyTypes = ['gople', 'biter', 'spitter', 'spitter-bullet'];

    // non tweakable
    private counter = 1;
    private lastSpawn = 0;
    private score = 0;
    private scoreText: Phaser.GameObjects.Text;

    private gameOver = false;

    constructor() {
        super({
            key: 'CoopScene'
        });
    }

    preload(): void {
        this.load.image('background', 'assets/Background/grasstile.png');
        this.load.image('player1', 'assets/Swordcraft/swordguy.png');
        this.load.image('player2', 'assets/Swordcraft/swordguy_blue.png');
        this.load.image('sword', 'assets/Swordcraft/grandsword.png');
        this.load.image('gople', 'assets/Swordcraft/green_gople.png');
        this.load.image('biter', 'assets/Swordcraft/biter.png');
        this.load.image('biter-attacking', 'assets/Swordcraft/biter_attacking.png');
        this.load.image('spitter', 'assets/Swordcraft/spitter.png');
        this.load.image('spitter-bullet', 'assets/Swordcraft/spitter.png');
    }

    create(): void {
        this.gameBounds = new Phaser.Geom.Rectangle(0, 0, this.game.config.width, this.game.config.height);
        this.background = this.add.tileSprite(Number(Number(this.game.config.width)) / 2, Number(this.game.config.height) / 2,
            Number(this.game.config.width), Number(this.game.config.height), 'background');

        this.player1 = new Player(this, 300, 500, 'player1');
        this.player2 = new Player(this, 700, 500, 'player2');
        this.players = [this.player1, this.player2];
        this.enemies = [];

        this.input.keyboard.on('keydown', (event) => {
            if (!this.gameOver) {
                if (event.key === "0") {
                    if (!this.player1.isAttacking) {
                        this.player1.startAttack();
                    }
                }
                if (event.key === 'f' || event.key === 'Control' || event.key === 'Shift') {
                    if (!this.player2.isAttacking) {
                        this.player2.startAttack();
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
            for (const p of this.players) {
                if (!p.isDead) {
                    p.update();
                }
            }

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
        const typeA = bodyA.unit.type;
        const typeB = bodyB.unit.type;
        const types = [bodyA.unit.type, bodyB.unit.type];

        // sword / enemy collision
        if (types.includes('sword')) {
            const enemyBody = this.enemies.some(b => bodyA === b.physics.body) ? bodyA : bodyB;
            const index = this.enemies.findIndex((b: Biter) => b.physics.body === enemyBody);
            if (index === -1) return;
            const deadEnemy = this.enemies.splice(index, 1)[0];
            deadEnemy.die();
            this.score += 100;
        } else if (this.enemyTypes.includes(typeA) && this.enemyTypes.includes(typeB)) {
            // enemy / enemy collision
            bodyA.unit.stun();
            bodyB.unit.stun();
        } else if ((typeA === 'player' || typeB === 'player') && (this.enemyTypes.includes(typeA) || this.enemyTypes.includes(typeB))) {
            // player / enemy collision
            const player = typeA === 'player' ? bodyA : bodyB;
            const enemy = typeB === 'player' ? bodyA : bodyB;

            if (enemy.unit.type !== 'biter') {
                player.unit.stun();
                enemy.unit.stun();
            } else {
                player.unit.die();
                if (this.players.every(p => p.isDead)) {
                    this.gameOver = true;
                    const t = this.add.text(-200, -200,
                        "\t\tGAME OVER\nFinal score: " + this.score,
                        {fontSize: '48px', color: '#000000', textAlign: 'center'});
                    t.setPosition(this.game.config.width / 2 - t.width / 2, this.game.config.height / 2 - t.height / 2);
                }
            }
        } else {
            console.log("Collision: No action taken");
            console.log(types);
        }
    }

    private createEnemy(x: number, y: number) {
        const newEnemy = this.spawnPossibilities[Math.floor(Math.random() * this.spawnPossibilities.length)];

        // could also pack refs into single object so signature for all enemies is the same
        if (newEnemy === 'gople') {
            return new Gople(this, x, y);
        } else if (newEnemy === 'biter') {
            return new Biter(this, x, y, this.players);
        } else if (newEnemy === 'spitter') {
            return new Spitter(this, x, y, this.players, this.enemies);
        }
    }
}
