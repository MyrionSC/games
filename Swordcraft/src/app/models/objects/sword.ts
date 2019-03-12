export class Sword extends Phaser.GameObjects.Image {
  originAngle = 130;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initImage();

    params.scene.add.existing(this);
  }

  private initImage(): void {
    const scale = 0.3;
    this.setScale(scale);
    this.setOrigin(0.5, 1.15);
    this.setAngle(130);
  }
  update(): void {
    // this.scene.add.circle(this.x, this.y, 5, 0xff0000, 1);
    // this.angle -= 0.5;
  }
}
