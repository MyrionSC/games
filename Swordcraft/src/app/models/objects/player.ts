import {Sword} from "./sword";

export class Player {
  physics: Phaser.Physics.Matter.Image;
  sword: Sword;
  private swordConstraint: any;
  private cursors: Phaser.Input.Keyboard.CursorKeys;
  private walkingSpeed = 2.5;
  private scene: Phaser.Scene;

  private isAttacking = false;
  private attackCounter = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.physics = scene.matter.add.image(x, y, 'player');
    this.physics.setScale(0.15);
    this.physics.setBody({
      type: 'circle',
      radius: 24
    }, {});

    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  update(): void {
    if (this.isAttacking) {
      this.attackCounter++;
      console.log(this.attackCounter);



      if (this.attackCounter === 10) {
        this.physics.setStatic(true);
        // this.sword.physics.setAngle(130);
      } else if (this.attackCounter === 20) {
        // this.physics.setStatic(false);
      }
      //   // @ts-ignore
      //   this.swordConstraint = new Phaser.Physics.Matter.Matter.Constraint.create({
      //     bodyB: this.physics.body,
      //     pointA: { x: 0, y: 90 },
      //     bodyA: this.sword.physics.body,
      //     stiffness: 0.5,
      //     length: 0
      //   });
      //   this.scene.matter.world.add(this.swordConstraint);
      //
      // } else if (this.attackCounter === 10) {
      //   // this.sword.physics.setAngularVelocity(-1);
      // } else

      if (this.attackCounter >= 90) {
        console.log("comeon");
        this.physics.setStatic(false);

        this.endAttack();
      }

    } else {
      this.handleInput();
    }
  }

  startAttack(): void {
    this.isAttacking = true;

    this.physics.setStatic(true);

    this.sword = new Sword(this.scene, this.physics.x, this.physics.y, this);

    const group = this.scene.matter.world.nextGroup(true);
    this.physics.setCollisionGroup(group);
    this.sword.physics.setCollisionGroup(group);

    // @ts-ignore
    this.swordConstraint = new Phaser.Physics.Matter.Matter.Constraint.create({
      bodyB: this.physics.body,
      pointA: { x: 0, y: 90 },
      bodyA: this.sword.physics.body,
      stiffness: 0.5,
      length: 0
    });
    this.scene.matter.world.add(this.swordConstraint);
  }

  endAttack(): void {
    this.isAttacking = false;
    this.attackCounter = 0;

    this.sword.physics.visible = false;
    this.scene.matter.world.remove(this.sword.physics, true);
    this.scene.matter.world.removeConstraint(this.swordConstraint, true);
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
      } else if (this.cursors.left.isDown) {
        this.physics.setVelocityX(-this.walkingSpeed);
      } else {
        this.physics.setVelocityX(0);
      }

      if (this.cursors.up.isDown) {
        this.physics.setVelocityY(-this.walkingSpeed);
      } else if (this.cursors.down.isDown) {
        this.physics.setVelocityY(this.walkingSpeed);
      } else {
        this.physics.setVelocityY(0);
      }
    } else {
      this.physics.setVelocity(0);
    }
  }

  private anyCursorsDown() {
    return this.cursors.right.isDown ||
        this.cursors.left.isDown ||
        this.cursors.up.isDown ||
        this.cursors.down.isDown;
  }
}
