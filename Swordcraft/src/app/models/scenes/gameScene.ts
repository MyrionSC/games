import {Player} from '../objects/player';

export class GameScene extends Phaser.Scene {
    private background: Phaser.GameObjects.TileSprite;
    private player: Player;
    private counter = 1;

    private globals = {};

    private debug = true;
    private debugText: Phaser.GameObjects.Text;


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
    }

    create(): void {
        // create background
        this.background = this.add.tileSprite(Number(Number(this.game.config.width)) / 2, Number(this.game.config.height) / 2,
            Number(this.game.config.width), Number(this.game.config.height), 'background');

        this.player = new Player({scene: this, x: Number(this.game.config.width) / 2,
            y: Number(this.game.config.height) / 2, key: 'player'});

        // if (this.debug) {
        //     this.debugText = this.add.text(5, 5, this.getDebugText(),
        //         {fontSize: '12px', color: '#000000'});
        // }
    }

    update(): void {
        // scroll background
        // this.background.tilePositionY -= this.globals.backgroundScroll;

        this.player.update();

        if (this.debug) {
            if (this.game.input.mousePointer.isDown) {
                console.log("x: " + this.game.input.mousePointer.x);
                console.log("y: " + this.game.input.mousePointer.y);
            }
        }

        this.counter++;
    }

    // private getDebugText(): string {
        // return "clustersize: " + String(this.globals.enemyClusterSize) + "\nsomething";
    // }
}
