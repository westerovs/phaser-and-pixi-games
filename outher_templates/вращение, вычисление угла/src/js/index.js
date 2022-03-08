import Part from './Part.js'

const Anchor = {
  CENTER: [0.5, 0.5],
  T_L: [0, 0],
  T_R: [1, 1],
  B_L: [0, 1],
  B_R: [1, 1],
}

class Game {
  constructor() {
    this.game  = null
    this.group = null
    
    this.PANEL_PARTS = 5
    this.panelParams = {
      width  : 200,
      height : 200,
      padding: 50,
      offset : {
        top : 50,
        left: 0,
      }
    }
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
        render : this.render
      })
  }
  
  preload = () => {
    this.game.load.image('block1', './src/img/block1.png')
  }
  
  create = () => {
    console.clear()
    this.group = this.game.add.group()
  
    // new Part(this.game, 200, 200, Anchor.T_L, 'T_L')
    new Part(this.game,400, 400, Anchor.CENTER, 'center')
    // new Part(this.game,600, 200, Anchor.T_R, 'T_R')
    // new Part(this.game,200, 600, Anchor.B_L, 'B_L')
    // new Part(this.game,600, 600, Anchor.B_R, 'B_R')
  }

  
  createImage = (x, y) => {
    const image = this.game.add.sprite(x, y, 'block1')
    image.anchor.set(0.5)
    
    return image
  }
}

new Game().init()

