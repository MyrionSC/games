define(["require", "exports", "./player", "./projectile", "./enemy", "./game"], function (require, exports, player_1, projectile_1, enemy_1, game_1) {
    "use strict";
    exports.__esModule = true;
    // init variables
    var canvas = document.getElementById("canvas1");
    var ctx = canvas.getContext("2d");
    var game = new game_1.Game(canvas, ctx);
    game.keys = new Array();
    game.player = new player_1.Player(canvas, ctx, game.keys, game);
    game.gameObjects.push(game.player);
    // start animation
    animate();
    function animate() {
        window.requestAnimationFrame(animate);
        game.score++;
        if (game.score % 500 === 0) {
            game_1.Game.multiplier += 0.25;
        }
        var d = new Date();
        tryShootProjectile(d, game.mouseX, game.mouseY);
        spawnEnemy(d);
        clear();
        collisionDetection();
        calculateMovement();
        draw();
    }
    function clear() {
        for (var _i = 0, _a = game.gameObjects; _i < _a.length; _i++) {
            var obj = _a[_i];
            obj.clear();
        }
        game.clearScore();
    }
    function calculateMovement() {
        for (var _i = 0, _a = game.gameObjects; _i < _a.length; _i++) {
            var obj = _a[_i];
            obj.move();
        }
    }
    function draw() {
        for (var _i = 0, _a = game.gameObjects; _i < _a.length; _i++) {
            var obj = _a[_i];
            obj.draw();
        }
        game.drawScore();
    }
    function collisionDetection() {
        // if player hits an enemy, loss
        for (var _i = 0, _a = game.enemies; _i < _a.length; _i++) {
            var e = _a[_i];
            var p = game.player;
            var a = p.posX - e.posX;
            var b = p.posY - e.posY;
            var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
            if (c < p.width + e.width) {
                game.loss();
            }
        }
        // if projectile hits enemy, enemy disapears
        for (var _b = 0, _c = game.projectiles; _b < _c.length; _b++) {
            var p_1 = _c[_b];
            for (var _d = 0, _e = game.enemies; _d < _e.length; _d++) {
                var e = _e[_d];
                var a = p_1.posX - e.posX;
                var b = p_1.posY - e.posY;
                var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
                if (c < p_1.width + e.width) {
                    e.remove();
                }
            }
        }
    }
    function spawnEnemy(d) {
        if (game.enemySpawnCooldown < d.getTime()) {
            game.enemySpawnCooldown = d.getTime() + game.enemySpawnDelay;
            var x = (Math.random() * (game.width - 20)) + 10;
            var enemy = new enemy_1.Enemy(canvas, ctx, game, x);
            game.gameObjects.push(enemy);
            game.enemies.push(enemy);
        }
    }
    function tryShootProjectile(d, mouseX, mouseY) {
        if (game.mouseDown) {
            if (game.shotCooldown < d.getTime()) {
                game.shotCooldown = d.getTime() + game.shotDelay;
                shootProjectile(mouseX, mouseY);
            }
        }
    }
    function shootProjectile(mouseX, mouseY) {
        var projectile = new projectile_1.Projectile(canvas, ctx, game, game.player.posX, game.player.posY);
        var a = (mouseX - game.offsetX) - game.player.posX;
        var b = (mouseY - game.offsetY) - game.player.posY;
        var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        var d = projectile.moveSpeed / c;
        projectile.moveX = a * d;
        projectile.moveY = b * d;
        game.gameObjects.push(projectile);
        game.projectiles.push(projectile);
    }
    // eventhandlers
    window.onkeydown = function (e) { game.keys[e.keyCode] = true; };
    window.onkeyup = function (e) { game.keys[e.keyCode] = false; };
    window.onmousedown = function (e) {
        game.mouseDown = true;
    };
    window.onmouseup = function (e) {
        game.mouseDown = false;
    };
    window.onmousemove = function (e) {
        game.mouseX = e.clientX;
        game.mouseY = e.clientY;
    };
});
