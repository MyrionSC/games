import {Player} from '../objects/player';
import {Enemy} from '../objects/enemy';

export class GameScene extends Phaser.Scene {
    private background: Phaser.GameObjects.TileSprite;
    private player: Player;
    private enemies: Array<Enemy>;
    private counter = 0;
    private debug = false;
    private target: Enemy;

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

        this.enemies = [new Enemy({scene: this, x: Phaser.Math.Between(30, Number(this.game.config.width) - 30),
            y: -50, key: 'enemy'})];

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
    }

    update(): void {
        // scroll background
        this.background.tilePositionY -= 0.6;

        // this.player.update();
        for (const enemy of this.enemies) {
            enemy.update();
        }

        if (this.counter % 500 === 0) {
            const enemy = new Enemy({scene: this, x: Phaser.Math.Between(30, Number(this.game.config.width) - 30),
                y: -50, key: 'enemy'});
            this.enemies.push(enemy);
        }

        if (this.debug === true) {
            if (this.game.input.mousePointer.isDown) {
                console.log("x: " + this.game.input.mousePointer.x);
                console.log("y: " + this.game.input.mousePointer.y);
            }
        }

        this.counter++;
    }
}
