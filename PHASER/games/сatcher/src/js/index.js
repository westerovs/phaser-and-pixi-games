class Game {
  constructor() {
    this.game = null;
  
  }
  
  preload = () => {
    console.log('preload')
    //  игра не начнется, пока не будут загружены все активы
    this.game.load.image('cat', '../src/img/cat.png')
    this.game.load.image('catcher', '../src/img/catcher.png')
    this.game.load.image('bg', '../src/img/bg.png')
  }
  
  create = () => {
    console.log('create')
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

