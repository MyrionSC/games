import 'phaser';
import {GameScene} from './scenes/gameScene';
import {MenuScene} from "./scenes/menuScene";
import {CoopScene} from "./scenes/coopScene";

const config: GameConfig = {
    title: 'Swordcraft',
    url: 'marand.dk/swordcraft',
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
    scene: [MenuScene, GameScene, CoopScene], // MenuScene is first so starts up first
    input: {
        keyboard: true,
        mouse: true,
        touch: false,
        gamepad: false
    },
    backgroundColor: '#222222'
};

export class Game extends Phaser.Game {
    constructor() {
        super(config);
    }
}
