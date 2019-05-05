export class MenuScene extends Phaser.Scene {
    private background: Phaser.GameObjects.TileSprite;

    constructor() {
        super({
            key: 'MenuScene'
        });
    }

    preload(): void {
        this.load.image('background', 'assets/Background/grasstile.png');
        this.load.image('sword', 'assets/Swordcraft/grandsword.png');
    }

    create(): void {
        // create background
        this.background = this.add.tileSprite(Number(Number(this.game.config.width)) / 2, Number(this.game.config.height) / 2,
            Number(this.game.config.width), Number(this.game.config.height), 'background');
    }

    update(): void {
    }
}
