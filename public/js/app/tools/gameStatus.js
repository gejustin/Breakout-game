﻿define([], function() {
    var GameStatus = {
        'MENU': 0,
        'PLAYING': 1,
        'PAUSED': 2,
        'GAME_OVER_WON': 3,
        'GAME_OVER_LOST': 4
    };

    return GameStatus;
});