export abstract class Enemy {
    public physics: Phaser.Physics.Matter.Image;
    public scene: Phaser.Scene;

    public isAttacking = false;
    public isDead = false;
    public type: string;
    public liveCounter = 0;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        this.scene = scene;
        this.physics = scene.matter.add.image(x, y, key);
        this.type = key;
    }

    update() {
        this.liveCounter++;
    }

    destroy() {
        this.scene.matter.world.remove(this.physics, true);
        this.physics.body.gameObject.destroy(true);
    }
}

