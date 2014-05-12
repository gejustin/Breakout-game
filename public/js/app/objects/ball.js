define(['app/tools/physics', 'app/tools/gameStatus', 'app/tools/maths', 'app/tools/collisions'], function(Physics, GameStatus, Maths, Collisions) {
    var Ball = function(x, y, radius, speed, fillColor, strokeColor) {
        this.position = {
            X: x,
            Y: y
        };
        this.radius = radius;
        this.velocity = {
            magnitude: speed,
            angle: null,
            X: 0,
            Y: 6
        };
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
    };

    Ball.prototype = (function() {
        var updateVelocity = function() {
            this.velocity.X = Physics.calculateVelocity(this.velocity.magnitude, 'X', this.velocity.angle);
            this.velocity.Y = Physics.calculateVelocity(this.velocity.magnitude, 'y', this.velocity.angle);
        },
            updatePosition = function(rectangle, side, buffer, isCanvas) {
                switch (side) {
                    case 'right':
                        this.position.X = rectangle.boundary.right - (this.radius + buffer);
                        break;
                    case 'left':
                        this.position.X = rectangle.boundary.left + this.radius + buffer;
                        break;
                    case 'top':
                        if (isCanvas) {
                            this.position.Y = rectangle.boundary.top + this.radius + buffer;
                        } else {
                            this.position.Y = rectangle.boundary.top - (this.radius + buffer);
                        }
                        break;
                    case 'bottom':
                        this.position.Y = rectangle.boundary.bottom + this.radius + buffer;
                        break;
                    default:
                }
            },
            updateAngle = function(sideOfHit) {
                switch (sideOfHit) {
                case 'right':
                case 'left':
                    this.velocity.angle = 180 - this.velocity.angle;
                    break;
                case 'top':
                case 'bottom':
                    this.velocity.angle = 360 - this.velocity.angle;
                    break;
                default:
                    break;
                }
            },
        updateBoundaries = function() {
            this.boundary = {
                right: this.position.X + this.radius,
                left: this.position.X - this.radius,
                top: this.position.Y - this.radius,
                bottom: this.position.Y + this.radius
            };
        },
            checkCanvasWalls = function(game) {
                var collision = {};
                if (Collisions.hitRight(this, game.canvas)) {
                    collision.hit = true;
                    collision.side = 'right';
                } else if (Collisions.hitLeft(this, game.canvas)) {
                    collision.hit = true;
                    collision.side = 'left';
                } 
                if (Collisions.hitBottom(this, game.canvas)) {
                    collision.hit = true;
                    collision.side = 'bottom';
                } else if (Collisions.hitTop(this, game.canvas)) {
                    collision.hit = true;
                    collision.side = 'top';
                }

                if (collision.hit) {
                    updatePosition.call(this, game.canvas, collision.side, 1, true);
                    updateAngle.call(this, collision.side);
                    updateVelocity.call(this);
                    if (collision.side === 'bottom') {
                        game.status = GameStatus.GAME_OVER_LOST;
                    }
                }
            },
            checkPaddle = function(game) {
                var collision = {};
                if (Collisions.hitTop(this, game.entities.player)) {
                    collision.hit = true;
                    collision.side = 'top';
                    this.velocity.angle = Physics.calcuateAngle(game, this);
                }
                if (Collisions.hitLeft(this, game.entities.player)) {
                    collision.hit = true;
                    collision.side = 'left';
                    this.velocity.angle = 165;
                } else if (Collisions.hitRight(this, game.entities.player)) {
                    collision.hit = true;
                    collision.side = 'right';
                    this.velocity.angle = 15;
                }

                if (collision.hit) {
                    updatePosition.call(this, game.entities.player, collision.side, 1);
                    updateVelocity.call(this);
                }
            },
            checkBricks = function(game) {
                if (game.entities.bricks.length === 0) {
                    game.status = GameStatus.GAME_OVER_WON;
                }
                for (var i = game.entities.bricks.length - 1; i >= 0; i--) {
                    var brick = game.entities.bricks[i];

                    var collision = {};
                    if (Collisions.hitRight(this, brick)) {
                        collision.hit = true;
                        collision.side = 'right';
                    } else if (Collisions.hitLeft(this, brick)) {
                        collision.hit = true;
                        collision.side = 'left';
                    }
                    if (Collisions.hitBottom(this, brick)) {
                        collision.hit = true;
                        collision.side = 'bottom';
                    } else if (Collisions.hitTop(this, brick)) {
                        collision.hit = true;
                        collision.side = 'top';
                    }

                    if (collision.hit) {
                        updatePosition.call(this, brick, collision.side, 1);
                        updateAngle.call(this, collision.side);
                        updateVelocity.call(this);
                        game.entities.bricks.splice(i, 1);
                        break;
                    }
                }
            },
        update = function(game, dt) {
            updateBoundaries.call(this);
            checkCanvasWalls.call(this, game);
            checkPaddle.call(this, game);
            checkBricks.call(this, game);

            this.position.X += this.velocity.X * dt;
            this.position.Y += this.velocity.Y * dt;
        },

            draw = function(game) {
                game.ctx.fillStyle = this.fillColor;
                game.ctx.strokeStyle = this.strokeColor;
                game.ctx.beginPath();
                game.ctx.arc(this.position.X, this.position.Y, this.radius, 0, 2 * Math.PI, true);
                game.ctx.stroke();
                game.ctx.fill();
                game.ctx.closePath();

            };

        return {
            draw: draw,
            update: update
        };
    })();

    return Ball;
});