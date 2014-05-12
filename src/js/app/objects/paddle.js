define([], function() {
    var Paddle = function(canvas, width, height, velocity, fillColor, strokeColor) {
        this.X = canvas.width/2 - width/2;
        this.Y = canvas.height - height;
        this.height = height;
        this.width = width;
        this.velocity = velocity;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.keyState = {};
        this.boundary = {
            right: this.X + this.width,
            left: this.X,
            top: this.Y,
            bottom: this.Y + this.height
        };
        this.init();
    };

    Paddle.prototype = (function() {
        var update = function(game, dt) {
            updateBoundaries.call(this);
            checkKeyState.call(this, dt);
            checkCanvasWalls.call(this, game);
        },
            checkKeyState = function(dt) {
                if (this.keyState[37]) {
                    this.X -= this.velocity * dt;
                }
                if (this.keyState[39]) {
                    this.X += this.velocity * dt;
                }
            },
            checkCanvasWalls = function(game) {
                if (this.X <= game.canvas.boundary.left) {
                    this.X = game.canvas.boundary.left;
                } else if (this.X + this.width >= game.canvas.boundary.right) {
                    this.X = game.canvas.boundary.right - this.width;
                }
            },
        draw = function(game) {
            game.ctx.beginPath();
            game.ctx.fillStyle = this.fillColor;
            game.ctx.strokeStyle = this.strokeColor;
            game.ctx.fillRect(this.X, this.Y, this.width, this.height);
            game.ctx.strokeRect(this.X, this.Y, this.width, this.height);
            game.ctx.closePath();
        },
            init = function() {
                var self = this;
                window.addEventListener('keydown', function(e) {
                    if (e.keyCode === 37 || e.keyCode === 39) {
                        e.preventDefault();
                        self.keyState[e.keyCode] = true;
                    }
                }, false);
                window.addEventListener('keyup', function(e) {
                    e.preventDefault();
                    delete self.keyState[e.keyCode];
                }, false);
            },
            updateBoundaries = function() {
                this.boundary = {
                    right: this.X + this.width,
                    left: this.X,
                    top: this.Y,
                    bottom: this.Y + this.height
                };
            };
        return {
            update: update,
            draw: draw,
            init: init
        };
    })();

    return Paddle;
});