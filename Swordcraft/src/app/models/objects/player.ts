import {Sword} from "./sword";

export class Player extends Phaser.GameObjects.Image {
  private cursors: Phaser.Input.Keyboard.CursorKeys;
  private sword: Sword;
  private walkingSpeed = 2.5;

  private isAttacking = false;
  private swingSpeed = 6;
  private swingProgress = 0;
  private endSwing = 210;

  constructor(scene, x, y) {
    super(scene, x, y, 'player');

    this.initImage();
    this.initInput(scene);

    this.sword = new Sword(scene, x, y);

    scene.add.existing(this);
  }

  private initImage(): void {
    const scale = 0.15;
    this.setScale(scale);
    this.setOrigin(0.5, 0.5);
  }
  private initInput(scene): void {
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  update(): void {
    if (this.isAttacking) {
      this.sword.angle -= this.swingSpeed;
      this.swingProgress += this.swingSpeed;
      if (this.swingProgress >= this.endSwing) {
        this.sword.setAngle(this.angle + this.sword.originAngle);
        this.swingProgress = 0;
        this.isAttacking = false;
      }
    } else {
      this.handleInput();
    }
    // this.sword.update();
  }

  startAttack(): void {
    this.isAttacking = true;
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
