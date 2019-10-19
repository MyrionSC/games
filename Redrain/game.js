define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Game = /** @class */ (function () {
        function Game(Canvas, Ctx) {
            this.width = 500;
            this.height = 500;
            this.offsetX = 208;
            this.offsetY = 58;
            this.mouseDown = false;
            this.mouseX = 0;
            this.mouseY = 0;
            this.shotDelay = 100; // ms
            this.shotCooldown = 0;
            this.enemySpawnDelay = 50;
            this.enemySpawnCooldown = 0;
            this.score = 0;
            this.gameObjects = new Array();
            this.projectiles = new Array();
            this.enemies = new Array();
            this.canvas = Canvas;
            this.ctx = Ctx;
        }
        Game.prototype.loss = function () {
            this.gameObjects = new Array();
            this.projectiles = new Array();
            this.enemies = new Array();
            this.player.posX = 250;
            this.player.posY = 400;
            this.gameObjects.push(this.player);
            this.ctx.clearRect(0, 0, this.width, this.height);
            alert("you have lost the game. Your final score was " + this.score);
            Game.multiplier = 1;
            this.score = 0;
        };
        Game.prototype.drawScore = function () {
            this.ctx.font = "30px Arial";
            this.ctx.fillStyle = "rgb(0,0,0)";
            this.ctx.fillText(this.score.toString(), 425, 50);
        };
        Game.prototype.clearScore = function () {
            this.ctx.clearRect(425, 20, 100, 50);
        };
        Game.multiplier = 2;
        return Game;
    }());
    exports.Game = Game;
});
//# sourceMappingURL=game.js.map