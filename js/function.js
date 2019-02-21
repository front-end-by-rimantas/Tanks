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
        x = 50 * ( data.players[i].base.position.x );
        y = 50 * ( data.players[i].base.position.y );
        HTML += `<div id="base_${i}" class="base" style="left: ${x}px; top: ${y}px; background-image: url(img/battlefield/${data.players[i].base.image});"></div>`;
    }

    // zaideju tankai
    for ( var i=0; i<data.players.length; i++ ) {
        x = 50 * ( data.players[i].tank.position.x );
        y = 50 * ( data.players[i].tank.position.y );
        HTML += `<div id="tank_${i}" class="tank rotation-${data.players[i].tank.rotation}" style="left: ${x}px; top: ${y}px; background-image: url(img/battlefield/${data.players[i].tank.image});"></div>`;
    }

    return HTML;
}


function tankAction( key_pressed, players ) {
    var player = false,
        action = false,
        what_to_do,
        direction = {
            up: [0,-1],
            down: [0,1],
            right: [1,0],
            left: [-1,0]
        },
        new_position = [false, false];

    // rasti kuriam zaidejui priskirtas sitas mygtukas
        // koks veiksmas

    for ( var i=0; i<players.length; i++ ) {
        for (const key in players[i].tank.keyboard) {
            if ( players[i].tank.keyboard[ key ] === key_pressed ) {
                player = i;
                action = key;
                break;
            }
        }
        if ( player !== false && action !== false ) {
            break;
        }
    }

    if ( playerTankInMotion(player) ) {
        return;
    }

    switch ( action ) {
        case 'up':
        case 'down':
        case 'left':
        case 'right':
            what_to_do = allowedMove( players[player].tank.position, action, 'tank' );
            break;
        case 'fire':
            // sauname kulka
            what_to_do = allowedMove( players[player].tank.position, action, 'bullet' );
            break;
        default:
            break;
    }

    // priklausomai koks zaidejas ir ka galima daryti - reikia padaryti
    // vars: player + what_to_do

    if ( what_to_do[0] === true ) {
        new_position[0] = players[player].tank.position.x + direction[action][0];
        new_position[1] = players[player].tank.position.y + direction[action][1];
    }

    _GAME.animations.push( {
        object_type: 'tank',
        player: player,
        action: action,
        target_position: new_position
    } );

    // if ( what_to_do[0] === true ) {
    //     new_position[0] = players[player].tank.position.x + direction[action][0];
    //     new_position[1] = players[player].tank.position.y + direction[action][1];

    //     _GAME.players[player].tank.position.x = new_position[0];
    //     _GAME.players[player].tank.position.y = new_position[1];

    //     $('#tank_'+player).css('left', 50 * new_position[0] + 'px')
    //                     .css('top', 50 * new_position[1] + 'px');
    // }

    $('#tank_'+player).removeClass('rotation-down rotation-up rotation-right rotation-left')
                    .addClass('rotation-'+action);

    // console.log( 'Player: '+player+' do action: '+action );
}


function allowedMove( current_position, angle, object_type ) {
    var allowed = false,
        destroy = false,
        direction = {
            up: [0,-1],
            down: [0,1],
            right: [1,0],
            left: [-1,0]
        },
        wanna_go_to = {
            x: current_position.x + direction[angle][0],
            y: current_position.y + direction[angle][1]
        };

    // ar esu zaidimo lauko ribose
    if ( wanna_go_to.x > -1 &&
         wanna_go_to.x < _GAME.map.width &&
         wanna_go_to.y > -1 && 
         wanna_go_to.y < _GAME.map.height ) {
        // laisva
        allowed = true;
        destroy = false;
    } else {
        // uzimta arba zaidimo lauko riba
        allowed = false;
        destroy = false;
        return [ allowed, destroy ];
    }

    // ar ta kryptimi neuzlipsime ant kito objekto
    var object_cannot_step_above = [];
    for ( var i=0; i<_GAME.players.length; i++ ) {
        object_cannot_step_above.push( _GAME.players[i].base.position );
        object_cannot_step_above.push( _GAME.players[i].tank.position );
    }

    for ( var i=0; i<object_cannot_step_above.length; i++ ) {
        if ( wanna_go_to.x === object_cannot_step_above[i].x &&
             wanna_go_to.y === object_cannot_step_above[i].y ) {
           allowed = false;
           break;
       }
    }




    // // ar duota kryptimi yra laisvas langelis
    //     // ar norima kryptimi neislipame is zaidimo lauko ribu
    //     // ar ta kryptimi neuzlipsime ant kito objekto
    //     // leidziame judeti
    //     allowed = true;
    //     destroy = false;
    // // jeigu ne laisvas
    //     // tanko atveju sustojame
    //     allowed = false;
    //     destroy = false;
    //     // kulkos atveju tikriname ar gali priesais esanti objekta sunaikinti
    //     allowed = false;
    //     destroy = true;
    
    return [ allowed, destroy ];
}


function playerTankInMotion( player ) {
    var in_motion = false;

    for ( var i=0; i<_GAME.animations.length; i++ ) {
        if ( _GAME.animations[i].object_type === 'tank' &&
             _GAME.animations[i].player === player ) {
                in_motion = true;
                break;
        }
    }

    return in_motion;
}


function doAnimations() {
    var player = 0,
        direction = {
            up: [0,-1],
            down: [0,1],
            right: [1,0],
            left: [-1,0]
        },
        frames_per_second = 1000 / _GAME.clock_step;
    
    for ( var i=0; i<_GAME.animations.length; i++ ) {
        if ( _GAME.animations[i].object_type === 'tank' ) {
            player = _GAME.animations[i].player;

            if ( _GAME.players[player].tank.position.x === _GAME.animations[i].target_position[0] &&
                _GAME.players[player].tank.position.y === _GAME.animations[i].target_position[1] ) {
                // animacija baigta a.k.a, pasiekta reikiama pozicija - ismetame animacija is animaciju saraso

                _GAME.players[player].tank.position.x = _GAME.animations[i].target_position[0];
                _GAME.players[player].tank.position.y = _GAME.animations[i].target_position[1];
                _GAME.animations.splice(i, 1);
                return;
            }

            _GAME.players[player].tank.position.x = _GAME.players[player].tank.position.x * frames_per_second + direction[_GAME.animations[i].action][0];
            _GAME.players[player].tank.position.y = _GAME.players[player].tank.position.y * frames_per_second + direction[_GAME.animations[i].action][1];

            _GAME.players[player].tank.position.x = _GAME.players[player].tank.position.x / frames_per_second;
            _GAME.players[player].tank.position.y = _GAME.players[player].tank.position.y / frames_per_second;

            $('#tank_'+player).css('left', 50 * _GAME.players[player].tank.position.x + 'px')
                            .css('top', 50 * _GAME.players[player].tank.position.y + 'px');
        }
    }

    return;
}