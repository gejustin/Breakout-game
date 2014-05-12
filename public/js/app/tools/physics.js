define([], function() {
    var Physics = {
        
        // Calculates and returns velocity in a single dimension.
        calculateVelocity: function(speed, dimension, angle) {
            if (dimension === 'X') {
                return speed * Math.cos(angle * (Math.PI / 180));
            } else {
                return -speed * Math.sin(angle * (Math.PI / 180));
            }
        },
        
        // Determines where on the paddle the ball makes contact then sets the angle based on the distance from the center of the paddle.
        // The math here is mostly a convenience thing for the user to allow more control on the ball
        // Always returns at least a 10 degree angle in either direction so the ball doesn't get stuck in a horizontal path.
        
        calcuateAngle: function(game, ball) {
            var paddleCenter = game.entities.player.X + (game.entities.player.width / 2),
                hypotenuse = game.entities.player.width / 2,
                adjacent, degrees;
            
            if (ball.boundary.right >= game.entities.player.X && ball.position.X <= paddleCenter) {
                adjacent = paddleCenter - ball.position.X;
                
                degrees = Math.acos(adjacent / hypotenuse) * (180 / Math.PI);

                return degrees > 5 ? 180 - degrees : 170;
            } else {
                adjacent = ball.position.X - paddleCenter;

                degrees = Math.acos(adjacent / hypotenuse) * (180 / Math.PI);
                return degrees > 5 ? degrees : 10;
            }
        }
    };

    return Physics;
});