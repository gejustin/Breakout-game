define([], function() {
    var Maths = {
        
         // Checks whether or not the ball and the horizontal or vertical line created by the boundaries of any rectangluar 
         // object intersect.
         
        intersection: function(ball, boundary, dimension) {
            // 0 = Ax^2 + Bx + C    
            var A = 1,
                B = -2 * ball.position[dimension],
                C = Math.pow(ball.position[dimension], 2) + Math.pow(boundary, 2) - (2 * boundary * ball.position[dimension]) + Math.pow(ball.position[dimension], 2) - Math.pow(ball.radius, 2);

            if (Math.pow(B, 2) - 4 * A * C >= 0) {
                return true;
            }
            return false;
        }
    };

    return Maths;
});