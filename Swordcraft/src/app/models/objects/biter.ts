export class Biter {
    physics: Phaser.Physics.Matter.Image;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.physics = scene.matter.add.image(x, y, 'biter');
        this.physics.setScale(0.08);
        this.physics.setBody({
            type: 'circle',
            radius: this.physics.width * 0.04
        }, {});
    }
}
