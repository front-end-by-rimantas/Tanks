"use strict";

/*
 * zaidimas bus didesnis, nei mazesnis uz 13x13 langeliu
 * turi tilpti i ekrana (desktop/mobile)
 */

var game = {
        map: {
            width: 13,
            height: 13
        },
        background: 'tileGrass1.png',
        players: [
            {
                name: 'NATO',
                base: {
                    image: 'base-1.png',
                    position: {
                        x: 7,
                        y: 1
                    }
                },
                tank: {
                    image: 'tank_blue.png',
                    position: {
                        x: 6,
                        y: 1
                    },
                    rotation: 'down',
                    speed: 500,                  // 1 ejimas per 500 milisekundziu
                    keyboard: {
                        up: 38,
                        right: 39,
                        down: 40,
                        left: 37
                    }
                }
            },
            {
                name: 'OTAN',
                base: {
                    image: 'base-3.png',
                    position: {
                        x: 7,
                        y: 13
                    }
                },
                tank: {
                    image: 'tank_dark.png',
                    position: {
                        x: 8,
                        y: 13
                    },
                    rotation: 'up',
                    speed: 500,                  // 1 ejimas per 500 milisekundziu
                    keyboard: {
                        up: 87,
                        right: 68,
                        down: 83,
                        left: 65
                    }
                }
            }
        ]
    };