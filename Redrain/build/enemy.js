var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./game", "./AnimatedObject"], function (require, exports, game_1, AnimatedObject_1) {
    "use strict";
    exports.__esModule = true;
    exports.Enemy = void 0;
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        function Enemy(Canvas, Ctx, G, PosX) {
            return _super.call(this, Canvas, Ctx, G, "rgb(180, 0, 0)", PosX, -10, 15 + Math.random() * 10, (0.5 + Math.random() * 0.2) * game_1.Game.multiplier) || this;
        }
        Enemy.prototype.move = function () {
            this.posY += this.moveSpeed;
            if (this.posY > this.game.height) {
                this.game.loss();
            }
        };
        Enemy.prototype.remove = function () {
            this.game.gameObjects.splice(this.game.gameObjects.indexOf(this), 1);
            this.game.enemies.splice(this.game.enemies.indexOf(this), 1);
        };
        Enemy.prototype.death = function () {
        };
        return Enemy;
    }(AnimatedObject_1.AnimatedObject));
    exports.Enemy = Enemy;
});
