class Game {
  constructor() {
    this.game = null;
  
    // кнопка старт
    this.playing = false; // пригодится сделать ракетку неподвижной
    this.startButton = null;
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
    this.createStartBtn()
  }
  
  update = () => {
    // код внутри update - это requestAnimations - он всё время запущен
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
    console.log('start game')
  }
  
  createStartBtn() {
    this.startButton = this.game.add.button(
      this.game.world.width  * 0.5, // pos x
      this.game.world.height * 0.5,// pos y
      'button',       // имя
      this.startGame, // Ф-ция обратного вызова, которая будет выполняться при нажатии кнопки.
      this,           // Ссылка на this определение контекста выполнения
      1, 0, 2         // Кадры анимации
    );
    this.startButton.anchor.set(0.5);
  }
}

new Game().init()

