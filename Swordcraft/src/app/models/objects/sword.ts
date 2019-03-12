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
    // this.angle -= 0.5;
  }
}
