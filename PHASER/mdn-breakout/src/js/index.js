const game = new Phaser.Game(
  480,
  320,
  Phaser.AUTO,
  null, {
      preload: preload,
      create : create,
      update : update
  });

let ball = null;
let paddle = null; // ← платформа
// кирпичи ↓
let bricks = null; // набор кирпичей
let newBrick = null; // newBrick - кирпич кот. будет в цикле создаваться
let brickInfo = null; //  brickInfo будет хранить всю информацию о всех кирпичах

// очки
let scoreText = null;
let score = 0;

function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    
    // поменять фон канваса
    game.stage.backgroundColor = '#444000';
    //                 имя
    game.load.image('ball', './src/img/ball.png');
    game.load.image('paddle', './src/img/paddle.png');
    game.load.image('brick', './src/img/brick.png');
}

function create() {
  // [1] ( в самом начале !) инициализируем Arcade Physics в нашей игре
  game.physics.startSystem(Phaser.Physics.ARCADE);
  
  // [0] чтобы вывести наш мяч на экран, мы используем  метод add.sprite()
  // последний параметр — это имя ↓ картинки
  ball = game.add.sprite(game.world.width * 0.5,  game.world.height - 20, 'ball');
  ball.anchor.set(0.5, 1)
  
  paddle = game.add.sprite(game.world.width * 0.5, game.world.height - 10, 'paddle');
  paddle.anchor.set(0.5, 1); // поставить якорь по середине
  
  // [2] нам необходимо добавить мяч в физическую систему,
  // т.к объект, отвечающий за физику в Phaser, не включён по умолчанию.
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  game.physics.enable(paddle, Phaser.Physics.ARCADE);
  
  // [3] установить скорость мяча через velocity (вместо ball.x += 0.3; в update)
  ball.body.velocity.set(340, 250);
  ball.body.gravity.y = 0 // гравитация
  
  ball.body.collideWorldBounds = true; // вкл столкновения
  ball.body.bounce.set(1); // вкл отскакиваемость
  
  game.physics.arcade.checkCollision.down = false; // откл коллизии снизу
  paddle.body.immovable = true; // что бы платформа не утопала
  
  initBricks()
  gameOver()
  
  // вывод очков
  scoreText = game.add.text(5, 5, 'Points: 0', {
    font: '18px Arial',
    fill: '#0095DD'
  });
}

// код внутри update - это requestAnimations - он всё время запущен
function update() {
  console.log('update')
  game.physics.arcade.collide(ball, paddle); // включить обработку столкновений с мячом
  // 3м(опц) параметром, передаём функцию которая  ↓ будет выполняться каждый раз, когда будет найдена коллизия
  game.physics.arcade.collide(ball, bricks, ballHitBrick);
  paddle.x = game.input.x || game.world.width * 0.5; // cм doc
  
}

function gameOver() {
  // если мяч падает за пределы платформы
  // Если установлено значение true,
  // игровой объект проверяет, находится ли он в пределах границ мира в каждом кадре.
  ball.checkWorldBounds = true;
  
  ball.events.onOutOfBounds.add(function () {
    console.warn('Game over!');
    location.reload(); // перезагрузка игры
  }, this);
}

function initBricks() {
  bricks = game.add.group(); // инициализируйте пустой набор для хранения кирпичей
  
  brickInfo = {
    width: 50,
    height: 20,
    count: {
      row: 3,
      col: 7
    },
    offset: {
      top: 50,
      left: 60
    },
    padding: 10
  };
  
  // Теперь необходимо в каждой итерации создавать кирпич,
  // чтобы получить необходимое число кирпичей,
  // нарисовать их всех на экране и добавить в наш набор bricks
  for (let col = 0; col < brickInfo.count.col; col++) {
    for (let row = 0; row < brickInfo.count.row; row++) {
      //координата x каждого кирпича рассчитывается на основе суммы ширины кирпича
      // brickInfo.width и зазора brickInfo.padding, умноженной на номер столбца сol,
      // после этого добавляем отступ от левого края brickInfo.offset.left;
      let brickX = (col * (brickInfo.width + brickInfo.padding)) + brickInfo.offset.left;
      let brickY = (row * (brickInfo.height + brickInfo.padding)) + brickInfo.offset.top;
      
      newBrick = game.add.sprite(brickX, brickY, 'brick');
      game.physics.enable(newBrick, Phaser.Physics.ARCADE);
      newBrick.body.immovable = true;
      newBrick.anchor.set(0.5);
      
      bricks.add(newBrick);

    }
  }
}

function ballHitBrick(ball, brick) {
  brick.kill();
  
  // ↓ обновляем очки при разрушении ↓
  score += 10;
  scoreText.setText('Points: '+score);
}
