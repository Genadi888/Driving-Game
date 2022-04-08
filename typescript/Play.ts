'use strict'
// import 'phaser';
// /** @type {import(../typings/phaser)}*/
// /** @type {import(../typings/matter)}*/

let bus: Phaser.Physics.Matter.Sprite;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
let group1: number;
let group2: any;
let spawn: Phaser.GameObjects.Image;
let busContainer: Phaser.GameObjects.Container;
let keyF: Phaser.Input.Keyboard.Key;
let keyFPressed = false;
let player: Phaser.Physics.Matter.Sprite;
let tempMatrix: Phaser.GameObjects.Components.TransformMatrix;
let decomposedMatrix: object;

class Play extends Phaser.Scene {

	constructor() {
		super({
			key: "play"
		});
	}

	create() {
		this.cameras.main.setBackgroundColor("0x4D5455");
		this.matter.world.setBounds(0, 0, 800, 800, 0.5);
		const map: Phaser.Tilemaps.Tilemap = this.add.tilemap('map');
		const tileset2: Phaser.Tilemaps.Tileset = map.addTilesetImage('objectspack_01', 'objects_key');
		const tileset4: Phaser.Tilemaps.Tileset = map.addTilesetImage('cars_tileset', 'cars_set_key');
		const layer1: Phaser.Tilemaps.TilemapLayer = map.createLayer('Background', tileset4, 0, 0);
		const layer2: Phaser.Tilemaps.TilemapLayer = map.createLayer('Layer 1', [tileset2, tileset4], 0, 0);
		// tileset1 = map.addTilesetImage('laboratory', 'lab');
		// let tileset3 = map.addTilesetImage('deadcity','city');
		// tileset5 = map.addTilesetImage('objectspack_01', 'objects_01');

		// layer3 = map.createLayer('Layer3', [tileset1, tileset5]);

		layer2.setCollisionByExclusion([-1]);
		this.matter.world.convertTilemapLayer(layer2);

		bus = this.matter.add.sprite(400, 355, 'bus_key', 2)

		// bus.setExistingBody(this.matter.bodies.rectangle(bus.x, bus.y, 325, 62));

		bus.setCollisionGroup(group1);
		bus.setVelocity(0, 0);
		bus.setIgnoreGravity(true);

		// bus.setDisplaySize(10, 10) 
		// bus.scale = 0.8;
		bus.setScale(0.6, 0.8); //? x and y 
		bus.setOrigin(0.5, 0.5);
		// bus.restitution(1)
		bus.setAngle(0.1);
		bus.setFrictionAir(0.1); //* 0.25
		bus.setFrictionStatic(100); //*0
		bus.setMass(170); //*90
		bus.setDataEnabled();
		bus.setData({
			isStationary: true,
		});

		spawn = this.add.sprite(73, -51, 'spawn');
		spawn.setOrigin(0.5, 0.5);
		spawn.setScale(0.1, 0.1)
		spawn.alpha = 0;

		tempMatrix = new Phaser.GameObjects.Components.TransformMatrix();

		// spawn.setVelocity(0, 0);
		// spawn.setIgnoreGravity(true);

		busContainer = this.add.container(100, 100)
		busContainer.add(spawn);

		// busContainer.add(bus);

		cursors = this.input.keyboard.createCursorKeys();
		group1 = this.matter.world.nextGroup();
		keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

		this.input.on('pointermove', mouseRotate, this);

		// this.anims.gen
	}

	update() {
		busContainer.setX(bus.x);
		busContainer.setY(bus.y);
		busContainer.setAngle(bus.angle)

		busMovement.call(this);
		playerMovement.call(this);

		// console.log(spawn.parentContainer.x)
		spawn.getWorldTransformMatrix(tempMatrix);
		decomposedMatrix = tempMatrix.decomposeMatrix();
		// console.log(d.translateX);
	}

}

function mouseRotate(pointer: Phaser.Input.Pointer) {
	if (keyFPressed) {
		const angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(player.x, player.y, pointer.x, pointer.y);
		player.setAngle(angle);
	}
}

