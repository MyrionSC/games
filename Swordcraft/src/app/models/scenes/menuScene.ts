export class MenuScene extends Phaser.Scene {
    private sword: Phaser.GameObjects.Image;
    private swordRotationSpeed = 0.005;

    constructor() {
        super({
            key: 'MenuScene'
        });
    }

    preload(): void {
        this.load.image('sword', 'assets/Swordcraft/grandsword.png');
    }

    create(): void {
        this.sword = this.add.image(600, 400, 'sword');
        this.sword.setInteractive();
        this.sword.on('pointerdown', () => {
            this.swordRotationSpeed += 0.005;
        });

        const singleButton = this.add.text(50, 70, "Single",
            {
                fontSize: '50px',
                color: 'green'
            });
        singleButton.setInteractive();
        singleButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
        singleButton.on('pointerover', () => {
            singleButton.setStyle({
                color: 'yellow'
            });
        });
        singleButton.on('pointerout', () => {
            singleButton.setStyle({
                color: 'green'
            });
        });

        const coopButton = this.add.text(50, 170, "Coop",
            {
                fontSize: '50px',
                color: 'green'
            });
        coopButton.setInteractive();
        coopButton.on('pointerdown', () => {
            console.log("start coop scene");
        });
        coopButton.on('pointerover', () => {
            coopButton.setStyle({
                color: 'yellow'
            });
        });
        coopButton.on('pointerout', () => {
            coopButton.setStyle({
                color: 'green'
            });
        });
    }

    update(): void {
        this.sword.setRotation(this.sword.rotation - this.swordRotationSpeed);
    }
}

