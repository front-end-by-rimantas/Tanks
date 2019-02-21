"use strict";

/*
 * zaidimas bus didesnis, nei mazesnis uz 13x13 langeliu
 * turi tilpti i ekrana (desktop/mobile)
 */

var _GAME = {
        clock_step: 100,
        map: {
            width: 13,
            height: 13
        },
        background: 'tileGrass1.png',
        bullet_counter: 0,
        players: [
            {
                name: 'NATO',
                base: {
                    image: 'base-1.png',
                    position: {
                        x: 6,
                        y: 0
                    }
                },
                tank: {
                    image: 'tank_blue.png',
                    bullet_image: 'bulletBlue2_outline.png',
                    bullet_speed: 3,
                    position: {
                        x: 5,
                        y: 0
                    },
                    rotation: 'down',
                    speed: 500,                  // 1 ejimas per 500 milisekundziu
                    keyboard: {
                        up: 38,
                        right: 39,
                        down: 40,
                        left: 37,
                        fire: 96
                    },
                    action: ''
                }
            },
            {
                name: 'OTAN',
                base: {
                    image: 'base-3.png',
                    position: {
                        x: 6,
                        y: 12
                    }
                },
                tank: {
                    image: 'tank_dark.png',
                    bullet_image: 'bulletDark2_outline.png',
                    bullet_speed: 3,
                    position: {
                        x: 7,
                        y: 12
                    },
                    rotation: 'up',
                    speed: 500,                  // 1 ejimas per 500 milisekundziu
                    keyboard: {
                        up: 87,
                        right: 68,
                        down: 83,
                        left: 65,
                        fire: 32
                    },
                    action: ''
                }
            }
        ],
        animations: []
    };