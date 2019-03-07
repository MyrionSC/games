import {Player} from '../objects/player';
import {Enemy} from '../objects/enemy';

export class GameScene extends Phaser.Scene {
    private background: Phaser.GameObjects.TileSprite;
    // private cursors: Phaser.Input.Keyboard.CursorKeys;
    private player: Player;
    private enemies: Array<Enemy>;

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
        console.log(Number(this.game.config.height));
        console.log(Number(this.game.config.width));
        console.log("-");

        // create background
        this.background = this.add.tileSprite(Number(Number(this.game.config.width)) / 2, Number(this.game.config.height) / 2,
            Number(this.game.config.width), Number(this.game.config.height), 'background');

        this.player = new Player({scene: this, x: Number(this.game.config.width) / 2,
            y: Number(this.game.config.height) - 120, key: 'player'});


        this.enemies = [];
        const enemy = new Enemy(this, {scene: this, x: Phaser.Math.Between(30, Number(this.game.config.width) - 30),
            y: -50, key: 'enemy'});
        this.enemies.push(enemy);

        // this.cursors = this.input.keyboard.createCursorKeys();

        this.input.keyboard.on('keydown', (event) => {
            console.log(event.key);
        });
    }

    update(): void {
        // scroll background
        this.background.tilePositionY -= 0.8;

        // this.player.update();
        for (const enemy of this.enemies) {
            enemy.update();
        }



        // for (const k of this.input.keyboard.keys) {
        //     console.log(k);
        // }

        // private handleInput(): void {
        //   if (this.cursors.right.isDown) {
        //     this.x += this.walkingSpeed;
        //     this.setFlipX(false);
        //   }
        //
        //   if (this.cursors.left.isDown) {
        //     this.x -= this.walkingSpeed;
        //     this.setFlipX(true);
        //   }
        //   if (this.cursors.up.isDown) {
        //     this.y -= this.walkingSpeed;
        //   }
        //   if (this.cursors.down.isDown) {
        //     this.y += this.walkingSpeed;
        //   }
        // }

        if (this.game.input.mousePointer.isDown) {
            console.log("x: " + this.game.input.mousePointer.x);
            console.log("y: " + this.game.input.mousePointer.y);
        }
    }
}
