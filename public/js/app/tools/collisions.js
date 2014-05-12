define(['app/tools/maths'], function(Maths) {
    var Collisions = {
        hitBottom: function(ball, rectangle) {
            return Maths.intersection(ball, rectangle.boundary.bottom, 'Y') && (ball.boundary.right >= rectangle.boundary.left && ball.boundary.left <= rectangle.boundary.right);
        },
        hitTop: function(ball, rectangle) {
            return Maths.intersection(ball, rectangle.boundary.top, 'Y') && (ball.boundary.right >= rectangle.boundary.left && ball.boundary.left <= rectangle.boundary.right);
        },
        hitLeft: function(ball, rectangle) {
            return Maths.intersection(ball, rectangle.boundary.left, 'X') && (ball.boundary.top <= rectangle.boundary.bottom && ball.boundary.bottom >= rectangle.boundary.top);
        },
        hitRight: function(ball, rectangle) {
            return Maths.intersection(ball, rectangle.boundary.right, 'X') && (ball.boundary.top <= rectangle.boundary.bottom && ball.boundary.bottom >= rectangle.boundary.top);
        }
    };

    return Collisions;
});