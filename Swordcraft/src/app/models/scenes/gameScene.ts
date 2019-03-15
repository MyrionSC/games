import {Player} from '../objects/player';
import {Sword} from "../objects/sword";

export class GameScene extends Phaser.Scene {
    private background: Phaser.GameObjects.TileSprite;
    private player: Player;
    private rock: any;

    private counter = 1;

    private globals = {};

    private debug = true;
    private debugText: Phaser.GameObjects.Text;
    private biter: Phaser.GameObjects.Image;


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
        // this.load.image('enemy', 'assets/Starcraft/Units/Zerg/ZergZerglingPurple.png');
    }

    create(): void {
        // create background
        this.background = this.add.tileSprite(Number(Number(this.game.config.width)) / 2, Number(this.game.config.height) / 2,
            Number(this.game.config.width), Number(this.game.config.height), 'background');

        const sword = new Sword({scene: this, x: Number(this.game.config.width) / 2,
            y: Number(this.game.config.height) / 2, key: 'sword'});
        this.player = new Player({scene: this, x: Number(this.game.config.width) / 2,
            y: Number(this.game.config.height) / 2, key: 'player'}, sword);

        this.biter = this.add.image(500, 200, 'biter');
        this.biter.setScale(0.15);



        // graphics.lineStyle(5, 0xFF00FF, 1.0);
        // graphics.beginPath();
        // graphics.moveTo(100, 100);
        // graphics.lineTo(200, 200);
        // graphics.closePath();
        // graphics.strokePath();



        this.rock = this.impact.add.image(400, 400, 'rock');
        this.rock.setScale(0.2);
        this.rock.setTypeA().setCheckAgainstB().setActiveCollision().setMaxVelocity(100);

        this.input.keyboard.on('keydown', (event) => {
            // my keyboard ghosts combination: UpArrow + LeftArrow + Space, which makes space as attack annoying
            if (event.key === "q") {
                this.player.startAttack();
            }
        });



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
