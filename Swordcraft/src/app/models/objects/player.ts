import {Sword} from "./sword";

export class Player {
    physics: Phaser.Physics.Matter.Image;
    sword: Sword;
    private cursors: Phaser.Input.Keyboard.CursorKeys;
    private scene: Phaser.Scene;

    private walkingSpeed = 5;
    private swingForce = 0.03;
    private swingTime = 49;
    private attackTime = 50;

    private startSwingAngle = 0;
    private endSwingAngle = 0;

    isAttacking = false;
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

            // start swinging
            if (this.attackCounter > 2 && this.attackCounter < this.swingTime) {
                // compute force to apply to sword as vector perpendicular to sword
                const swordVector = new Phaser.Math.Vector2(
                    (this.sword.physics.body.vertices[3].x - this.sword.physics.body.vertices[0].x) * -1,
                    (this.sword.physics.body.vertices[3].y - this.sword.physics.body.vertices[0].y) * -1
                );
                let forceVector = new Phaser.Math.Vector2(
                    swordVector.y,
                    -1 * swordVector.x
                );
                forceVector = forceVector.normalize().scale(this.swingForce);
                this.sword.physics.applyForce(forceVector);
            }

            // end attack
            if (this.attackCounter >= this.attackTime ||
                Math.abs((this.endSwingAngle + 180) - (this.sword.physics.angle + 180)) < 10) {
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

        this.startSwingAngle = this.physics.angle + this.sword.startAngle;
        if (this.startSwingAngle > 180) this.startSwingAngle -= 360;

        this.endSwingAngle = this.startSwingAngle - this.sword.endSwingAngle;
        if (this.endSwingAngle < -180) this.endSwingAngle += 360;

        this.sword.physics.setAngle(this.startSwingAngle);
    }

    endAttack(): void {
        this.physics.setStatic(false);

        this.isAttacking = false;
        this.attackCounter = 0;

        this.sword.delete(this.scene);
        this.sword = undefined;
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


// this.debugPointSword1.setPosition(this.sword.physics.body.vertices[3].x, this.sword.physics.body.vertices[3].y);
// this.debugPointSword2.setPosition(this.sword.physics.body.vertices[3].x + swordVector.x,
//     this.sword.physics.body.vertices[3].y + swordVector.y);


// this.debugPoint1.setPosition(this.sword.physics.body.vertices[3].x + swordVector.x / 2
//     , this.sword.physics.body.vertices[3].y + swordVector.y / 2);
// this.debugPoint4.setPosition(this.sword.physics.body.vertices[3].x + swordVector.x / 2 + forceVector.x,
//     this.sword.physics.body.vertices[3].y + swordVector.y / 2 + forceVector.y);


// const l = this.scene.add.line(0, 0, 0, 0, 200, 200, 0xff0000);
// l.setTo(200, 200, 500, 300);

// this.debugPointSword1 = this.scene.add.circle(100, 100, 5, 0xff0000);
// this.debugPointSword2 = this.scene.add.circle(100, 100, 5, 0xaa0000);
// this.debugPoint1 = this.scene.add.circle(100, 100, 5, 0x000000);
// this.debugPoint4 = this.scene.add.circle(100, 100, 5, 0x555555);
