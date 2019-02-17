define(["require", "exports", './player', './game'], function (require, exports, player_1, game_1) {
    // init variables
    var canvas = document.getElementById("canvas1");
    var ctx = canvas.getContext("2d");
    var keys = new Array();
    var game = new game_1.Game();
    var player = new player_1.Player(canvas, ctx, keys, game);
    var gameObjects = new Array();
    gameObjects.push(player);
    // start animation
    animate();
    function animate() {
        window.requestAnimationFrame(animate);
        clear();
        calculateMovement();
        draw();
    }
    function clear() {
        for (var _i = 0; _i < gameObjects.length; _i++) {
            var obj = gameObjects[_i];
            obj.clear();
        }
    }
    function calculateMovement() {
        for (var _i = 0; _i < gameObjects.length; _i++) {
            var obj = gameObjects[_i];
            obj.move();
        }
    }
    function draw() {
        for (var _i = 0; _i < gameObjects.length; _i++) {
            var obj = gameObjects[_i];
            obj.draw();
        }
    }
    window.onkeydown = function (e) { keys[e.keyCode] = true; };
    window.onkeyup = function (e) { keys[e.keyCode] = false; };
});
//# sourceMappingURL=main.js.map