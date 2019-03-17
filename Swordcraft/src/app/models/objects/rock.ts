export class Rock extends Phaser.GameObjects.Image {
  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initImage();

    params.scene.add.existing(this);
  }

  private initImage(): void {
    const scale = 0.3;
    this.setScale(scale);
  }
  update(): void {
  }
}
