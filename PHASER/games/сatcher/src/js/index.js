class Game {
  constructor() {
    this.game = null
    
    this.cat = null
    this.catcher = null
    this.cursors = null
    this.txtScore = null
    this.score = null
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
    this.catcher = this.game.add.sprite(400, 100, 'catcher')
    this.catcher.anchor.setTo(0.5, 0.5)
    this.game.physics.enable(this.catcher, Phaser.Physics.ARCADE);
  }
  
  update = () => {
    console.log('update')
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
}

new Game().init()

