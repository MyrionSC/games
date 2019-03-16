export class Biter extends Phaser.GameObjects.Image {
  constructor(scene, x, y) {
    super(scene, x, y, 'biter');

    this.initImage();

    scene.add.existing(this);
  }

  private initImage(): void {
    const scale = 0.08;
    this.setScale(scale);
  }
  update(): void {
  }
}
