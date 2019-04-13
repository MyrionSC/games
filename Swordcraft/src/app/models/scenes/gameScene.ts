import {Player} from '../objects/player';
import {Biter} from "../objects/biter";

export class GameScene extends Phaser.Scene {
    private background: Phaser.GameObjects.TileSprite;
    private player: Player;
    private biters: Biter[];

    // tweakable vars
    private spawnTimer = 100;
    private spawnDecreaseMultiplier = 0.97;

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
        this.load.image('rock', 'assets/Placeholders/rock.png');
        this.load.image('biter', 'assets/Swordcraft/biter.png');
    }

    create(): void {
        // create background
        this.background = this.add.tileSprite(Number(Number(this.game.config.width)) / 2, Number(this.game.config.height) / 2,
            Number(this.game.config.width), Number(this.game.config.height), 'background');

        this.player = new Player(this, 500, 500);

        this.biters = [];

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

            for (const biter of this.biters) {
                biter.update(this.player);
            }

            if (this.counter > this.lastSpawn + this.spawnTimer) {
                const spawnDirection = Math.random();
                if (spawnDirection < 0.25) { // top
                    this.biters.push(new Biter(this, Math.random() * this.game.config.width, -50));
                } else if (spawnDirection < 0.5) { // right
                    this.biters.push(new Biter(this, this.game.config.width + 50, Math.random() * this.game.config.height));
                } else if (spawnDirection < 0.75) { // bottom
                    this.biters.push(new Biter(this, Math.random() * this.game.config.width, this.game.config.height + 50));
                } else { // left
                    this.biters.push(new Biter(this, -50, Math.random() * this.game.config.height));
                }

                this.spawnTimer = this.spawnTimer * this.spawnDecreaseMultiplier;
                if (this.spawnTimer < 20) {
                    this.spawnTimer = 20;
                }
                this.lastSpawn = this.counter;
            }

            this.counter++;
            this.score += 1;
            this.scoreText.text = this.score + "";
        }
    }

    private handleCollisions(event: any, bodyA: any, bodyB: any) {
        // sword / biter collision
        if (this.player.sword &&
            (bodyA === this.player.sword.physics.body || bodyB === this.player.sword.physics.body) &&
            (this.biters.some(b => bodyA === b.physics.body)  || this.biters.some(b => bodyB === b.physics.body))) {
            const sword = bodyA === this.player.sword.physics.body ? bodyA : bodyB;
            const biterBody = this.biters.some(b => bodyA === b.physics.body) ? bodyA : bodyB;
            const index = this.biters.findIndex((b: Biter) => b.physics.body === biterBody);
            this.biters.splice(index, 1);
            biterBody.gameObject.setTint(0x888888);
            this.score += 100;
        }

        // player / biter collision
        if ((bodyA === this.player.physics.body || bodyB === this.player.physics.body) &&
            (this.biters.some(b => bodyA === b.physics.body)  || this.biters.some(b => bodyB === b.physics.body))) {
            const player = bodyA === this.player.physics.body ? bodyA : bodyB;
            const biter = this.biters.some(b => bodyA === b.physics.body) ? bodyA : bodyB;
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
