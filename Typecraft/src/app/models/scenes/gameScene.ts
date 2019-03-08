import {Player} from '../objects/player';
import {Enemy} from '../objects/enemy';
import {Words} from "../objects/words";

export class GameScene extends Phaser.Scene {
    private background: Phaser.GameObjects.TileSprite;
    private player: Player;
    private enemies: Array<Enemy>;
    private counter = 1;
    private target: Enemy;
    private words: Words;

    private enemyClusterSize = 2;

    private debug = true;
    private debugText: Phaser.GameObjects.BitmapText;


    constructor() {
        super({
            key: 'GameScene'
        });
    }

    preload(): void {
        // this.load.image('background', 'assets/background.png');
        this.load.image('background', 'assets/Background/grasstile.png');
        this.load.image('player', 'assets/Units/Terran/TerranMarineBlue2.png');
        this.load.image('enemy', 'assets/Units/Zerg/ZergZerglingPurple.png');

        const url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/plugins/dist/rexbbcodetextplugin.min.js';
        this.load.plugin('rexbbcodetextplugin', url, true);
    }

    create(): void {
        // create background
        this.background = this.add.tileSprite(Number(Number(this.game.config.width)) / 2, Number(this.game.config.height) / 2,
            Number(this.game.config.width), Number(this.game.config.height), 'background');

        this.player = new Player({scene: this, x: Number(this.game.config.width) / 2,
            y: Number(this.game.config.height) - 120, key: 'player'});

        this.words = new Words();
        this.enemies = [];

        this.input.keyboard.on('keydown', (event) => {
            if (this.target) {
                const isDead = this.target.tryDamage(event.key);
                if (isDead) {
                    this.target.death();
                    this.enemies.splice(this.enemies.indexOf(this.target), 1);
                    this.target = null;
                }
            } else {
                for (const e of this.enemies) {
                    if (e.nextLetter === event.key) {
                        this.target = e;
                        this.target.tryDamage(event.key);
                        break;
                    }
                }
            }
        });

        if (this.debug) {
            this.add.text(5, 5, this.getDebugText(),
                {fontSize: '12px', color: '#000000'});
        }
    }

    update(): void {
        // scroll background
        this.background.tilePositionY -= 0.6;

        // this.player.update();
        for (const enemy of this.enemies) {
            enemy.update();
        }

        if (this.counter % 300 === 0) {
            for (let i = 0; i < this.enemyClusterSize; i++) {
                this.enemies.push(new Enemy(this.words.getWord(), {scene: this, x: Phaser.Math.Between(30,
                        Number(this.game.config.width) - 30), y: -50 - 30 * i, key: 'enemy'}));
            }
        }

        if (this.debug) {
            if (this.game.input.mousePointer.isDown) {
                console.log("x: " + this.game.input.mousePointer.x);
                console.log("y: " + this.game.input.mousePointer.y);
            }
        }

        this.counter++;
    }

    private getDebugText(): string {
        return "clustersize: " + String(this.enemyClusterSize) + "\nsomething";
    }
}
