import {Player} from "./player";

export class Sword {
    physics: Phaser.Physics.Matter.Image;
    swordConstraint: any;
    startAngle = 130;
    endSwingAngle = 240;
    rightSwing: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number, player: Player, rightSwing: boolean) {
        this.physics = scene.matter.add.image(x, y, 'sword');
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

        this.rightSwing = rightSwing;
        if (rightSwing) {
            player.startSwingAngle = player.physics.angle + this.startAngle;
            if (player.startSwingAngle > 180) player.startSwingAngle -= 360;
            player.endSwingAngle = player.startSwingAngle - this.endSwingAngle;
            if (player.endSwingAngle < -180) player.endSwingAngle += 360;
        } else {
            this.physics.setFlipX(true);
            player.startSwingAngle = player.physics.angle - this.startAngle;
            if (player.startSwingAngle > 180) player.startSwingAngle -= 360;
            player.endSwingAngle = player.startSwingAngle + this.endSwingAngle;
            if (player.endSwingAngle < -180) player.endSwingAngle += 360;
        }
        this.physics.setAngle(player.startSwingAngle);
    }

    update(): void {
    }

    delete(scene: Phaser.Scene) {
        this.physics.visible = false;
        scene.matter.world.remove(this.physics, true);
        scene.matter.world.removeConstraint(this.swordConstraint, true);
    }
}
