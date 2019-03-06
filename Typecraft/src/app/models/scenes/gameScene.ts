import {Player} from '../objects/player';
import {Enemy} from '../objects/enemy';

export class GameScene extends Phaser.Scene {
    private background: Phaser.GameObjects.Image;
    private player: Player;
    private enemy: Enemy;

    constructor() {
        super({
            key: 'GameScene'
        });
    }

    preload(): void {
        this.load.image('background', 'assets/background.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('enemy', 'assets/ZergZerglingPurple.png');
    }

    create(): void {
        // create background
        this.background = this.add.image(0, 0, 'background');
        this.background.setOrigin(0, 0);

        this.player = new Player({scene: this, x: 150, y: 300, key: 'player'});

        this.enemy = new Enemy({scene: this, x: 150, y: 30, key: 'enemy'});
    }

    update(): void {
        this.player.update();
        this.enemy.update();
    }
}
