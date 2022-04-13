import Part from './Part.js'

const Anchor = {
  CENTER: [0.5, 0.5],
  T_L: [0, 0],
  T_R: [1, 0],
  B_L: [0, 1],
  B_R: [1, 1],
}

class Game {
  constructor() {
    this.game  = null
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
      })
  }

  preload = () => {
    this.game.load.image('block1', './src/img/block1.png')
  }

  create = () => {

    new Part(this.game,100, 100, Anchor.T_L, 'block1')
    new Part(this.game,350, 350, Anchor.CENTER, 'block1')
    new Part(this.game,600, 100, Anchor.T_R, 'block1')
    new Part(this.game,100, 600, Anchor.B_L, 'block1')
    new Part(this.game,600, 600, Anchor.B_R, 'block1')
  }
}

new Game().init()


