"use strict";

$('#game > .background').html( renderBackground( _GAME ) );

$('#game > .battlefield').html( renderBattlefield( _GAME ) );

$('body').keydown(function(e){
    var key = e.keyCode;

    // nustatyti kuris zaidejas ir kuria kryptimi nori vaziuoti
    tankAction( key, _GAME.players );
});



var _GAME_CLOCK = setInterval( doAnimations, _GAME.clock_step );