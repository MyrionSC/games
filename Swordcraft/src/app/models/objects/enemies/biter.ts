import {Player} from "../player";
import {Enemy} from "./enemy";

export class Biter extends Enemy {
    private player: Player;

    private MAX_TURN_RAD = 0.03;
    private MOVE_SPEED = 3;
    private LUNGE_SPEED = 5;
    private ATTACK_TIME = 60;
    private ATTACK_DISTANCE = 250;
    private ATTACK_ANGLE_RAD = 0.1;

    private attackCounter = 0;
    private lungeDirection: Phaser.Math.Vector2;

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
            if (this.isAttacking) {
                if (this.attackCounter >= this.ATTACK_TIME) {
                    // todo: set graphics to attack image
                    this.stopAttack();
                } else {
                    this.physics.setVelocity(this.lungeDirection.x, this.lungeDirection.y);
                    this.attackCounter++;
                }
            } else {
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

                const dist = Phaser.Math.Distance.Between(this.physics.x, this.physics.y,
                    this.player.physics.x, this.player.physics.y);
                const absAngleDiff = Math.abs(Phaser.Math.Angle.Normalize(playerDirAngleRad) - Phaser.Math.Angle.Normalize(facingAngleRad));
                if (dist < this.ATTACK_DISTANCE && absAngleDiff < this.ATTACK_ANGLE_RAD) {
                    this.startAttack(moveVector);
                }
            }
        });
    }

    startAttack(moveVector: Phaser.Math.Vector2) {
        this.isAttacking = true;
        this.lungeDirection = new Phaser.Math.Vector2(moveVector).normalize().scale(this.LUNGE_SPEED);
    }

    stopAttack() {
        this.isAttacking = false;
        this.attackCounter = 0;
        this.lungeDirection = undefined;
    }

    stun() {
        super.stun();
        this.stopAttack();
    }
}
