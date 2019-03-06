/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Coin Runner
 * @license      Digitsensitive
 */

import 'phaser';
import {GameScene} from './scenes/gameScene';

const config: GameConfig = {
    title: 'Typescript',
    url: '',
    version: '1.1',
    width: 768 * 1.5,
    height: 576 * 1.5,
    type: Phaser.AUTO,
    parent: 'game',
    scene: [GameScene],
    input: {
        keyboard: true,
        mouse: false,
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

// window.onload = () => {
//   const game = new Game();
// };
