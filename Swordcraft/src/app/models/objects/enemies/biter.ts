import {Player} from "../player";
import {Enemy} from "./enemy";
import * as helper from "../../helpers";
import {Global} from "../../../globals";

export class Biter extends Enemy {
    private players: Player[];

    public INITIAL_MOVE_SPEED = 3 * Global.SPEED_MODIFIER;
    private MAX_TURN_RAD = 0.03 * Global.SPEED_MODIFIER;
    private ATTACK_TIME = 200 * Global.SPEED_MODIFIER;
    private ATTACK_DISTANCE = 250;
    private ATTACK_ANGLE_RAD = 0.1;

    public moveSpeed = this.INITIAL_MOVE_SPEED;
    private lungeSpeedMultiplier = 2;
    private attackCounter = 0;
    private lungeDirection: Phaser.Math.Vector2;

    private distline: Phaser.GameObjects.Line;
    private dirline: Phaser.GameObjects.Line;

    constructor(scene: Phaser.Scene, x: number, y: number, players: Player[]) {
        super(scene, x, y, 'biter');
        this.physics.setScale(0.08);
        this.physics.setBody({
            type: 'circle',
            radius: this.physics.width * 0.04
        }, {});
        this.physics.body.unit = this;

        this.players = players;

        const [closestDist, closestPlayer] = helper.findClosestPlayer(this, this.players);

        const playerDirAngleRad = Phaser.Math.Angle.Between(this.physics.x, this.physics.y, closestPlayer.physics.x, closestPlayer.physics.y);
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
                const [closestDist, closestPlayer] = helper.findClosestPlayer(this, this.players);

                // Find angle between biter and player
                const facingAngleRad = this.physics.angle / 360 * 2 * Math.PI;
                const playerDirAngleRad = Phaser.Math.Angle.Between(this.physics.x, this.physics.y,
                    closestPlayer.physics.x, closestPlayer.physics.y);

                // rotate
                const rotatedAngleRad = Phaser.Math.Angle.RotateTo(facingAngleRad, playerDirAngleRad, this.MAX_TURN_RAD);
                const rotatedAngleDeg = (rotatedAngleRad / (Math.PI * 2)) * 360;

                // apply
                this.physics.setAngle(rotatedAngleDeg);
                const moveVector = new Phaser.Math.Vector2(
                    Math.cos(rotatedAngleRad),
                    Math.sin(rotatedAngleRad)
                ).scale(this.moveSpeed);
                this.physics.setVelocity(moveVector.x, moveVector.y);

                const absAngleDiff = Math.abs(Phaser.Math.Angle.Normalize(playerDirAngleRad) - Phaser.Math.Angle.Normalize(facingAngleRad));
                if (closestDist < this.ATTACK_DISTANCE && absAngleDiff < this.ATTACK_ANGLE_RAD) {
                    this.startAttack(moveVector);
                }
            }
        });
    }

    startAttack(moveVector: Phaser.Math.Vector2) {
        this.isAttacking = true;
        this.lungeDirection = new Phaser.Math.Vector2(moveVector).normalize().scale(this.moveSpeed * this.lungeSpeedMultiplier);
        this.physics.setTexture('biter-attacking');
    }

    stopAttack() {
        this.isAttacking = false;
        this.attackCounter = 0;
        this.lungeDirection = undefined;
        this.physics.setTexture('biter');
    }

    stun() {
        super.stun();
        this.stopAttack();
    }
}
