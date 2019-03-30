import {Player} from '../objects/player';
import {Biter} from "../objects/biter";
import {Sword} from "../objects/sword";

export class GameScene extends Phaser.Scene {
    private background: Phaser.GameObjects.TileSprite;
    private player: Player;
    private biter: Biter;
    private sword: Sword;

    private counter = 1;

    private globals = {};

    private debug = true;
    private debugText: Phaser.GameObjects.Text;

    // https://labs.phaser.io/index.html?dir=physics/matterjs/&q=

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
        this.sword = new Sword(this, 600, 500, null);

        const group = this.matter.world.nextGroup(true);
        this.player.physics.setCollisionGroup(group);
        this.sword.physics.setCollisionGroup(group);

        this.matter.add.constraint(this.player.physics, this.sword.physics, 100, 0);



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
                this.sword.physics.setAngularVelocity(this.sword.physics.body.angularVelocity - 0.1);
                // this.sword.physics.body.acceleration = new Phaser.Math.Vector2(200, 200);
                // this.sword.physics.body.setAcceleration(0, 2);
                // this.sword.physics.setVelocity(0, -2);
            }
            if (event.key === "e") {
                this.sword.physics.setAngularVelocity(this.sword.physics.body.angularVelocity + 0.1);
                // this.player.startAttack();
            }
        });


        if (this.debug) {
            this.debugText = this.add.text(5, 5, this.getDebugText(),
                {fontSize: '12px', color: '#000000'});
        }
    }

    update(): void {
        this.player.update();
        // this.sword.update();

        if (this.debug) {
            if (this.game.input.mousePointer.isDown) {
                console.log("x: " + this.game.input.mousePointer.x);
                console.log("y: " + this.game.input.mousePointer.y);
            }
        }


        if (this.debug) {
            this.debugText.text = this.getDebugText();
        }

        this.counter++;
    }

    private getDebugText(): string {
        return this.sword.physics.body.angularVelocity + "";
        // return "clustersize: " + String(this.globals.enemyClusterSize) + "\nsomething";
    }
}