function createPlayer(this: any) {
	bus.data.values.isStationary = true;
	bus.setToSleep();

	//@ts-expect-error
	player = this.matter.add.sprite(decomposedMatrix.translateX, decomposedMatrix.translateY, 'guy');

	player.setExistingBody(this.matter.bodies.rectangle(player.x, player.y, 70, 70));

	player.setOrigin(0.5, 0.5);
	player.setScale(0.35, 0.35);
	player.setRotation(bus.rotation);
	player.setIgnoreGravity(true);

	player.setMass(95);
	player.setFrictionAir(0.5);
	player.setFrictionStatic(100)

	player.setData({
		isStationary: true,
	});

	this.anims.create({
		key: 'walk',
		frames: this.anims.generateFrameNumbers('guy', { frames: [0, 2, 3, 5] }),
		frameRate: 5,
		repeat: -1
	});
	this.anims.create({
		key: 'run',
		frames: this.anims.generateFrameNumbers('guy', { frames: [0, 1, 3, 4] }),
		frameRate: 6,
		repeat: -1
	});
	
	cursors.shift.on('up', () => {
		if (cursors.up.isDown && playerIsRunning) {  //? тук се спира "running" анимацията
			player.setFrame(0); 
			player.stop()
			player.play('walk');
			playerIsRunning = false;
		}
	}, this);
}

let playerIsRunning = false;

function playerMovement() {
	if (cursors.up.isDown && keyFPressed) {
		if (cursors.shift.isDown) {
			if (!playerIsRunning) {
				player.setFrame(0); 
				player.stop()
				player.play('run');
				playerIsRunning = true;
			}
			player.thrust(0.35);
		} else {
			player.thrust(0.2);
		}

		if (player.data.values.isStationary) {
			player.play(cursors.shift.isDown ? 'run' : 'walk')  //? каква анимация да пусне в началото
		}

		player.data.values.isStationary = false;
	} 
	else if (cursors.down.isDown && keyFPressed) {
		player.thrustBack(0.2);  //*0.15

		if (playerIsRunning) {  //? пускаме "walk" анимацията, ако преди това играчът е бягал
			player.setFrame(0); 
			player.stop()
			player.play('walk');
			playerIsRunning = false;
		}
				
		if (player.data.values.isStationary) {
			player.play('walk')
		}

		player.data.values.isStationary = false;
	} 
	else if (keyFPressed && !player.data.values.isStationary){
		player.setVelocity(0);
		player.setFrame(0); 
		player.stop();
		// console.log('stopped!');
		player.data.values.isStationary = true;
	}
}

function busMovement(this: any) {
	// ? here we store the top right and bottom right points of our bus sprite
	const point1: any = bus.getTopRight(); // ! green
	const point2: any = bus.getBottomRight(); // ! red

	//* 0.08
	const turnSpeed = 0.08; // ? the speed at which the bus is turning

	if (cursors.up.isDown && !keyFPressed) {
		bus.thrust(0.15); //*0.15
		// console.log('hi!')
	} else if (cursors.down.isDown && !keyFPressed) {
		bus.thrustBack(0.1); //*0.1
	}

	if (cursors.left.isDown && !keyFPressed) {
		bus.setFrame(0); // ? one of the wheel position

		if (cursors.up.isDown) { // ? the bus will turn only when the up arrow button is pressed
			// @ts-expect-errorz
			const angle = bus.body.angle - Math.PI / 2;
			// @ts-expect-error
			bus.applyForceFrom({ x: point1.x, y: point1.y }, { x: turnSpeed * Math.cos(angle), y: turnSpeed * Math.sin(angle) });
		} else if (cursors.down.isDown) { // ? here we correct the wheel position, so that it coresponds to the backward movement
			// @ts-expect-error
			const angle = bus.body.angle + Math.PI / 2;
			// @ts-expect-error
			bus.applyForceFrom({ x: point1.x, y: point1.y }, { x: turnSpeed * Math.cos(angle), y: turnSpeed * Math.sin(angle) });
		}
	} else if (cursors.right.isDown && !keyFPressed) {
		bus.setFrame(1);

		if (cursors.up.isDown) {
			// @ts-expect-error
			const angle = bus.body.angle + Math.PI / 2;
			// @ts-expect-error
			bus.applyForceFrom({ x: point2.x, y: point2.y }, { x: turnSpeed * Math.cos(angle), y: turnSpeed * Math.sin(angle) });
		} else if (cursors.down.isDown) { // ? here we do the same things as above...
			// @ts-expect-error
			const angle = bus.body.angle - Math.PI / 2;
			// @ts-expect-error
			bus.applyForceFrom({ x: point2.x, y: point2.y }, { x: turnSpeed * Math.cos(angle), y: turnSpeed * Math.sin(angle) });
		}

	} else {
		bus.setFrame(2) // ? frame stands for the default wheel position
	}

	if (keyF.isDown && !keyFPressed) {
		createPlayer.call(this);
		keyFPressed = true;
	}
}