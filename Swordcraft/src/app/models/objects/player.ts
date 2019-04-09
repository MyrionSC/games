import {Sword} from "./sword";
import Vector2 = Phaser.Math.Vector2;

export class Player {
  physics: Phaser.Physics.Matter.Image;
  sword: Sword;
  private swordConstraint: any;
  private cursors: Phaser.Input.Keyboard.CursorKeys;
  private walkingSpeed = 2.5;
  private scene: Phaser.Scene;

  private isAttacking = false;
  private attackCounter = 0;

  // private debugPoint1: Phaser.GameObjects.Arc;
  // private debugPoint4: Phaser.GameObjects.Arc;
  // private debugPointSword1: Phaser.GameObjects.Arc;
  // private debugPointSword2: Phaser.GameObjects.Arc;

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
      // console.log(this.attackCounter);

      if (this.attackCounter > 2 && this.attackCounter < 80) {
        this.sword.physics.applyForce(new Vector2(0, -0.001));


        // @ts-ignore
        const swordVector = new Phaser.Math.Vector2(
            // @ts-ignore
            (this.sword.physics.body.vertices[3].x - this.sword.physics.body.vertices[0].x) * -1,
            // @ts-ignore
            // this.sword.physics.body.vertices[3].y - this.sword.physics.body.vertices[0].y
            (this.sword.physics.body.vertices[3].y - this.sword.physics.body.vertices[0].y) * -1
        );

        // @ts-ignore
        // this.debugPointSword1.setPosition(this.sword.physics.body.vertices[3].x, this.sword.physics.body.vertices[3].y);
        // // @ts-ignore
        // this.debugPointSword2.setPosition(this.sword.physics.body.vertices[3].x + swordVector.x,
        //     // @ts-ignore
        //     this.sword.physics.body.vertices[3].y + swordVector.y);

        // @ts-ignore
        let forceVector = new Phaser.Math.Vector2(
            // @ts-ignore
            swordVector.y,
            // @ts-ignore
            -1 * swordVector.x
        );

        forceVector = forceVector.normalize().scale(0.01);


        // @ts-ignore
        // this.debugPoint1.setPosition(this.sword.physics.body.vertices[3].x + swordVector.x / 2
        //     // @ts-ignore
        //     , this.sword.physics.body.vertices[3].y + swordVector.y / 2);
        // // @ts-ignore
        // this.debugPoint4.setPosition(this.sword.physics.body.vertices[3].x + swordVector.x / 2 + forceVector.x,
        //     // @ts-ignore
        //     this.sword.physics.body.vertices[3].y + swordVector.y / 2 + forceVector.y);

        this.sword.physics.applyForce(forceVector);
      }

      if (this.attackCounter >= 60) {
        console.log(this.sword.physics);
        console.log(this.sword.physics.body);
        this.physics.setStatic(false);
        console.log(this.scene.game);

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

    this.sword.physics.setAngle(130);

    // this.debugPointSword1 = this.scene.add.circle(100, 100, 5, 0xff0000);
    // this.debugPointSword2 = this.scene.add.circle(100, 100, 5, 0xaa0000);
    // this.debugPoint1 = this.scene.add.circle(100, 100, 5, 0x000000);
    // this.debugPoint4 = this.scene.add.circle(100, 100, 5, 0x555555);
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
