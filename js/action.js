"use strict";

$('#game > .background').html( renderBackground( game ) );

$('#game > .battlefield').html( renderBattlefield( game ) );

$('body').keyup(function(e){
    var key = e.keyCode;

    // nustatyti kuris zaidejas ir kuria kryptimi nori vaziuoti
    tankAction( key, game.players );
});