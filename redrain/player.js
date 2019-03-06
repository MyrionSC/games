var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./AnimatedObject"], function (require, exports, AnimatedObject_1) {
    "use strict";
    exports.__esModule = true;
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        function Player(Canvas, Ctx, Keys, G) {
            var _this = _super.call(this, Canvas, Ctx, G, "rgb(0, 107, 17)", 250, 400, 10, 6) || this;
            _this.keys = Keys;
            return _this;
        }
        Player.prototype.move = function () {
            if (this.keys[38] === true || this.keys[87] === true) {
                if (this.posY > this.width) {
                    this.posY += -this.moveSpeed;
                }
            }
            if (this.keys[39] === true || this.keys[68] === true) {
                if (this.posX < this.game.width - this.width) {
                    this.posX += this.moveSpeed;
                }
            }
            if (this.keys[40] === true || this.keys[83] === true) {
                if (this.posY < this.game.height - this.width) {
                    this.posY += this.moveSpeed;
                }
            }
            if (this.keys[37] === true || this.keys[65] === true) {
                if (this.posX > this.width) {
                    this.posX += -this.moveSpeed;
                }
            }
        };
        return Player;
    }(AnimatedObject_1.AnimatedObject));
    exports.Player = Player;
});
//# sourceMappingURL=player.js.map