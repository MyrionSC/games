import 'phaser';
import MainScene from "./MainScene";

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: MainScene
};

const game = new Phaser.Game(config);
