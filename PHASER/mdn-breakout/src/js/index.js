const game = new Phaser.Game(
  480,
  320,
  Phaser.CANVAS,
  null, {
      preload: preload,
      create : create,
      update : update
  });

// кнопка старт
let playing = false; // пригодится сделать ракетку неподвижной
let startButton = null;

let ball = null;
let paddle = null; // ← платформа
// кирпичи ↓
let bricks = null; // набор кирпичей
let newBrick = null; // newBrick - кирпич кот. будет в цикле создаваться
let brickInfo = null; //  brickInfo будет хранить всю информацию о всех кирпичах

// очки
let scoreText = null;
let score = 0;

// жизни
let lives = 3;
let livesText = null;
let lifeLostText = null; //  надпись, которая выведется на экран, если игрок потеряет жизнь

const textStyle = {
  font: '18px Arial',
  fill: '#0095DD'
};


function preload() {
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  
  // поменять фон канваса
  game.stage.backgroundColor = '#444000';
  //                    имя ↓
  game.load.spritesheet('button', '/src/img/button.png', 120, 40);
  game.load.image('ball', './src/img/ball.png');
  game.load.image('paddle', './src/img/paddle.png');
  game.load.image('brick', './src/img/brick.png');
  //  В spritesheet два доп параметра определяют ширину и высоту каждого отдельного кадра в данном файле
  game.load.spritesheet('ball', './src/img/wobble.png', 20, 20); // типо атлас мячиков
}

function create() {
  // [1] ( в самом начале !) инициализируем Arcade Physics в нашей игре
  game.physics.startSystem(Phaser.Physics.ARCADE);
  
  // [0] чтобы вывести наш мяч на экран, мы используем  метод add.sprite()
  // последний параметр — это имя ↓ картинки
  ball = game.add.sprite(game.world.width * 0.5,  game.world.height - 20, 'ball');
  ball.animations.add('wobble', [0, 1, 0, 2, 0, 1, 0, 2, 0], 24); // добавить анимацию
  
  ball.anchor.set(0.5, 1)
  
  paddle = game.add.sprite(game.world.width * 0.5, game.world.height - 10, 'paddle');
  paddle.anchor.set(0.5, 1); // поставить якорь по середине
  
  // [2] нам необходимо добавить мяч в физическую систему,
  // т.к объект, отвечающий за физику в Phaser, не включён по умолчанию.
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  game.physics.enable(paddle, Phaser.Physics.ARCADE);
  
  // [3] установить скорость мяча через velocity (вместо ball.x += 0.3; в update)
  ball.body.gravity.y = 0 // гравитация
  
  ball.body.collideWorldBounds = true; // вкл столкновения
  ball.body.bounce.set(1); // вкл отскакиваемость
  
  game.physics.arcade.checkCollision.down = false; // откл коллизии снизу
  paddle.body.immovable = true; // что бы платформа не утопала
  
  initBricks()
  
  // added start btn (в самый низ, как z-index в потоке док-та)
  startButton = game.add.button(
    game.world.width * 0.5, // pos x
    game.world.height * 0.5,// pos y
    'button',  // имя
    startGame, // Ф-ция обратного вызова, которая будет выполняться при нажатии кнопки.
    this,      // Ссылка на this определение контекста выполнения
    1, 0, 2    // кадры анимации
  );
  startButton.anchor.set(0.5);
  gameOver();
  
  // вывод очков
  scoreText = game.add.text(5, 5, 'Points: ', textStyle);
  createScore()
  createLives()
}

// код внутри update - это requestAnimations - он всё время запущен
function update() {
  console.log('update')
  game.physics.arcade.collide(ball, paddle, ballHitPaddle); // включить обработку столкновений с мячом
  // 3м(опц) параметром, передаём функцию которая  ↓ будет выполняться каждый раз, когда будет найдена коллизия
  game.physics.arcade.collide(ball, bricks, ballHitBrick);
  
  // блокировка площадки до тыка по кнопке
  if (playing) {
    console.log('test')
    paddle.x = game.input.x || game.world.width * 0.5;
  }
}

function gameOver() {
  // если мяч падает за пределы платформы
  // Если установлено значение true,
  // игровой объект проверяет, находится ли он в пределах границ мира в каждом кадре.
  ball.checkWorldBounds = true;
  
  // событие onOutOfBounds  когда игровой объект покидает границы Phaser.World.
  ball.events.onOutOfBounds.add(function () {
    ballLeaveScreen()
  }, this);
}

function initBricks() {
  bricks = game.add.group(); // инициализируйте пустой набор для хранения кирпичей
  
  brickInfo = {
    width: 50,
    height: 20,
    count: {
      row: 5,
      col: 6
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

// разрушение
function ballHitBrick(ball, brick) {
  createTweenKill(brick)
  
  // ↓ обновляем очки при разрушении ↓
  score += 10;
  scoreText.setText('Points: '+score);
  
  //
  let count_alive = 0;
  
  bricks.forEach(brick => {
    if (brick.alive === true) {
      count_alive++;
    }
  })

  // YOU WIN ↓
  if (count_alive === 0) {
    alert('You won the game, congratulations!');
    location.reload();
  }
}

// обрабатывает столкновение между мячом и платформой
function ballHitPaddle() {
  console.log('бум!')
  ball.animations.play('wobble');
}

function createScore() {
  scoreText = game.add.text(5, 5, 'Points: 0', {
    font: '18px Arial',
    fill: '#0095DD'
  });
}

function createLives() {
  livesText = game.add.text(game.world.width - 10, 5, 'Lives: ' + lives, textStyle);
  livesText.anchor.set(1, 0);
  lifeLostText = game.add.text(game.world.width * 0.5, game.world.height * 0.5, 'Life lost, click to continue', textStyle);
  lifeLostText.anchor.set(0.5);
  lifeLostText.visible = false;
}

function startGame() {
  console.log('clack - start game')
  startButton.destroy();
  ball.body.velocity.set(150, -150); // после нажатия задаём скорость мячу
  playing = true;
}

// когда мяч вышел за пределы экрана
function ballLeaveScreen() {
  // уменьшать количество жизней каждый раз, когда шар выйдет за пределы окна Canvas.
  lives--;
  
  if (lives) {
    livesText.setText('Lives: ' + lives);
    lifeLostText.visible = true;
    
    ball.reset(game.world.width * 0.5, game.world.height - 25);
    paddle.reset(game.world.width * 0.5, game.world.height - 5);
  
    game.input.onDown
      .addOnce(function () {
        lifeLostText.visible = false;
        ball.body.velocity.set(150, -150);
      }, this);
  } else {
    alert('You lost, game over!');
    location.reload();
  }
}

function createTweenKill(brick) {
  const killTween = game.add.tween(brick.scale);
  
  killTween.to({ x: 0.1, y: 0.5 }, 200, Phaser.Easing.Linear.None);
  
  // определяет функцию, которая будет выполняться после завершения анимации движения
  killTween.onComplete.addOnce(function () {
    brick.kill();
  }, this);
  
  // запуск анимации
  killTween.start();
}
