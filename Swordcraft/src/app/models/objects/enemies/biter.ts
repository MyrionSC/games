import {Player} from "../player";
import {Enemy} from "./enemy";

export class Biter extends Enemy {
    accel = 0.0003;
    private player: Player;

    private MAX_TURN_DEG = 1;

    private distline: Phaser.GameObjects.Line;
    private dirline: Phaser.GameObjects.Line;

    constructor(scene: Phaser.Scene, x: number, y: number, player: Player) {
        super(scene, x, y, 'biter');
        this.physics.setScale(0.08);
        this.physics.setBody({
            type: 'circle',
            radius: this.physics.width * 0.04
        }, {});
        this.physics.body.unit = this;

        this.player = player;

        // set startangle as facing player
        let playerDirectionVector = new Phaser.Math.Vector2(
            this.player.physics.x - this.physics.x,
            this.player.physics.y - this.physics.y
        ).normalize();

        const radian = this.physics.angle / 360 * 2 * Math.PI;
        let angleVector = new Phaser.Math.Vector2(
            Math.cos(radian),
            Math.sin(radian)
        ).scale(100);




        this.distline = scene.add.line(0, 0, 0, 0, 0, 0, 0xff0000);
        this.dirline = scene.add.line(0, 0, 0, 0, 0, 0, 0x0000ff);
    }

    update() {
        super.update(() => {
            let forceVector = new Phaser.Math.Vector2(
                this.player.physics.x - this.physics.x,
                this.player.physics.y - this.physics.y
            );
            this.distline.setTo(this.physics.x, this.physics.y, this.physics.x + forceVector.x, this.physics.y + forceVector.y);


            // this.physics.setAngle(this.physics.angle + 1);
            const radian = this.physics.angle / 360 * 2 * Math.PI;
            //
            let angleVector = new Phaser.Math.Vector2(
                Math.cos(radian),
                Math.sin(radian)
            ).scale(100);

            this.dirline.setTo(this.physics.x, this.physics.y, this.physics.x + angleVector.x, this.physics.y + angleVector.y);

            forceVector = forceVector.normalize().scale(this.accel);
            this.physics.applyForce(forceVector);
        });
    }


}
