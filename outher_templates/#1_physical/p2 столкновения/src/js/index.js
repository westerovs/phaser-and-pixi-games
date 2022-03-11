var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {
  preload: preload,
  create : create,
  update : update,
  render : render
});

function preload() {
  game.load.image('floppy', 'src/img/floppy.png');
  game.load.image('contra2', 'assets/pics/contra2.png');
  game.load.image('block', 'assets/sprites/block.png');
  game.load.image('wizball', 'assets/sprites/wizball.png');
  game.load.image('tetrisblock1', 'assets/sprites/tetrisblock1.png');
  game.load.image('tetrisblock2', 'assets/sprites/tetrisblock2.png');
  game.load.image('tetrisblock3', 'assets/sprites/tetrisblock3.png');
  
  game.load.physics('physicsData', 'assets/sprites.json');
}

var floppy;
var contra;
var block;
var wizball;
var tetris1;
var tetris2;
var tetris3;

var cursors;

var result = 'Move with the cursors';

function create() {
  //  Включить p2 physics
  game.physics.startSystem(Phaser.Physics.P2JS);
  
  game.physics.p2.restitution = 0.9;
  game.physics.p2.gravity.y = 100;
  
  floppy = game.add.sprite(200, 300, 'floppy');
  contra = game.add.sprite(200, 200, 'contra2');
  contra.inputEnabled = true;
  contra.events.onInputDown.add(() => console.log('click'))
  
  block = game.add.sprite(500, 200, 'block');
  wizball = game.add.sprite(200, 100, 'wizball');
  tetris1 = game.add.sprite(100, 250, 'tetrisblock1');
  tetris2 = game.add.sprite(300, 250, 'tetrisblock2');
  tetris3 = game.add.sprite(650, 250, 'tetrisblock3');
  
  // Включить физические тела для следующих спрайтов
  game.physics.p2.enable([contra, floppy, block, wizball, tetris1, tetris2, tetris3], false);
  
  // просто загружает данные полигона в объекты
  floppy.body.clearShapes();
  floppy.body.loadPolygon('physicsData', 'floppy');
  
  contra.body.clearShapes();
  contra.body.loadPolygon('physicsData', 'contra2');
  
  wizball.body.setCircle(45);
  
  tetris1.body.clearShapes();
  tetris1.body.loadPolygon('physicsData', 'tetrisblock1');
  
  tetris2.body.clearShapes();
  tetris2.body.loadPolygon('physicsData', 'tetrisblock2');
  
  tetris3.body.clearShapes();
  tetris3.body.loadPolygon('physicsData', 'tetrisblock3');
  
  cursors = game.input.keyboard.createCursorKeys();
  
  // Проверьте, не попал ли блок в другой объект
  block.body.onBeginContact.add(blockHit, this);
  
}

// Блок во что-то врезался.
function blockHit(body, bodyB, shapeA, shapeB, equation) {
  // Этот обратный вызов отправляется с 5 аргументами:
  
  // 1 Фазер.Физика.Р2.Тело, с которым оно соприкасается.
  // *Это может быть значение null*, если Тело было создано непосредственно в мире p2.
  // 2 P2.Тело, с которым соприкасается это тело.
  // 3 Форма этого тела, которая вызвала контакт.
  // 4 Форма из контактного тела.
  // 5 Массив данных Уравнения контакта.
  
  // Первый аргумент может быть нулевым или не иметь свойства sprite, например, когда вы переходите границы мира.
  if (body) {
    result = 'You last hit: ' + body.sprite.key;
  } else {
    result = 'You last hit: The wall :)';
  }
}

function update() {
  
  block.body.setZeroVelocity();
  
  if (cursors.left.isDown) {
    block.body.moveLeft(200);
  } else if (cursors.right.isDown) {
    block.body.moveRight(200);
  }
  
  if (cursors.up.isDown) {
    block.body.moveUp(200);
  } else if (cursors.down.isDown) {
    block.body.moveDown(200);
  }
  
}

function render() {
  game.debug.text(result, 32, 32);
}

