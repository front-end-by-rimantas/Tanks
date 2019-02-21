"use strict";

$('#game > .background').html( renderBackground( _GAME ) );

$('#game > .battlefield').html( renderBattlefield( _GAME ) );

$('body').keydown(function(e){
    var key = e.keyCode,
        player,
        action,
        validPlayerAction;

    // nustatyti kuris zaidejas ir kuria kryptimi nori vaziuoti
    
    validPlayerAction = validPlayerKeyPress( key );

    player = validPlayerAction[0];
    action = validPlayerAction[1];
    if ( player !== false && action !== false ) {
        _GAME.players[player].tank.action = key;
    }
    
    tankAction( key, _GAME.players );
});

$('body').keyup(function(e){
    var key = e.keyCode,
        player,
        action,
        validPlayerAction;
    validPlayerAction = validPlayerKeyPress( key );

    player = validPlayerAction[0];
    action = validPlayerAction[1];
    if ( player !== false && action !== false ) {
        _GAME.players[player].tank.action = '';
    }
});



var _GAME_CLOCK = setInterval( doAnimations, _GAME.clock_step );


// var map = {}; // You could also use an array
// onkeydown = onkeyup = function(e){
//     e = e || event; // to deal with IE
//     map[e.keyCode] = e.type == 'keydown';
//     /* insert conditional here */
// }