export abstract class Enemy {
    public physics: Phaser.Physics.Matter.Image;
    public scene: Phaser.Scene;

    public STUNNED_TIME = 90;

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
        if (!this.isStunned && callback) {
            callback();
        } else {
            this.stunnedCounter++;
            if (this.stunnedCounter >= this.STUNNED_TIME) {
                this.isStunned = false;
                this.stunnedCounter = 0;
                this.physics.setTint(0xffffff);
            }
        }
    }

    die() {
        this.isDead = true;
        this.physics.setTint(0x888888);
    }

    stun() {
        this.isStunned = true;
        this.physics.setTint(0xbbbbbb);
    }

    destroy() {
        this.scene.matter.world.remove(this.physics, true);
        this.physics.body.gameObject.destroy(true);
    }
}

