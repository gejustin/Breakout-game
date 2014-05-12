define(['app/objects/ball', 'app/objects/brick', 'app/objects/paddle', 'app/tools/gameStatus', 'app/objects/level'], function(Ball, Brick, Paddle, GameStatus, Level) {
    var Game = function() {
        this.entities = {};
    };

    Game.prototype = (function() {
        var clearCanvas = function() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
            draw = function() {
                this.ctx.save();
                this.entities.ball.draw(this);
                for (var i = 0; i < this.entities.bricks.length; i++) {
                    this.entities.bricks[i].draw(this);
                }
                this.entities.player.draw(this);
                this.ctx.restore();
            },
            init = function(canvas) {
                setAnimFrame();
                this.canvas = document.getElementById(canvas);
                this.canvas.width = window.innerWidth * 0.53333333333333333333333333333333;
                this.canvas.height = window.innerHeight * 0.71111111111111111111111111111111;
                this.canvas.boundary = {
                    right: this.canvas.width,
                    left: 0,
                    top: 0,
                    bottom: this.canvas.height
                };
                this.ctx = this.canvas.getContext('2d');

                this.entities.level = new Level();
                this.entities.level.init.call(this);

                this.status = GameStatus.PLAYING;
                this.run();
            },
            run = function() {
                var self = this,
                dt, prevTimeStamp = 0;

                var gameLoop = function(timeStamp) {
                    // Normalizes the timeStamp for later position calculations
                    dt = (timeStamp - prevTimeStamp) / (1000 / 60);
                    prevTimeStamp = timeStamp;
                    self.clearCanvas();
                    self.update(dt);
                    self.draw();
                    
                    // Temp "Game Over" situation for testing
                    switch (self.status) {
                    case GameStatus.PLAYING:
                        window.requestAnimFrame(gameLoop, canvas);
                        break;
                    case GameStatus.GAME_OVER_LOST:
                        // Obviously would transition to something more elegant
                        alert('You lose, press f5 to reset');
                        break;
                    case GameStatus.GAME_OVER_WON:
                        alert('You won!');
                        break;
                    default:
                        break;
                    }
                };
                window.requestAnimFrame(gameLoop, canvas);
            },
            // requestAnimationFrame Polyfill, falls back to setTimeout
            setAnimFrame = function() {
                window.requestAnimFrame = (function() {
                    return window.requestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.oRequestAnimationFrame ||
                            window.msRequestAnimationFrame ||
                            function(callback) {
                                window.setTimeout(callback, 1000 / 60);
                            };
                })();
            },
        update = function(dt) {
            this.entities.ball.update(this, dt);
            for (var i = 0; i < this.entities.bricks.length; i++) {
                this.entities.bricks[i].update(this, dt);
            }
            this.entities.player.update(this, dt);
        };

        return {
            clearCanvas: clearCanvas,
            draw: draw,
            init: init,
            run: run,
            update: update
        };

    })();

    return Game;
});