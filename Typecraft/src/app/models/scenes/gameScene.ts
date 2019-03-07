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
        this.load.image('player', 'assets/player.png');
        this.load.image('enemy', 'assets/ZergZerglingPurple.png');

        this.gameConfig = {
            gameWindowWidth: 480,
            gameWindowHeight: 720
        };
    }

    create(): void {
        // create background
        this.background = this.add.tileSprite(this.gameConfig.gameWindowWidth / 2, this.gameConfig.gameWindowHeight / 2,
            this.gameConfig.gameWindowWidth, this.gameConfig.gameWindowHeight, 'background');

        this.player = new Player({scene: this, x: this.gameConfig.gameWindowWidth / 2,
            y: this.gameConfig.gameWindowHeight - 200, key: 'player'});
        // this.enemy = new Enemy({scene: this, x: 150, y: 30, key: 'enemy'});
    }

    update(): void {
        // scroll background
        this.background.tilePositionY -= 0.8;

        // this.player.update();
        // this.enemy.update();

        if (this.game.input.mousePointer.isDown) {
            console.log("x: " + this.game.input.mousePointer.x);
            console.log("y: " + this.game.input.mousePointer.y);
        }
    }
}
