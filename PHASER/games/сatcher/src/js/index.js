class Game {
  constructor() {
    this.game = null
    
    this.cat = null
    this.catcher = null
    this.controls = null
    this.txtScore = null
    this.score = 0
    this.styleText = {
      font: '30px Arial',
      fill: '#444FFF'
    }
  }
  
  preload = () => {
    console.log('preload')
    //  игра не начнется, пока не будут загружены все активы
    this.game.load.image('bg', '../src/img/bg.png')
    this.game.load.image('cat', '../src/img/cat.png')
    this.game.load.image('catcher', '../src/img/catcher.png')
  }
  
  create = () => {
    console.log('create')
    this.game.add.sprite(0, 0, 'bg')
    
    // catcher
    this.catcher = this.game.add.sprite(400, 100, 'catcher')
    this.catcher.anchor.setTo(0.5, 0.5)
    // включить физика для игрока
    this.game.physics.enable(this.catcher, Phaser.Physics.ARCADE);
    
    // cat
    this.cat = this.game.add.sprite(Math.random() * this.game.width,
      Math.random() * this.game.height, 'cat');
    this.game.physics.enable(this.cat, Phaser.Physics.ARCADE);
    
    //  score
    this.txtScore = this.game.add.text(40, 10, this.score.toString(),
      this.styleText);
    
    //  controls
    /*
      Мы будем ссылаться на объект курсора на шаге обновления,
      но это настроит прослушиватели для состояний
      вверх и вниз клавиш вверх, вниз, влево и вправо
    */
    this.controls = this.game.input.keyboard.createCursorKeys()
  }
  
  // В фазере метод игрового цикла называется обновлением
  update = () => {
    console.log('update')
    this.moveCatcher()
    
    this.game.physics.arcade.overlap(this.catcher, this.cat, this.catHitHandler)
  }
  
  init() {
    this.game = new Phaser.Game(
      800,
      600,
      Phaser.CANVAS,
      null, {
        preload: this.preload,
        create : this.create,
        update : this.update
      })
  }
  
  moveCatcher() {
    if (this.controls.left.isDown) {
      this.catcher.x -= 5
      this.catcher.scale.x = 1
    }
    if (this.controls.right.isDown) {
      this.catcher.x += 5
      this.catcher.scale.x = -1
    }
    if (this.controls.up.isDown) {
      this.catcher.y -= 5
    }
    if (this.controls.down.isDown) {
      this.catcher.y += 5
    }
  }
  
  catHitHandler() {
    console.log(11)
  }
}

new Game().init()

