define(['app/objects/paddle', 'app/objects/brick', 'app/objects/ball'], function(Paddle, Brick, Ball) {
    var Level = function() {

    };

    Level.prototype = (function() {
        var init = function() {
            
            // Most of this will be replaced when a real level system is implemented, this is a temporary hack to scale everything based on the browser's window size.
            var player = {
                width: this.canvas.width * 0.107421875,
                height: this.canvas.height * 0.01953125,
                speed: 11 / 110 * this.canvas.width * 0.107421875
                    
            };
            this.entities.player = new Paddle(this.canvas, player.width, player.height, player.speed, '#3B3C42', 'black');
            var brick = {
                x: this.canvas.width * 0.0625,
                y: this.canvas.height * 0.08333333333333333333333333333333,
                width: this.canvas.width * 0.060546875,
                height: this.canvas.height * 0.01953125
            },
                ball = {
                    x: this.canvas.width / 2,
                    y: this.entities.player.Y - (this.canvas.height * .25),
                    radius: Math.sqrt((49 * this.canvas.width * this.canvas.height) / (1024 * 768)),
                    speed: 11 / 7 * Math.sqrt((49 * this.canvas.width * this.canvas.height) / (1024 * 768))
                };
            this.entities.ball = new Ball(ball.x, ball.y, ball.radius, ball.speed, '#3B3C42', 'black');
            this.entities.bricks = [];
            for (var i = 0; i < 14; i++) {

                for (var j = 0; j < 5; j++) {
                    this.entities.bricks.push(new Brick(i * brick.x + brick.x, j * brick.y + brick.y, brick.width, brick.height, '#3B3C42', 'black'));
                }

            }
        };
        return {
            init: init
        };
    })();

    return Level;
});