import { Component, OnInit } from '@angular/core';
import {Game} from './models/game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor() {
      const game = new Game();
    }
}
