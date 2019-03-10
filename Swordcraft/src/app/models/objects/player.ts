export class Player extends Phaser.GameObjects.Image {
  private cursors: Phaser.Input.Keyboard.CursorKeys;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initImage();
    this.initInput(params);

    params.scene.add.existing(this);
  }

  private initImage(): void {
    const scale = 0.4;
    this.setScale(scale);
    this.setSize(118 * scale, 95 * scale);
    this.setAlpha(1);
    this.setFlip(false, false);
    this.setOrigin(0.4, 0.4);
    this.setAngle(0);
  }
  private initInput(params): void {
    this.cursors = params.scene.input.keyboard.createCursorKeys();
  }

  update(): void {
  }
}
