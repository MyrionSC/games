import { Component } from '@angular/core';
import 'phaser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Typecraft';

  /**
   * Game instance.
   */
  public game: Phaser.Game;

  /**
   * Game configuration.
   */
  public readonly gameConfig: GameConfig = {
    title: 'Typecraft',
    version: '1.0',
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: {
      create() {
        this.cameras.main.startFollow(this.add.text(0, 0, 'Just what do you think you\'re doing, Dave?').setOrigin(0.5), false);
      }
    }
  };

  /**
   * Instantiate application component.
   */
  public constructor() { }

  /**
   * Game ready event handler.
   *
   * @param game Game instance.
   */
  public onGameReady(game: Phaser.Game): void {
    this.game = game;
  }
}
