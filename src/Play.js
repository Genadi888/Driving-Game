'use strict';
// import 'phaser';
// /** @type {import(../typings/phaser)}*/
// /** @type {import(../typings/matter)}*/
let bus;
let cursors;
let group1;
let group2;
class Play extends Phaser.Scene {
    constructor() {
        super({
            key: "play"
        });
    }
    create() {
        let map;
        let tileset1;
        let tileset2;
        let tileset3;
        let tileset4;
        let tileset5;
        let layer1;
        let layer2;
        let layer3;
        //game.stage.backgroundColor = "#FF00FF"
        this.cameras.main.setBackgroundColor("0x4D5455");
        this.matter.world.setBounds(0, 0, 800, 800, 0.5);
        map = this.add.tilemap('map');
        // tileset1 = map.addTilesetImage('laboratory', 'lab');
        tileset2 = map.addTilesetImage('25981646_04', 'setofcars');
        // let tileset3 = map.addTilesetImage('deadcity','city');
        tileset4 = map.addTilesetImage('street_map', 'street');
        // tileset5 = map.addTilesetImage('objectspack_01', 'objects_01');
        layer1 = map.createLayer('Layer 1', tileset4, 0, 0);
        layer2 = map.createLayer('Layer 2', tileset2, 0, 0);
        // layer3 = map.createLayer('Layer3', [tileset1, tileset5]);
        layer2.setCollisionByExclusion([-1]);
        this.matter.world.convertTilemapLayer(layer2);
        bus = this.matter.add.sprite(400, 355, 'bus_key', 2);
        bus.setCollisionGroup(group1);
        bus.setVelocity(0, 0);
        bus.setIgnoreGravity(true);
        // bus.setDisplaySize(10, 10) 
        //bus.scale = 0.8;
        bus.setScale(0.7, 0.8); //? x and y 
        bus.setOrigin(0.5, 0.5);
        // bus.restitution(1)
        bus.setAngle(0);
        bus.setFrictionAir(0.1); //* 0.25
        bus.setFrictionStatic(0.0); //*0
        bus.setMass(90); //*90
        cursors = this.input.keyboard.createCursorKeys();
        group1 = this.matter.world.nextGroup();
    }
    update() {
        // ? here we store the top right and bottom right points of our bus sprite
        let point1 = bus.getTopRight(); // ! green
        let point2 = bus.getBottomRight(); // ! red

        //* 0.08
        const turnSpeed = 0.03; // ? the speed at which the bus is turning

        if (cursors.up.isDown) {
            bus.thrust(0.1);//*0.15
        } else if (cursors.down.isDown) {
            bus.thrustBack(0.1);//*0.1
        }

        if (cursors.left.isDown) {
            bus.setFrame(0); // ? one of the wheel position
            if (cursors.up.isDown) { // ? the bus will turn only when the up arrow button is pressed
                let angle = bus.body.angle - Math.PI / 2;
                bus.applyForceFrom({ x: point1.x, y: point1.y }, { x: turnSpeed * Math.cos(angle), y: turnSpeed * Math.sin(angle) });
            } else if (cursors.down.isDown) { // ? here we correct the wheel position, so that it coresponds to the backward movement
                let angle = bus.body.angle + Math.PI / 2;
                bus.applyForceFrom({ x: point1.x, y: point1.y }, { x: turnSpeed * Math.cos(angle), y: turnSpeed * Math.sin(angle) });
            }
        } else if (cursors.right.isDown) {
            bus.setFrame(1);
            if (cursors.up.isDown) {
                let angle = bus.body.angle + Math.PI / 2;
                bus.applyForceFrom({ x: point2.x, y: point2.y }, { x: turnSpeed * Math.cos(angle), y: turnSpeed * Math.sin(angle) });
            } else if (cursors.down.isDown) { // ? here we do the same things as above...
                let angle = bus.body.angle - Math.PI / 2;
                bus.applyForceFrom({ x: point2.x, y: point2.y }, { x: turnSpeed * Math.cos(angle), y: turnSpeed * Math.sin(angle) });
            }

        } else {
            bus.setFrame(2) // ? this frame stands for the default wheel position
        }
    }
}
