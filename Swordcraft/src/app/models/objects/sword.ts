import {Player} from "./player";

export class Sword {
  physics: Phaser.Physics.Matter.Image;
  originAngle = 130;

  constructor(scene: Phaser.Scene, x: number, y: number, player: Player) {
    this.physics = scene.matter.add.image(x, y, 'sword');
    this.physics.setScale(0.30);
    // this.physics.setAngle(this.originAngle);

    // this.physics.visible = false;
    // console.log(this.physics.centerOfMass);
    // this.physics.body.offset = new Phaser.Math.Vector2(200, 200);

    // this.physics.body.center = new Phaser.Math.Vector2(200, 200);

    // this.physics.body.immovable = true;
    // this.physics.setStatic(true);



    // this.physics.setDensity(10000);
    // this.physics.setOriginFromFrame();

    // this.physics.setOrigin(0.5, 1.15);
    // this.physics.setDensity(0.00001);
  }

  update(): void {
    // this.physics.setAngle(this.physics.angle += 2);
    // this.physics.setAngularVelocity(0.05);
  }
}
