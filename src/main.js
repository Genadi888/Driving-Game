"use strict";

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
        physics: {
        default: "matter",
            matter: {
                debug: {
                    
                    showBounds: true,
                    showAxes: true
                }
            }
        },
        extend: {
            bus: null,
            reticle: null,
            moveKeys: null,
            bullets: null,
            lastFired: 0,
            time: 0,
        },
    scene: [Boot, Play] //! Първо ще зареди "Boot" сцената, а след това и "Play". 
};
let game = new Phaser.Game(config);