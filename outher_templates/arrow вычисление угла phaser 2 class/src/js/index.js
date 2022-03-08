import Part from './Part.js'

class Game {
  constructor() {
    this.game  = null
    this.part = null
  }
  
  init() {
    this.game = new Phaser.Game(
      1366,
      1366,
      Phaser.CANVAS,
      null,
      {
        preload: this.preload,
        create : this.create,
        update : this.update,
      })
  }
  
  preload = () => {
    this.game.load.image('block', '/src/img/block1.png')
  }
  
  create = () => {
    this.part = new Part(this.game)
    this.part.create(-100, -100, 0, 0.5)
  }
  
  update = (time) => {
    this.part.update(time)
  }
}

new Game().init()

