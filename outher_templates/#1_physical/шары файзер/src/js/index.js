var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example',
  { preload: preload, create: create, update: update, render: render }
);

function preload() {
  game.load.image('wizball', 'src/img/pangball.png');
  game.load.image('disk', 'src/img/floppy.png');
}

var ball1;
var ball2;
var disk;

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  
  disk = game.add.sprite(80, 350, 'disk');
  ball1 = game.add.sprite(100, 140, 'wizball');
  ball2 = game.add.sprite(700, 140, 'wizball');
  game.physics.arcade.enable([disk, ball1, ball2]);
  
  ball1.body.setCircle(50);
  ball2.body.setCircle(50);
  
  //  Установите мяч так, чтобы он сталкивался с окружающим миром,
  //  имел гравитацию, подпрыгивал и двигался.
  ball1.body.collideWorldBounds = true;
  ball2.body.collideWorldBounds = true;
  disk.body.collideWorldBounds = true;
  
  ball1.body.bounce.set(1);
  ball2.body.bounce.set(1);
  disk.body.bounce.set(1);
  
  ball1.body.gravity.y = 100;
  ball2.body.gravity.y = 100;
  disk.body.gravity.y = 100;
  
  ball1.body.velocity.set(150);
  ball2.body.velocity.set(-200, 60);
  disk.body.velocity.set(50);
}

function update () {
  game.physics.arcade.collide(ball1, ball2);
  game.physics.arcade.collide(ball1, disk);
  game.physics.arcade.collide(ball2, disk);
}

function render () {
  game.debug.body(disk);
  game.debug.body(ball1);
  game.debug.body(ball2);
}

