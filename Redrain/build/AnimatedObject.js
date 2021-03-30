define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.AnimatedObject = void 0;
    var AnimatedObject = /** @class */ (function () {
        function AnimatedObject(Canvas, Ctx, G, FillStyle, PosX, PosY, Width, MoveSpeed) {
            this.canvas = Canvas;
            this.ctx = Ctx;
            this.game = G;
            this.fillStyle = FillStyle;
            this.posX = PosX;
            this.posY = PosY;
            this.width = Width;
            this.moveSpeed = MoveSpeed;
            this.id = AnimatedObject.idCounter++;
        }
        AnimatedObject.prototype.draw = function () {
            this.ctx.beginPath();
            this.ctx.fillStyle = this.fillStyle;
            this.ctx.arc(this.posX, this.posY, this.width, 0, 2 * Math.PI);
            this.ctx.fill();
        };
        AnimatedObject.prototype.clear = function () {
            this.ctx.clearRect(this.posX - this.width - 2, this.posY - this.width - 2, this.width * 2 + 4, this.width * 2 + 4);
        };
        ;
        AnimatedObject.prototype.move = function () { };
        ;
        AnimatedObject.prototype.remove = function () { };
        ;
        AnimatedObject.idCounter = 0;
        return AnimatedObject;
    }());
    exports.AnimatedObject = AnimatedObject;
});
