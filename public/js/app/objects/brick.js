define([], function() {
    var Brick = function(x, y, width, height, fillColor, strokeColor) {
        this.X = x;
        this.Y = y;
        this.height = height;
        this.width = width;
        this.boundary = {
            right: this.X + this.width,
            left: this.X,
            top: this.Y,
            bottom: this.Y + this.height
        };
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
    };
    
    Brick.prototype = (function() {
        var update = function() {
            
            },
            draw = function(game) {
                game.ctx.beginPath();
                game.ctx.fillStyle = this.fillColor;
                game.ctx.strokeStyle = this.strokeColor;
                game.ctx.rect(this.X, this.Y, this.width, this.height);
                game.ctx.fill();
                game.ctx.stroke();
                game.ctx.closePath();
            };

        return {
            draw: draw,
            update: update
        };
    })();

    return Brick;
});