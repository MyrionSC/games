define(["require", "exports"], function (require, exports) {
    var Player = (function () {
        function Player(Canvas, Ctx, Keys, G) {
            this.posX = 250;
            this.posY = 400;
            this.width = 10;
            this.moveSpeed = 6;
            this.canvas = Canvas;
            this.ctx = Ctx;
            this.keys = Keys;
            this.game = G;
        }
        Player.prototype.draw = function () {
            this.ctx.beginPath();
            // this.ctx.fillStyle = "(0, 107, 17)";
            this.ctx.fillStyle = "rgb(0, 107, 17)";
            this.ctx.arc(this.posX, this.posY, this.width, 0, 2 * Math.PI);
            this.ctx.fill();
        };
        Player.prototype.clear = function () {
            this.ctx.clearRect(this.posX - this.width - 2, this.posY - this.width - 2, this.width * 2 + 4, this.width * 2 + 4);
        };
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
    })();
    exports.Player = Player;
});
//# sourceMappingURL=player.js.map