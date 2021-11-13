class Game {
  constructor() {
    this.game = null;
    this.startButton = null;
    
    this.count = 0;
  }
  
  preload = () => {
    this.game.load.spritesheet('test-button', '/src/img/button.png', 120, 40);
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
      400,
      Phaser.CANVAS,
      null,
      {
        preload: this.preload,
        create : this.create,
        update : this.update
      })
  }

  createStartBtn() {
    this.startButton = this.game.add.button(
      this.game.world.width  * 0.5,
      this.game.world.height * 0.5,
      'test-button',     // имя как в preload спрайте
      this.clickHandler, // колбек при нажатии кнопки.
      this,              // Ссылка на this определение контекста выполнения
      1, 0, 2            // Кадры анимации
    );
    console.log(this.startButton)
    this.startButton.anchor.set(0.5);
  }
  
  clickHandler() {
    console.log('count', this.count += 5)
  }
}

new Game().init()

