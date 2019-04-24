import {Player} from "../player";
import {Enemy} from "./enemy";

export class Biter extends Enemy {
    accel = 0.0003;
    private player: Player;

    private dline: Phaser.GameObjects.Line;
    private dpoint: Phaser.GameObjects.Arc;
    private dpoint2: Phaser.GameObjects.Arc;

    constructor(scene: Phaser.Scene, x: number, y: number, player: Player) {
        super(scene, x, y, 'biter');
        this.physics.setScale(0.08);
        this.physics.setBody({
            type: 'circle',
            radius: this.physics.width * 0.04
        }, {});
        this.physics.body.unit = this;

        this.player = player;

        this.dline = scene.add.line(0, 0, 0, 0, 0, 0, 0xff0000);
        // this.dline.setTo(200, 200, 500, 300);

        this.dpoint = scene.add.circle(0 , 0, 5, 0x00ff00);
        this.dpoint2 = scene.add.circle(0 , 0, 5, 0x0000ff);
    }

    update() {
        super.update();

        let forceVector = new Phaser.Math.Vector2(
            this.player.physics.x - this.physics.x,
            this.player.physics.y - this.physics.y
        );

        forceVector = forceVector.normalize().scale(this.accel);
        this.physics.applyForce(forceVector);
        // this.dline.setTo(this.physics.x, this.physics.y, this.physics.x + forceVector.x, this.physics.y + forceVector.y);
        //
        // // this.dpoint2.setPosition(this.physics.x, this.physics.y);
        // this.dpoint2.setPosition(this.physics.x, this.physics.y);
        // this.dpoint.setPosition(this.physics.x + forceVector.x, this.physics.y + forceVector.y);
    }


}
