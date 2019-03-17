import {Sword} from "./sword";

export class Player {
  physics: Phaser.Physics.Matter.Image;
  private cursors: Phaser.Input.Keyboard.CursorKeys;
  private sword: Sword;
  private walkingSpeed = 2.5;

  private isAttacking = false;
  private swingSpeed = 6;
  private swingProgress = 0;
  private endSwing = 210;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.physics = scene.matter.add.image(x, y, 'player');
    this.physics.setScale(0.15);
    this.physics.setBody({
      type: 'circle',
      radius: 24
    }, {});

    this.cursors = scene.input.keyboard.createCursorKeys();


    // this.sword = new Sword(scene, x, y);
  }

  update(): void {
    // if (this.isAttacking) {
    //   this.sword.angle -= this.swingSpeed;
    //   this.swingProgress += this.swingSpeed;
    //   if (this.swingProgress >= this.endSwing) {
    //     this.sword.setAngle(this.angle + this.sword.originAngle);
    //     this.swingProgress = 0;
    //     this.isAttacking = false;
    //   }
    // } else {
      this.handleInput();
    // }
  }

  startAttack(): void {
    this.isAttacking = true;
  }

  private handleInput(): void {
    if (this.cursors.right.isDown) {
      if (this.cursors.up.isDown) {
        this.physics.setAngle(45);
      } else if (this.cursors.down.isDown) {
        this.physics.setAngle(135);
      } else {
        this.physics.setAngle(90);
      }
    } else if (this.cursors.left.isDown) {
      if (this.cursors.up.isDown) {
        this.physics.setAngle(315);
      } else if (this.cursors.down.isDown) {
        this.physics.setAngle(225);
      } else {
        this.physics.setAngle(270);
      }
    } else if (this.cursors.up.isDown) {
      this.physics.setAngle(0);
    } else if (this.cursors.down.isDown) {
      this.physics.setAngle(180);
    }

    if (this.anyCursorsDown()) {
      if (this.cursors.right.isDown) {
        this.physics.setVelocityX(this.walkingSpeed);
        // this.sword.x += this.walkingSpeed;
      } else if (this.cursors.left.isDown) {
        this.physics.setVelocityX(-this.walkingSpeed);
        // this.sword.x -= this.walkingSpeed;
      } else {
        this.physics.setVelocityX(0);
      }

      if (this.cursors.up.isDown) {
        this.physics.setVelocityY(-this.walkingSpeed);
        // this.sword.y -= this.walkingSpeed;
      } else if (this.cursors.down.isDown) {
        this.physics.setVelocityY(this.walkingSpeed);
        // this.sword.y += this.walkingSpeed;
      } else {
        this.physics.setVelocityY(0);
      }
    } else {
      this.physics.setVelocity(0);
    }
  }
  //
  // updateAngle(angle: number): void {
  //   this.setAngle(angle);
  //   this.sword.setAngle(this.sword.originAngle + angle);
  // }

  private anyCursorsDown() {
    return this.cursors.right.isDown ||
        this.cursors.left.isDown ||
        this.cursors.up.isDown ||
        this.cursors.down.isDown;
  }
}
