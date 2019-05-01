import {Player} from "../player";
import {Enemy} from "./enemy";

export class Biter extends Enemy {
    private player: Player;

    private MAX_TURN_RAD = 0.02;
    private MOVE_SPEED = 3;
    private LUNGE_SPEED = 6;

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

        const playerDirAngleRad = Phaser.Math.Angle.Between(this.physics.x, this.physics.y, this.player.physics.x, this.player.physics.y);
        const playerDirAngleDeg = (playerDirAngleRad / (Math.PI * 2)) * 360;
        this.physics.setAngle(playerDirAngleDeg);

        this.distline = scene.add.line(0, 0, 0, 0, 0, 0, 0xff0000);
        this.dirline = scene.add.line(0, 0, 0, 0, 0, 0, 0x0000ff);
    }

    update() {
        super.update(() => {

            // todo: Attack

            // Find angle between biter and player
            const facingAngleRad = this.physics.angle / 360 * 2 * Math.PI;
            const playerDirAngleRad = Phaser.Math.Angle.Between(this.physics.x, this.physics.y,
                this.player.physics.x, this.player.physics.y);

            // rotate
            const rotatedAngleRad = Phaser.Math.Angle.RotateTo(facingAngleRad, playerDirAngleRad, this.MAX_TURN_RAD);
            const rotatedAngleDeg = (rotatedAngleRad / (Math.PI * 2)) * 360;

            // apply
            this.physics.setAngle(rotatedAngleDeg);
            const moveVector = new Phaser.Math.Vector2(
                Math.cos(rotatedAngleRad),
                Math.sin(rotatedAngleRad)
            ).scale(this.MOVE_SPEED);
            this.physics.setVelocity(moveVector.x, moveVector.y);
        });
    }


}
