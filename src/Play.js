'use strict'
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

        this.matter.world.setBounds(0, 0, 800, 800, 0.5);
        map = this.add.tilemap('map');
        tileset1 = map.addTilesetImage('laboratory', 'lab');
        tileset2 = map.addTilesetImage('carpack_01', 'setofcars');
        // let tileset3 = map.addTilesetImage('deadcity','city');
        tileset4 = map.addTilesetImage('Street_02', 'street');
        tileset5 = map.addTilesetImage('objectspack_01', 'objects_01');

        layer1 = map.createLayer('Layer1', tileset4, 0, 0);
        layer2 = map.createLayer('Layer2', [tileset2, tileset5]);
        layer3 = map.createLayer('Layer3', [tileset1, tileset5]);
        this.matter.add.gameObject([layer2, layer3], { isStatic: true });
        ////[layer1,layer2,layer3].setCollisionGroup(group1);
        ////this.matter.addCollider(this.bus, layer2)

        this.matter.world.convertTilemapLayer(layer1);

        this.bus = this.matter.add.sprite(400, 355, 'bus_key', 2)
        this.bus.setCollisionGroup(group1);
        this.bus.setVelocity(0, 0);
        this.bus.setIgnoreGravity(true);
        // //this.matter.world.setGravity(1,0)

        // bus.setDisplaySize(10, 10) 
        //bus.scale = 0.8;
        this.bus.setScale(0.7, 0.8); //? x and y 
        this.bus.setOrigin(0.5, 0.5);
        // bus.restitution(1)
        this.bus.setAngle(0);
        this.bus.setFrictionAir(0.25); //* 0.25
        this.bus.setFrictionStatic(0.0); //*0
        this.bus.setMass(90); //*90

        this.cursors = this.input.keyboard.createCursorKeys();
        group1 = this.matter.world.nextGroup();

        // console.log(layer2.height, layer2.width, layer2.x, layer2.y)
    }

    update() {
        // ? here we store the top right and bottom right points of our bus sprite
        let point1 = this.bus.getTopRight(); // ! green
        let point2 = this.bus.getBottomRight(); // ! red

        //* 0.08
        const turnSpeed = 0.04; // ? the speed at which the bus is turning

        if (this.cursors.up.isDown) {
            this.bus.thrust(0.1);//*0.15
        } else if (this.cursors.down.isDown) {
            this.bus.thrustBack(0.1);//*0.1
        }

        if (this.cursors.left.isDown) {
            this.bus.setFrame(0); // ? one of the wheel position
            if (this.cursors.up.isDown) { // ? the bus will turn only when the up arrow button is pressed
                let angle = this.bus.body.angle - Math.PI / 2;
                this.bus.applyForceFrom({ x: point1.x, y: point1.y }, { x: turnSpeed * Math.cos(angle), y: turnSpeed * Math.sin(angle) });
            } else if (this.cursors.down.isDown) { // ? here we correct the wheel position, so that it coresponds to the backward movement
                let angle = this.bus.body.angle + Math.PI / 2;
                this.bus.applyForceFrom({ x: point1.x, y: point1.y }, { x: turnSpeed * Math.cos(angle), y: turnSpeed * Math.sin(angle) });
            }
        } else if (this.cursors.right.isDown) {
            this.bus.setFrame(1);
            if (this.cursors.up.isDown) {
                let angle = this.bus.body.angle + Math.PI / 2;
                this.bus.applyForceFrom({ x: point2.x, y: point2.y }, { x: turnSpeed * Math.cos(angle), y: turnSpeed * Math.sin(angle) });
            } else if (this.cursors.down.isDown) { // ? here we do the same things as above...
                let angle = this.bus.body.angle - Math.PI / 2;
                this.bus.applyForceFrom({ x: point2.x, y: point2.y }, { x: turnSpeed * Math.cos(angle), y: turnSpeed * Math.sin(angle) });
            }

        } else {
            this.bus.setFrame(2) // ? this frame stands for the default wheel position
        }
    }
}