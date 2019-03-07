import {Player} from '../objects/player';
import {Enemy} from '../objects/enemy';

export class GameScene extends Phaser.Scene {
    private background: Phaser.GameObjects.TileSprite;
    private player: Player;
    private enemy: Enemy;

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
    }

    create(): void {
        // create background
        this.background = this.add.tileSprite(0, 0, 1800, 9000, 'background');

        this.player = new Player({scene: this, x: 150, y: 300, key: 'player'});
        this.enemy = new Enemy({scene: this, x: 150, y: 30, key: 'enemy'});
    }

    update(): void {
        // scroll background
        this.background.tilePositionY -= 1;

        this.player.update();
        this.enemy.update();
    }
}
