class Game {
  constructor() {
    this.game = null;
  
    // кнопка старт
    this.playing = false; // пригодится сделать ракетку неподвижной
    this.startButton = null;
  
    this.ball = null;
    this.paddle = null; // ← платформа
    // кирпичи ↓
    this.bricks = null; // набор кирпичей
    this.newBrick = null; // this.newBrick - кирпич кот. будет в цикле создаваться
    this.brickInfo = null; //  this.brickInfo будет хранить всю информацию о всех кирпичах
    
    this.row = 2;
    this.col = 7;
    this.velocity = 250;
  
    // очки
    this.scoreText = null;
    this.score = 0;
  
    // жизни
    this.lives = 3;
    this.livesText = null;
    this.lifeLostText = null; //  надпись, которая выведется на экран, если игрок потеряет жизнь
    this.textStyle = {
      font: '18px Arial',
      fill: '#0095DD'
    };
  }
  
  preload = () => {
    this.game.stage.backgroundColor = '#444000';     // поменять фон канваса
  
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;

    this.game.load.spritesheet('button', '/src/img/button.png', 120, 40);
    this.game.load.image('ball', './src/img/ball.png');
    this.game.load.image('paddle', './src/img/paddle.png');
    this.game.load.image('brick', './src/img/brick.png');
    //  В spritesheet два доп параметра определяют ширину и высоту каждого отдельного кадра в данном файле
    this.game.load.spritesheet('ball', './src/img/wobble.png', 20, 20); // типо атлас мячиков
  }
  
  create = () => {
    // [1] ( в самом начале !) инициализируем Arcade Physics в нашей игре
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.checkCollision.down = false; // откл коллизии снизу
  
    this.createBall();
    this.createPlatform();
    this.createBricks()
    
    this.createStartBtn()
    this.createScore()
    this.createLives()
    
    this.ballMiss();
  }
  
  update = () => {
    // код внутри update - это requestAnimations - он всё время запущен
    this.game.physics.arcade.collide(this.ball, this.paddle, this.collisionBallOnPaddle); // включить обработку столкновений с мячом
    // // 3м(опц) параметром, передаём функцию которая  ↓ будет выполняться каждый раз, когда будет найдена коллизия
    this.game.physics.arcade.collide(this.ball, this.bricks, this.collisionBallOnBricks);

    // блокировка площадки до тыка по кнопке
    if (this.playing) {
      // движение платформы
      this.paddle.x = this.game.input.x || this.game.world.width * 0.5;
    }
  }
  
  init() {
    this.game = new Phaser.Game(
      480,
      320,
      Phaser.CANVAS,
      null, {
        preload: this.preload,
        create : this.create,
        update : this.update
      })
  }
  
  startGame() {
    console.log('clack - start game')
    
    this.startButton.destroy();
    this.ball.body.velocity.set(this.velocity, -this.velocity); // после нажатия задаём скорость мячу
    this.playing = true;
  }
  
  ballMiss() {
    // если мяч падает за пределы платформы
    // игровой объект проверяет, находится ли он в пределах границ мира в каждом кадре.
    this.ball.checkWorldBounds = true;
    
    // событие onOutOfBounds  когда игровой объект покидает границы Phaser.World.
    this.ball.events.onOutOfBounds.add(function () {
      this.ballLeaveScreen()
    }, this);
  }
  
  showWinScreen() {
    let count_alive = -1;
  
    this.bricks.forEach(brick => {
      if (brick.alive === true) {
        count_alive++
      }
    })
  
    // YOU WIN ↓
    console.log(' ------------------ ')
    console.log(count_alive)
    console.log(' ------------------ ')
    if (count_alive === 0) {
      this.restartGame('You won the game, congratulations!')
    }
  }
  
  createBall() {
    // [0] чтобы вывести наш мяч на экран, мы используем  метод add.sprite()
    //                                                      последний параметр — это имя картинки  ↓
    this.ball = this.game.add.sprite(this.game.world.width * 0.5,  this.game.world.height - 20, 'ball');
    this.ball.animations.add('wobble', [0, 1, 0, 2, 0, 1, 0, 2, 0], 24); // добавить анимацию
    this.ball.anchor.set(0.5, 1)
  
    // нам необходимо добавить физическую систему,
    this.game.physics.enable(this.ball, Phaser.Physics.ARCADE);
    this.ball.body.gravity.y = 10 // гравитация
  
    this.ball.body.collideWorldBounds = true; // вкл столкновения
    this.ball.body.bounce.set(1); // вкл отскакиваемость
  }
  
  createPlatform() {
    this.paddle = this.game.add.sprite(this.game.world.width * 0.5, this.game.world.height - 10, 'paddle');
    this.paddle.anchor.set(0.5, 1);
  
    // нам необходимо добавить физическую систему,
    this.game.physics.enable(this.paddle, Phaser.Physics.ARCADE);
    this.paddle.body.immovable = true; // что бы платформа не утопала
  }
  
