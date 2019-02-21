"use strict";

function renderBackground( data ) {
    var HTML = '';
    for ( var w=0; w<data.map.width; w++ ) {
        for ( var h=0; h<data.map.height; h++ ) {
            HTML += `<div style="background-image: url(img/background/${data.background});"></div>`;
        }
    }
    return HTML;
}


function renderBattlefield( data ) {
    var HTML = '',
        x = 0,
        y = 0;

    // bazes
    for ( var i=0; i<data.players.length; i++ ) {
        console.log( data.players[i] );
        x = 50 * ( data.players[i].base.position.x - 1 );
        y = 50 * ( data.players[i].base.position.y - 1 );
        HTML += `<div class="base" style="left: ${x}px; top: ${y}px; background-image: url(img/battlefield/${data.players[i].base.image});"></div>`;
    }

    // zaideju tankai
    for ( var i=0; i<data.players.length; i++ ) {
        console.log( data.players[i] );
        x = 50 * ( data.players[i].tank.position.x - 1 );
        y = 50 * ( data.players[i].tank.position.y - 1 );
        HTML += `<div class="tank rotation-${data.players[i].tank.rotation}" style="left: ${x}px; top: ${y}px; background-image: url(img/battlefield/${data.players[i].tank.image});"></div>`;
    }

    return HTML;
}


function tankAction( key_pressed, players ) {
    var player = false,
        action = false;

    // rasti kuriam zaidejui priskirtas sitas mygtukas
        // koks veiksmas

    for ( var i=0; i<players.length; i++ ) {
        // var keys = Object.keys(players[i].tank.keyboard);
        // for ( var k=0; k<keys.length; k++ ) {
        //     if ( players[i].tank.keyboard[ keys[k] ] === key_pressed ) {
        //         player = i;
        //         action = keys[k];
        //     }
        // }

        for (const key in players[i].tank.keyboard) {
            if ( players[i].tank.keyboard[ key ] === key_pressed ) {
                player = i;
                action = key;
            }
        }
    }

    console.log( 'Player: '+player+' do action: '+action );
}