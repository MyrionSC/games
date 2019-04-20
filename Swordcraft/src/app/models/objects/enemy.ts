export abstract class Enemy {
    physics: Phaser.Physics.Matter.Image;

    constructor(scene: Phaser.Scene, x: number, y: number, key) {
        this.physics = scene.matter.add.image(x, y, key);
    }

    abstract update(): void;
}

