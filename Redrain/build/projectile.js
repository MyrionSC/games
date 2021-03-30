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
define(["require", "exports", "./AnimatedObject"], function (require, exports, AnimatedObject_1) {
    "use strict";
    exports.__esModule = true;
    exports.Projectile = void 0;
    var Projectile = /** @class */ (function (_super) {
        __extends(Projectile, _super);
        function Projectile(Canvas, Ctx, G, PosX, PosY) {
            return _super.call(this, Canvas, Ctx, G, "rgb(0,0,0)", PosX, PosY, 5, 9) || this;
        }
        Projectile.prototype.move = function () {
            this.posX += this.moveX;
            this.posY += this.moveY;
            if (this.posX < 0 || this.posX > this.game.width || this.posY < 0 || this.posY > this.game.height) {
                this.game.gameObjects.splice(this.game.gameObjects.indexOf(this), 1);
                this.game.projectiles.splice(this.game.projectiles.indexOf(this), 1);
            }
        };
        return Projectile;
    }(AnimatedObject_1.AnimatedObject));
    exports.Projectile = Projectile;
});
