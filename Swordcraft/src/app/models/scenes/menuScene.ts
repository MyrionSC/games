export class MenuScene extends Phaser.Scene {
    private sword: Phaser.GameObjects.Image;
    private swordRotationSpeed = 0.005;
    private config: CustomConfig;

    constructor() {
        super({
            key: 'MenuScene'
        });
    }

    preload(): void {
        this.load.json('config', 'assets/config.json');
        this.load.image('sword', 'assets/Swordcraft/grandsword.png');
    }

    create(): void {
        this.config = this.cache.json.get('config');
        console.log(this.config);
        

        this.sword = this.add.image(600, 400, 'sword');
        this.sword.setInteractive();
        this.sword.on('pointerdown', () => {
            this.swordRotationSpeed += 0.005;
        });

        // buttons
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
            this.scene.start('CoopScene');
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

        // controls
        this.add.text(20, this.game.config.height - 180, "Controls", { fontSize: '26px' });
        this.add.text(30, this.game.config.height - 146, `Singleplayer`, { fontSize: '20px' });
        this.add.text(40, this.game.config.height - 120, `Up:      ${this.config.SINGLE_CONTROLS_UP}\nRight:   ${this.config.SINGLE_CONTROLS_RIGHT}\nDown:    ${this.config.SINGLE_CONTROLS_DOWN}\nLeft:    ${this.config.SINGLE_CONTROLS_LEFT}\nAttack:  ${this.config.SINGLE_CONTROLS_ATTACK}`);
        this.add.text(210, this.game.config.height - 146, `Coop P1`, { fontSize: '20px' });
        this.add.text(220, this.game.config.height - 120, `Up:      ${this.config.COOP_CONTROLS_P1_UP}\nRight:   ${this.config.COOP_CONTROLS_P1_RIGHT}\nDown:    ${this.config.COOP_CONTROLS_P1_DOWN}\nLeft:    ${this.config.COOP_CONTROLS_P1_LEFT}\nAttack:  Space`);
        this.add.text(380, this.game.config.height - 146, `Coop P2`, { fontSize: '20px' });
        this.add.text(390, this.game.config.height - 120, `Up:      ${this.config.COOP_CONTROLS_P2_UP}\nRight:   ${this.config.COOP_CONTROLS_P2_RIGHT}\nDown:    ${this.config.COOP_CONTROLS_P2_DOWN}\nLeft:    ${this.config.COOP_CONTROLS_P2_LEFT}\nAttack:  ${this.config.COOP_CONTROLS_P2_ATTACK}`);
    }

    update(): void {
        this.sword.setRotation(this.sword.rotation - this.swordRotationSpeed);
    }
}

