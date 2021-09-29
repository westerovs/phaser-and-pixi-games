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
let paddle = null; // платформа

function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    
    // поменять фон канваса
    game.stage.backgroundColor = '#444000';
    //                 имя
    game.load.image('ball', './src/img/ball.png');
    game.load.image('paddle', './src/img/paddle.png');
}

function create() {
  // [1] ( в самом начале !) инициализируем Arcade Physics в нашей игре
  game.physics.startSystem(Phaser.Physics.ARCADE);
  
  // [0] чтобы вывести наш мяч на экран, мы используем  метод add.sprite()
  // последний параметр — это имя ↓ картинки
  ball = game.add.sprite(50, 50, 'ball');
  
  paddle = game.add.sprite(game.world.width * 0.5, game.world.height - 5, 'paddle');
  paddle.anchor.set(0.5, 1); // поставить якорь по середине
  
  // [2] нам необходимо добавить мяч в физическую систему,
  // т.к объект, отвечающий за физику в Phaser, не включён по умолчанию.
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  game.physics.enable(paddle, Phaser.Physics.ARCADE);
  
  // [3] установить скорость мяча через velocity (вместо ball.x += 0.3; в update)
  ball.body.velocity.set(260, 360);
  ball.body.gravity.x = -125
  
  ball.body.collideWorldBounds = true; // вкл столкновения
  ball.body.bounce.set(1); // вкл отскакиваемость
  
  paddle.body.collideWorldBounds = true; // вкл столкновения
  paddle.body.bounce.set(1); // вкл отскакиваемость
}

// код внутри update - это requestAnimations - он всё время запущен
function update() {
  console.log('update')
  // ball.x += 0.3;
  // ball.y += 0.1;
}
