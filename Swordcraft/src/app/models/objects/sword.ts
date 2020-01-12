import {Player} from "./player";

export class Sword implements UnitType {
    physics: Phaser.Physics.Matter.Image;
    swordConstraint: any;
    type = 'sword';
    isAttacking = false;
    isDead = false;
    startAngle = 130;
    endSwingAngle = 240;
    MOVE_SPEED = 0;

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

    getDirectionVector(): Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(
            (this.physics.body.vertices[3].x - this.physics.body.vertices[0].x) * -1,
            (this.physics.body.vertices[3].y - this.physics.body.vertices[0].y) * -1
        );
    }

    getPerpendicularVector(): Phaser.Math.Vector2 {
        const swordVector = this.getDirectionVector();
        const perpVector = new Phaser.Math.Vector2(
            swordVector.y,
            -1 * swordVector.x
        );
        return perpVector.normalize();
    }

    update(): void {}
    die() {}
    stun() {}

    delete(scene: Phaser.Scene) {
        this.physics.visible = false;
        scene.matter.world.remove(this.physics, true);
        scene.matter.world.removeConstraint(this.swordConstraint, true);
    }
}
