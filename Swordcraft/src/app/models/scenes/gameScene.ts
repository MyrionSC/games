import {Player} from '../objects/player';
import {Sword} from "../objects/sword";
import {Biter} from "../objects/biter";

export class GameScene extends Phaser.Scene {
    private background: Phaser.GameObjects.TileSprite;
    private player: Player;
    private biter: Biter;

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

        this.player = new Player(this, 500, 500);
        this.biter = new Biter(this, 300, 300);

        this.input.keyboard.on('keydown', (event) => {
            // my keyboard ghosts combination: UpArrow + LeftArrow + Space, which makes space as attack annoying
            if (event.key === "q") {
                this.player.startAttack();
            }
        });

        const blockA: Phaser.Physics.Impact.ImpactImage = this.impact.add.image(300, 600, 'rock');
        const blockB: Phaser.Physics.Impact.ImpactImage = this.impact.add.image(730, 400, 'rock');
        blockA.setBodyScale(0.2);
        blockB.setBodyScale(0.2);

        blockA.setTypeA();
        blockA.setCheckAgainstA();
        blockA.setActiveCollision();
        blockA.setMaxVelocity(300);
        blockB.setTypeA();
        blockB.setCheckAgainstA();
        blockB.setActiveCollision();

        // blockA.setVelocityX(100);
        // blockA.setAccelerationX(10);
        // blockA.setFriction(200, 200);

        //  The callback will be sent the arguments: bodyA (which is the body of blockA in this case), the other body it hits and the axis
        blockA.setCollideCallback(this.collide, this);

        // if (this.debug) {
        //     this.debugText = this.add.text(5, 5, this.getDebugText(),
        //         {fontSize: '12px', color: '#000000'});
        // }
    }

    collide(bodyA, bodyB, axis) {
        bodyB.gameObject.tint = 0xff0000;
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
