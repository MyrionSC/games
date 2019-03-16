export class Rock extends Phaser.GameObjects.Image {
  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initImage();


    // this.rock = this.impact.add.image(400, 400, 'rock');
    // this.rock.setScale(0.2);
    // this.rock.setTypeA().setCheckAgainstB().setActiveCollision().setMaxVelocity(100);


    params.scene.add.existing(this);
  }

  private initImage(): void {
    const scale = 0.3;
    this.setScale(scale);
  }
  update(): void {
  }
}
