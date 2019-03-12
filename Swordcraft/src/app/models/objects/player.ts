import {Sword} from "./sword";

export class Player extends Phaser.GameObjects.Image {
  private cursors: Phaser.Input.Keyboard.CursorKeys;
  private sword: Sword;
  private walkingSpeed = 2;

  constructor(params, sword: Sword) {
    super(params.scene, params.x, params.y, params.key);

    this.initImage();
    this.initInput(params);

    this.sword = sword;

    params.scene.add.existing(this);
  }

  private initImage(): void {
    const scale = 0.15;
    this.setScale(scale);
    this.setOrigin(0.5, 0.5);
  }
  private initInput(params): void {
    this.cursors = params.scene.input.keyboard.createCursorKeys();
  }

  update(): void {
    this.handleInput();
  }

  private handleInput(): void {
    if (this.cursors.right.isDown) {
      if (this.cursors.up.isDown) {
        this.updateAngle(45);
      } else if (this.cursors.down.isDown) {
        this.updateAngle(135);
      } else {
        this.updateAngle(90);
      }
    } else if (this.cursors.left.isDown) {
      if (this.cursors.up.isDown) {
        this.updateAngle(315);
      } else if (this.cursors.down.isDown) {
        this.updateAngle(225);
      } else {
        this.updateAngle(270);
      }
    } else if (this.cursors.up.isDown) {
      this.updateAngle(0);
    } else if (this.cursors.down.isDown) {
      this.updateAngle(180);
    }

    if (this.cursors.right.isDown) {
      this.x += this.walkingSpeed;
      this.sword.x += this.walkingSpeed;
    }
    if (this.cursors.left.isDown) {
      this.x -= this.walkingSpeed;
      this.sword.x -= this.walkingSpeed;
    }
    if (this.cursors.up.isDown) {
      this.y -= this.walkingSpeed;
      this.sword.y -= this.walkingSpeed;
    }
    if (this.cursors.down.isDown) {
      this.y += this.walkingSpeed;
      this.sword.y += this.walkingSpeed;
    }
  }

  updateAngle(angle: number): void {
    this.setAngle(angle);
    this.sword.setAngle(this.sword.originAngle + angle);
  }
}
