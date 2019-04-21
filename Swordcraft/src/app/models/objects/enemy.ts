export abstract class Enemy {
    physics: Phaser.Physics.Matter.Image;
    scene: Phaser.Scene;

    isAttacking = false;
    type: string;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        this.scene = scene;
        this.physics = scene.matter.add.image(x, y, key);
        this.type = key;
    }

    update() {}

    destroy() {
        this.scene.matter.world.remove(this.physics, true);
        this.physics.body.gameObject.destroy(true);
    }
}

