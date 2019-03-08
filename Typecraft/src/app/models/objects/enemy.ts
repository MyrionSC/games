export class Enemy extends Phaser.GameObjects.Image {
    private walkingSpeed = 1;
    private scale = 0.20
    private textObj: Phaser.GameObjects.Text;
    public assignedWord: string;
    public nextLetter: string;
    public letterIndex: number;

    constructor(word: string, params) {
        super(params.scene, params.x, params.y, params.key);

        console.log(word);
        this.assignedWord = word;
        this.nextLetter = this.assignedWord[0];
        this.letterIndex = 0;

        this.initImage();
        this.initText();
        params.scene.add.existing(this);
    }

    private initImage(): void {
        this.setScale(0.20);
        this.setSize(20, 20);
        this.setAlpha(1);
        this.setFlip(true, true);
        this.setOrigin(0.4, 0.4);
    }

    private initText() {
        // @ts-ignore
        this.textObj = this.scene.add.rexBBCodeText(-100, this.y - 25, this.assignedWord, {
            fontSize: '18px',
            align: 'center',
            stroke: 'red',
            strokeThickness: 1,
        });
        this.textObj.x = this.x - this.textObj.width / 2;

        // `123456[color=blue]AA[/color]
        // [i][color=red]B
        // B[/color][b]CC[/b][/i]DD[size=10]D[size=20]D[size=30][u]D[size=40]D[/u][size=50]D[/size]D
        // [size=20][u=red]EEE[/u][/size][shadow]FFF[/shadow][color=none][stroke]GGG[/stroke][stroke=blue]GGG[/stroke]`;
    }

    public tryDamage(key: string): boolean {
        if (key === this.nextLetter) {
            this.letterIndex++;
            if (this.letterIndex >= this.assignedWord.length) {
                return true; // it dead
            }

            this.nextLetter = this.assignedWord[this.letterIndex];
            const redText = this.assignedWord.substr(0, this.letterIndex);
            const blackText = this.assignedWord.substring(this.letterIndex, this.assignedWord.length);
            this.textObj.setText("[color=red]" + redText + "[/color]" + blackText);

            return false;
        }
    }

    public death() {
        this.textObj.alpha = 0;
        this.alpha = 0;
    }

    update(): void {
        this.move();
    }

    private move(): void {
        this.y += this.walkingSpeed;
        this.textObj.y += this.walkingSpeed;
    }
}
