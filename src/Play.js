'use strict'
let bus;
let tracker1;
let tracker2;
let cursors;
class Play extends Phaser.Scene{

    constructor(){
        super({
            key: "play"
        });
    }

    create(){
        let tracker1;
        let tracker2;
        let cursors;
        let map;
        let tileset1;
        let tileset2;
        let tileset3;
        let tileset4;
        let tileset5;
        let lay3container;
        let lay2container;
        let layer1;
        let layer2;
        let layer3;
        //let bus;

        this.matter.world.setBounds(0, 0, 800, 800, 0.5);
        map = this.add.tilemap('map');
        tileset1 = map.addTilesetImage('laboratory', 'lab');
        tileset2 = map.addTilesetImage('carpack_01','setofcars');
        // let tileset3 = map.addTilesetImage('deadcity','city');
        tileset4 = map.addTilesetImage('Street_02','street');
        tileset5 = map.addTilesetImage('objectspack_01','objects_01');

        lay3container = [tileset1, tileset5];
        lay2container = [tileset2, tileset5];

        layer1 = map.createLayer('Layer1', tileset4, 0, 0);
        layer2 = map.createLayer('Layer2', lay2container);
        layer3 = map.createLayer('Layer3', lay3container);
        this.matter.add.gameObject([layer2,layer3], {isStatic: true});

        this.bus = this.matter.add.sprite(400, 355, 'bus_key', 2) // * 330, 210 | 150, 355
        this.bus.setVelocity(0,0);
        this.bus.setIgnoreGravity(true);
        // this.matter.world.setGravity(1,0)
        
        // bus.setDisplaySize(10, 10) 
        //bus.scale = 0.8;
        this.bus.setScale(0.8,0.8);
        this.bus.setOrigin(0.5, 0.5);
        // bus.restitution(1)
        this.bus.setAngle(-90);
        this.bus.setAngularVelocity(0.0);
        this.bus.setFrictionAir(0.1);
        this.bus.setMass(100);

        this.tracker1 = this.add.rectangle(0,0,4,4,0x00ff00);
        this.tracker2 = this.add.rectangle(0,0,4,4,0xff0000);
        this.cursors = this.input.keyboard.createCursorKeys();

        

    }

    update(){
        
        let point1 = this.bus.getTopRight()
        let point2 = this.bus.getBottomRight();

        this.tracker1.setPosition(point1.x, point1.y);
        this.tracker2.setPosition(point2.x, point2.y);

        if (this.cursors.up.isDown) {
            this.bus.thrust(0.025);
        }
        else if (this.cursors.down.isDown){
            this.bus.thrustBack(0.1);
        }

        let speed = 0.025;

    if (this.cursors.left.isDown)
    {
        this.bus.applyForceFrom({ x: point1.x, y: point1.y }, { x: -speed * Math.cos(this.bus.body.angle), y: 0 });

         Phaser.Physics.Matter.Matter.Body.setAngularVelocity(this.bus.body, -0.01);
         //this.bus.angle -= 4;
    }
    if (this.cursors.right.isDown)
    {
        this.bus.applyForceFrom({ x: point2.x, y: point2.y }, { x: speed * Math.cos(this.bus.body.angle), y: 0 });

        // car.applyForceFrom();
         Phaser.Physics.Matter.Matter.Body.setAngularVelocity(this.bus.body, 0.01);
         //this.bus.angle += 4;
    }


    }
}