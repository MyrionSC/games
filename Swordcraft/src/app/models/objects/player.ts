export class Player extends Phaser.GameObjects.Image {
  private cursors: Phaser.Input.Keyboard.CursorKeys;
  private walkingSpeed = 2;

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
    this.setOrigin(0.5, 0.5);
    this.setAngle(0);
  }
  private initInput(params): void {
    this.cursors = params.scene.input.keyboard.createCursorKeys();
  }

  update(): void {
    this.handleInput();
  }

  private handleInput(): void {
    console.log(this.angle);

    if (this.cursors.right.isDown) {
      if (this.cursors.up.isDown) {
        this.setAngle(45);
      } else if (this.cursors.down.isDown) {
        this.setAngle(135);
      } else {
        this.setAngle(90);
      }
    } else if (this.cursors.left.isDown) {
      if (this.cursors.up.isDown) {
        this.setAngle(315);
      } else if (this.cursors.down.isDown) {
        this.setAngle(225);
      } else {
        this.setAngle(270);
      }
    } else if (this.cursors.up.isDown) {
      this.setAngle(0);
    } else if (this.cursors.down.isDown) {
      this.setAngle(180);
    }

    if (this.cursors.right.isDown) {
      this.x += this.walkingSpeed;
    }
    if (this.cursors.left.isDown) {
      this.x -= this.walkingSpeed;
    }
    if (this.cursors.up.isDown) {
      this.y -= this.walkingSpeed;
    }
    if (this.cursors.down.isDown) {
      this.y += this.walkingSpeed;
    }
  }

}
