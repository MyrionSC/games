import {Component, OnInit} from '@angular/core';
// import {Phaser} from 'phaser';
import * as Phaser from 'phaser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Typescript';
    game: Phaser.Game;
    config: Phaser.Config;

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
            preload: this.preload,
            create: this.create
        });
    }


    ngOnInit(): void {
        console.log(Phaser);
        // this.config = {
        //     type: Phaser.AUTO,
        //     width: 800,
        //     height: 600,
        //     physics: {
        //         default: 'arcade',
        //         arcade: {
        //             gravity: {y: 200}
        //         }
        //     },
        //     scene: {
        //         preload: this.preload,
        //         create: this.create
        //     }
        // };
        // this.game = new Phaser.Game(this.config);

    }

    preload() {
        this.game.load.image('logo', 'assets/grindhead-logo.jpg');
    }

    create() {
        let logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
    }
}
