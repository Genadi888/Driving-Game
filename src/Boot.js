'use strict'
class Boot extends Phaser.Scene{
    constructor(){
        super({
            key: "boot"
        });
    }

    preload(){
        this.load.tilemapTiledJSON('map', './tilemap/testmap_1.json')
        this.load.image('lab', './tilemap/tilesets/32x32_tileset_laboratory.png')
        this.load.image('setofcars', './tilemap/tilesets/25981646_04.png')
        this.load.image('street', './tilemap/tilesets/Street_02.png')
        this.load.image('objects_01', './tilemap/tilesets/objectspack_01.jpg')
        this.load.spritesheet('bus_key', './images/bus_sprite.png', { frameWidth: 336, frameHeight: 76 })
    }
    create(){
        this.scene.start('play');
    }
    update(){
        
    }
}