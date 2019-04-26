import {Player} from "../player";
import {Enemy} from "./enemy";
import {SpitterBullet} from "./spitter-bullet";

export class Spitter extends Enemy {
    private player: Player;
    private enemies: Enemy[];

    // tweakable
    private MOVE_SPEED = 3;
    private SHOOTING_DIST = 300;
    private RETREAT_DIST = 200;
    private ATTACK_TIME = 120;
    private COOL_DOWN_TIME = 90;

    private attackCounter = 0;
    private lastAttack = -1000;

    // debug
    private dline: Phaser.GameObjects.Line;
    private dpoint: Phaser.GameObjects.Arc;
    private dpoint2: Phaser.GameObjects.Arc;

    constructor(scene: Phaser.Scene, x: number, y: number, player: Player, enemies: Enemy[]) {
        super(scene, x, y, 'spitter');
        this.physics.setScale(0.08);
        this.physics.setBody({
            type: 'circle',
            radius: this.physics.width * 0.04
        }, {});
        this.physics.body.unit = this;

        this.player = player;
        this.enemies = enemies;

        // this.dline = scene.add.line(0, 0, 0, 0, 0, 0, 0xff0000);
        // this.dline.setTo(200, 200, 500, 300);

        // this.dpoint = scene.add.circle(0 ,0, 5, 0x00ff00);
        // this.dpoint2 = scene.add.circle(0 ,0, 5, 0x0000ff);
    }

    update() {
        super.update();
        const dist = Phaser.Math.Distance.Between(this.physics.x, this.physics.y,
            this.player.physics.x, this.player.physics.y);

        if (!this.isAttacking) {
            let moveVector = new Phaser.Math.Vector2(
                this.player.physics.x - this.physics.x,
                this.player.physics.y - this.physics.y
            );
            moveVector = moveVector.normalize().scale(this.MOVE_SPEED);

            // advance to shooting range
            if (dist > this.SHOOTING_DIST) {
                this.physics.setVelocity(moveVector.x, moveVector.y);
            } else if (dist < this.RETREAT_DIST) {
                this.physics.setVelocity(moveVector.x * -1, moveVector.y * -1);
            } else {
                if (this.liveCounter > this.lastAttack + this.COOL_DOWN_TIME) {
                    this.physics.setVelocity(0, 0);
                    this.startAttack();
                }
            }
        } else {
            // if player is too close or far away, cancel attack
            if (dist > this.SHOOTING_DIST || dist < this.RETREAT_DIST) {
                this.stopAttack();
            } else {
                this.attackCounter++;

                const hexTint = (256 - this.attackCounter).toString(16);
                this.physics.body.gameObject.setTint(Number('0xffff' + hexTint));

                if (this.attackCounter >= this.ATTACK_TIME) {
                    console.log("Bang!");
                    this.fireBullet();
                    this.lastAttack = this.liveCounter;
                    this.stopAttack();
                }
            }
        }
    }

    private startAttack() {
        this.isAttacking = true;
        this.attackCounter = 0;
    }

    private stopAttack() {
        this.physics.body.gameObject.setTint(0xffffff);
        this.isAttacking = false;
    }

    private fireBullet() {
        const directionVector = new Phaser.Math.Vector2(
            this.player.physics.x - this.physics.x,
            this.player.physics.y - this.physics.y
        ).normalize();
        const b = new SpitterBullet(this.scene,
            this.physics.x + directionVector.x * 25,
            this.physics.y + directionVector.y * 25, this.enemies, directionVector);
        this.enemies.push(b);
    }
}
