"use strict"
let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 800,
    pixelArt: false,
    physics: {
        default: "matter",
        matter: {
            // debug: {
            //     angleColor: 1,
            //     showBounds: true,
            //     showAxes: true
            // }
        }
    },
    scene: [Boot, Play] //! Първо ще зареди "Boot" сцената, а след това и "Play". 
};
const game = new Phaser.Game(config);