import {Global} from "../../../globals";

export abstract class Enemy implements UnitType {
    public physics: Phaser.Physics.Matter.Image;
    public scene: Phaser.Scene;

    public INITIAL_MOVE_SPEED = 10 * Global.SPEED_MODIFIER;
    public INITIAL_SLOW_TIME = 7500 * Global.SPEED_MODIFIER;
    public STUNNED_TIME = 500 * Global.SPEED_MODIFIER;

    public moveSpeed = this.INITIAL_MOVE_SPEED;
    public slowLeft = 0;
    public isAttacking = false;
    public isStunned = false;
    public stunnedCounter = 0;
    public isDead = false;
    public type: string;
    public liveCounter = 0;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        this.scene = scene;
        this.physics = scene.matter.add.image(x, y, key);
        this.type = key;
    }

    update(callback?: () => void): void {
        this.liveCounter++;

        if (this.slowLeft > 0) {
            this.slowLeft--;
            if (this.slowLeft <= 0) {
                this.endSlow();
            }
        }

        if (!this.isStunned && callback) {
            callback();
        } else {
            this.stunnedCounter++;
            if (this.stunnedCounter >= this.STUNNED_TIME) {
                this.endStun();
            }
        }
    }

    slow() {
        this.physics.setTint(0xffff00);
        this.slowLeft = this.INITIAL_SLOW_TIME;
        this.moveSpeed = this.INITIAL_MOVE_SPEED / 2;
    }
    endSlow() {
        this.moveSpeed = this.INITIAL_MOVE_SPEED;
        this.physics.setTint(0xffffff);
    }
    stun() {
        this.isStunned = true;
        this.physics.setTint(0xbbbbbb);
    }
    private endStun() {
        this.isStunned = false;
        this.stunnedCounter = 0;
        this.physics.setTint(0xffffff);
    }
    die() {
        this.isDead = true;
        this.physics.setTint(0x888888);
    }

    destroy() {
        this.scene.matter.world.remove(this.physics, true);
        this.physics.body.gameObject.destroy(true);
    }
}

