import 'phaser';
import {GameScene} from './scenes/gameScene';

const config: GameConfig = {
    title: 'Typescript',
    url: '',
    version: '0.1',
    width: 900,
    height: 900,
    type: Phaser.AUTO,
    // render: {
    //     pixelArt: false,
    //     antialias: true
    // },
    physics: {
        default: 'impact',
        impact: {
            debug: true
        }
    },
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
