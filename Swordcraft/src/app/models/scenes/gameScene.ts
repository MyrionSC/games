import {Player} from '../objects/player';
import {Biter} from "../objects/biter";

export class GameScene extends Phaser.Scene {
    private background: Phaser.GameObjects.TileSprite;
    private player: Player;
    private biter: Biter;

    private counter = 1;

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
    }

    create(): void {
        // create background
        this.background = this.add.tileSprite(Number(Number(this.game.config.width)) / 2, Number(this.game.config.height) / 2,
            Number(this.game.config.width), Number(this.game.config.height), 'background');

        this.matter.world.setBounds();

        this.player = new Player(this, 500, 500);

        this.biter = new Biter(this, 300, 100);
        this.biter.physics.setVelocityY(10);

        for (let i = 0; i < 4; i++) {
            const b1 = new Biter(this, 400 + i * 30, 100);
            const b2 = new Biter(this, 400 + i * 30, 150);
            const b3 = new Biter(this, 400 + i * 30, 200);
        }

        this.input.keyboard.on('keydown', (event) => {
            // my keyboard ghosts combination: UpArrow + LeftArrow + Space, which makes space as attack annoying
            if (event.key === "q") {
                if (!this.player.isAttacking) {
                    this.player.startAttack();
                }
            }
            if (event.key === "e") {
                // swing the other way
            }
        });


        // if (this.debug) {
        //     this.debugText = this.add.text(5, 5, this.getDebugText(),
        //         {fontSize: '12px', color: '#000000'});
        // }
    }

    update(): void {
        this.player.update();

        // if (this.debug) {
        //     if (this.game.input.mousePointer.isDown) {
        //         console.log("x: " + this.game.input.mousePointer.x);
        //         console.log("y: " + this.game.input.mousePointer.y);
        //     }
        // }

        // if (this.debug) {
        //     this.debugText.text = this.getDebugText();
        // }

        this.counter++;
    }

    private getDebugText(): string {
        if (this.player.sword) {
            return this.player.sword.physics.body.angularVelocity + "\n" +
                // @ts-ignore
                this.player.sword.physics.body.torque + "\n" +
                // @ts-ignore
                this.player.sword.physics.body.angularSpeed + "\n" + ""
                ;
        }
        // return "clustersize: " + String(this.globals.enemyClusterSize) + "\nsomething";
    }
}
