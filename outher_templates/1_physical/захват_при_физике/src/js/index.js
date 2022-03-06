var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', {preload: preload, create: create});

function preload() {
  game.load.image('block', '/src/img/block.jpg');
}

var sprite;

function create() {
  game.stage.backgroundColor = '#2d2d2d';
  game.physics.startSystem(Phaser.Physics.P2JS);

  game.physics.arcade.gravity.y = 100;
  sprite = game.add.sprite(100, 96, 'block');

  game.physics.arcade.enable(sprite);

  sprite.body.collideWorldBounds = true;
  sprite.body.velocity.x = 200;
  sprite.body.bounce.set(0.5); // Упругость тела при столкновении.
  
  //  Также включите спрайт для перетаскивания
  sprite.inputEnabled = true;
  sprite.input.enableDrag();
  
  sprite.events.onDragStart.add(startDrag, this);
  sprite.events.onDragStop.add(stopDrag, this);
  
  game.add.text(32, 32, 'Drag and release the sprite', {font: '16px Arial', fill: '#ffffff'});
  
}

function startDrag() {
  // Вы не можете перемещать спрайт с помощью физики И ввода, поэтому мы отключаем физику при перетаскивании
  sprite.body.moves = false;
}

function stopDrag() {
  //  И повторно включите его после выпуска
  sprite.body.moves = true;
}
