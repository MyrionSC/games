import {Player} from "./player";

export class Biter {
    physics: Phaser.Physics.Matter.Image;

    accel = 0.0002;

    isDead = false;


    private dline: Phaser.GameObjects.Line;
    private dpoint: Phaser.GameObjects.Arc;
    private dpoint2: Phaser.GameObjects.Arc;



    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.physics = scene.matter.add.image(x, y, 'biter');
        this.physics.setScale(0.08);
        this.physics.setBody({
            type: 'circle',
            radius: this.physics.width * 0.04
        }, {});


        this.dline = scene.add.line(0, 0, 0, 0, 0, 0, 0xff0000);
        // this.dline.setTo(200, 200, 500, 300);

        this.dpoint = scene.add.circle(0 ,0, 5, 0x00ff00);
        this.dpoint2 = scene.add.circle(0 ,0, 5, 0x0000ff);
    }

    update(player: Player) {
        let forceVector = new Phaser.Math.Vector2(
            player.physics.x - this.physics.x,
            player.physics.y - this.physics.y
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
