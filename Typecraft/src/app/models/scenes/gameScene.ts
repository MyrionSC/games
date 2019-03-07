import {Player} from '../objects/player';
import {Enemy} from '../objects/enemy';

export class GameScene extends Phaser.Scene {
    private background: Phaser.GameObjects.TileSprite;
    private player: Player;
    private enemy: Enemy;
    private gameConfig: any;

    constructor() {
        super({
            key: 'GameScene'
        });
    }

    preload(): void {
        // this.load.image('background', 'assets/background.png');
        this.load.image('background', 'assets/Background/grasstile.png');
        this.load.image('player', 'assets/Units/Terran/TerranMarineBlue.png');
        this.load.image('enemy', 'assets/Units/Zerg/ZergZerglingPurple.png');

        const url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/plugins/dist/rexbbcodetextplugin.min.js';
        this.load.plugin('rexbbcodetextplugin', url, true);
    }

    create(): void {
        console.log(Number(this.game.config.height));
        console.log(Number(this.game.config.width));
        console.log("-");

        // create background
        this.background = this.add.tileSprite(Number(Number(this.game.config.width)) / 2, Number(this.game.config.height) / 2,
            Number(this.game.config.width), Number(this.game.config.height), 'background');

        this.player = new Player({scene: this, x: Number(this.game.config.width) / 2,
            y: Number(this.game.config.height) - 120, key: 'player'});

        this.enemy = new Enemy(this, {scene: this, x: 150, y: 30, key: 'enemy'});
    }

    update(): void {
        // scroll background
        this.background.tilePositionY -= 0.8;

        // this.player.update();
        this.enemy.update();

        if (this.game.input.mousePointer.isDown) {
            console.log("x: " + this.game.input.mousePointer.x);
            console.log("y: " + this.game.input.mousePointer.y);
        }
    }
}
