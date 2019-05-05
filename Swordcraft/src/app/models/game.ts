import 'phaser';
import {GameScene} from './scenes/gameScene';
import {MenuScene} from "./scenes/menuScene";

const config: GameConfig = {
    title: 'Swordcraft',
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
        default: 'matter',
        matter: {
            gravity: {
                x: 0,
                y: 0
            },
            debug: false
        }
    },
    parent: 'game',
    scene: [MenuScene, GameScene],
    input: {
        keyboard: true,
        mouse: true,
        touch: false,
        gamepad: false
    },
    backgroundColor: '#222222'
    // backgroundColor: '#3A99D9'
};

export class Game extends Phaser.Game {
    constructor() {
        super(config);
    }
}
