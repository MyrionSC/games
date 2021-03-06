export default class MainScene extends Phaser.Scene
{
    constructor ()
    {
        super('demo');
    }

    preload ()
    {
        // this.load.image('logo', 'assets/phaser3-logo.png');
        // this.load.image('libs', 'assets/libs.png');
        // this.load.glsl('bundle', 'assets/plasma-bundle.glsl.js');
        // this.load.glsl('stars', 'assets/starfields.glsl.js');

        this.load.image('command-center', 'assets/TerranCCBlue.png');
    }

    create ()
    {
        // this.add.shader('RGB Shift Field', 0, 0, 800, 600).setOrigin(0);
        // this.add.shader('Plasma', 0, 412, 800, 172).setOrigin(0);
        // this.add.image(400, 300, 'libs');
        // const logo = this.add.image(400, 70, 'logo');

        const cc = this.add.image(400, 70, 'command-center');

        this.tweens.add({
            targets: cc,
            y: 350,
            duration: 1500,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        })
    }
}