  createTweenKill(brick) {
    const killTween = this.game.add.tween(brick.scale);
    
    killTween.to({ x: 0.1, y: 0.5 }, 200, Phaser.Easing.Linear.None);
    
    // определяет функцию, которая будет выполняться после завершения анимации движения
    killTween.onComplete.addOnce(function () {
      brick.kill();
    }, this);
    
    // запуск анимации
    killTween.start();
  }
  
  createBricks() {
    this.bricks = this.game.add.group(); // инициализируйте пустой набор для хранения кирпичей
    
    this.brickInfo = {
      width: 50,
      height: 20,
      count: {
        row: this.row,
        col: this.col
      },
      offset: {
        top: 50,
        left: 60
      },
      padding: 10
    };
    
    // Теперь необходимо в каждой итерации создавать кирпич,
    // чтобы получить необходимое число кирпичей,
    // нарисовать их всех на экране и добавить в наш набор this.bricks
    for (let col = 0; col < this.brickInfo.count.col; col++) {
      for (let row = 0; row < this.brickInfo.count.row; row++) {
        //координата x каждого кирпича рассчитывается на основе суммы ширины кирпича
        // this.brickInfo.width и зазора this.brickInfo.padding, умноженной на номер столбца сol,
        // после этого добавляем отступ от левого края this.brickInfo.offset.left;
        let brickX = (col * (this.brickInfo.width + this.brickInfo.padding)) + this.brickInfo.offset.left;
        let brickY = (row * (this.brickInfo.height + this.brickInfo.padding)) + this.brickInfo.offset.top;
        
        this.newBrick = this.game.add.sprite(brickX, brickY, 'brick');
        this.game.physics.enable(this.newBrick, Phaser.Physics.ARCADE);
        this.newBrick.body.immovable = true;
        this.newBrick.anchor.set(0.5);
        
        this.bricks.add(this.newBrick);
      }
    }
  }
  
  createStartBtn() {
    this.startButton = this.game.add.button(
      this.game.world.width * 0.5, // pos x
      this.game.world.height * 0.5,// pos y
      'button',  // имя
      this.startGame, // Ф-ция обратного вызова, которая будет выполняться при нажатии кнопки.
      this,      // Ссылка на this определение контекста выполнения
      1, 0, 2    // кадры анимации
    );
    this.startButton.anchor.set(0.5);
  }
  
  collisionBallOnBricks = (ball, brick) => {
    this.createTweenKill(brick)
    
    // ↓ обновляем очки при разрушении ↓
    this.score += 10;
    this.scoreText.setText('Points: '+this.score);
  
    this.showWinScreen()
  }
  
  collisionBallOnPaddle(ball, paddle) {
    ball.animations.play('wobble');
    ball.body.velocity.x = (-1 * 5) * (paddle.x - ball.x);
    //  новая скорость тем выше, чем больше расстояние между центром ракетки и местом, где в нее попадает мяч.
    //  Кроме того, направление (влево или вправо) определяется этим значением - если мяч ударяется
    //  о левую сторону ракетки, он отскакивает влево,
    //  а при ударе по правой стороне он отскакивает вправо.
  }
  
  createScore(value = 0) {
    this.scoreText = this.game.add.text(5, 5, `Points: ${ value }`, this.textStyle);
  }
  
  createLives() {
    this.livesText = this.game.add.text(this.game.world.width - 10, 5, 'Lives: ' + this.lives, this.textStyle);
    this.livesText.anchor.set(1, 0);
  
    this.lifeLostText = this.game.add
      .text(
        this.game.world.width * 0.5,  // x
        this.game.world.height * 0.7, // y
        'Life lost, click to continue',
        this.textStyle
      );
    this.lifeLostText.anchor.set(0.5);
    
    this.lifeLostText.visible = false;
  }
  
  // когда мяч вышел за пределы экрана
  ballLeaveScreen() {
    // уменьшать количество жизней каждый раз, когда шар выйдет за пределы окна Canvas.
    this.lives--;
    
    if (this.lives) {
      this.livesText.setText('Lives: ' + this.lives);
      this.lifeLostText.visible = true;
      
      this.ball.reset(this.game.world.width * 0.5, this.game.world.height - 25);
      this.paddle.reset(this.game.world.width * 0.5, this.game.world.height - 5);
      
      this.game.input.onDown
        .addOnce(function () {
          this.lifeLostText.visible = false;
          this.ball.body.velocity.set(150, -150);
        }, this);
    } else {
      this.restartGame('You lost, game over!')
    }
  }
  
  restartGame(text) {
    alert(text);
    location.reload();
  }
}

new Game().init()

