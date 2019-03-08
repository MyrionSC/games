import 'phaser';
import {GameScene} from './scenes/gameScene';

const config: GameConfig = {
    title: 'Typescript',
    url: '',
    version: '0.1',
    width: 480,
    height: 840,
    type: Phaser.AUTO,
    parent: 'game',
    scene: [GameScene],
    input: {
        keyboard: true,
        mouse: true,
        touch: false,
        gamepad: false
    },
    backgroundColor: '#3A99D9'
};

export class Game extends Phaser.Game {
    constructor() {
        super(config);
    }
}
