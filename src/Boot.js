'use strict'
class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: "boot"
        });
    }

    preload() {
        this.load.tilemapTiledJSON('map', './tilemap/map_new_tileset_test_800x800.json')
        // this.load.image('lab', './tilemap/tilesets/32x32_tileset_laboratory.png')
        // this.load.image('setofcars', './tilemap/tilesets/25981646_04.png')
        this.load.image('cars_set_key', './tilemap/tilesets/cars_tileset.png')
        this.load.image('objects_key', './tilemap/tilesets/objectspack_01.jpg');
        this.load.image('test_bus', './images/new_bus.png')
        this.load.image('spawn', './images/spawnpoint.png')
        this.load.spritesheet('bus_key', './images/bus_sprite.png', { frameWidth: 336, frameHeight: 76 })
        this.load.spritesheet('guy', './images/topdown_guy.png', { frameWidth: 133, frameHeight: 140 })
    }
    create() {
        this.scene.start('play');
    }
    update() {

    }
}