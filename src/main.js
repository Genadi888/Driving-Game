"use strict"
let config = {
    type: Phaser.AUTO,
    width: 832,
    height: 576,
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