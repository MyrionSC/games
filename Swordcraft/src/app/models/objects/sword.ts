import {Player} from "./player";

export class Sword {
    physics: Phaser.Physics.Matter.Image;
    swordConstraint: any;
    public type = 'sword';
    startAngle = 130;
    endSwingAngle = 240;

    constructor(scene: Phaser.Scene, x: number, y: number, player: Player) {
        this.physics = scene.matter.add.image(x, y, 'sword');
        this.physics.body.unit = this;
        this.physics.setScale(0.30);

        const group = scene.matter.world.nextGroup(true);
        player.physics.setCollisionGroup(group);
        this.physics.setCollisionGroup(group);

        // @ts-ignore
        this.swordConstraint = new Phaser.Physics.Matter.Matter.Constraint.create({
            bodyB: player.physics.body,
            pointA: {x: 0, y: 90},
            bodyA: this.physics.body,
            stiffness: 0.5,
            length: 0
        });
        scene.matter.world.add(this.swordConstraint);
    }

    update(): void {
    }

    delete(scene: Phaser.Scene) {
        this.physics.visible = false;
        scene.matter.world.remove(this.physics, true);
        scene.matter.world.removeConstraint(this.swordConstraint, true);
    }
}
