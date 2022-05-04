const tweenSetAlpha = (game, sprite, alpha, second = 0.5, secondDelay = 0) => {
  return game.add
    .tween(sprite)
    .to({alpha}, Phaser.Timer.SECOND * second, Phaser.Easing.Linear.None, true, secondDelay * 1000)
}

class Game {
  constructor() {
    this.game  = null
  
    this.hint  = null
    this.sofa  = null
    this.sofaX = null
    this.sofaY = null
    this.init()
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
  
  preload() {
    this.game.load.image('hint', '/src/img/hint.png')
    this.game.load.image('sofa', '/src/img/broken-sofa.png')
  }
  
  create = () => {
    this.sofa = this.game.add.sprite(150, 150, 'sofa')
    this.sofaX = this.sofa.x
    this.sofaY = this.sofa.y
    
    this.initHint()
  }
  
  update() {
  
  }
  
  initHint = () => {
    const offset = {
      x: this.sofa.width,
      y: this.sofa.height,
    }
    const duration = 250
    
    this.hint = this.game.add.sprite(this.sofaX + offset.x, this.sofaY + offset.y, 'hint')
    
    this.hint.alpha = 0
    tweenSetAlpha(this.game, this.hint, 1, 0.250)
    
    const tween1 = this.game.add.tween(this.hint).to({x: this.sofaX, y: this.sofaY + this.sofa.width / 2}, duration)
    const tween2_Scale = this.game.add.tween(this.hint.scale).to({x: 0.8, y: 0.8}, duration / 2)
    const tween3 = this.game.add.tween(this.hint).to({x: this.sofaX + this.sofa.width / 2, y: this.sofaY}, duration)
    const tween4 = this.game.add.tween(this.hint).to({x: this.sofaX, y: this.sofaY + this.sofa.height}, duration)
    const tween5 = this.game.add.tween(this.hint).to({x: this.sofaX + this.sofa.width / 1.2, y: this.sofaY}, duration)
  
    // координаты улетания
    const lastPosition = {
      x: this.sofaX + this.sofa.width / 2,
      y: this.sofaY + this.sofa.height
    }
    const tween6 = this.game.add.tween(this.hint).to({x: lastPosition.x, y: lastPosition.y}, duration)
    const tween7_Scale = this.game.add.tween(this.hint.scale).to({x: 1, y: 1}, duration / 2)
  
    tween1.chain(
      tween2_Scale,
      tween3,
      tween4,
      tween5,
      tween6,
      tween7_Scale,
    )
    tween1.start()
  
    tween7_Scale.onComplete.add(() => {
      tweenSetAlpha(this.game, this.hint, 0, 0.250)
      this.game.add.tween(this.hint).to({x: lastPosition.x + offset.x, y: lastPosition.y + offset.y}, duration, Phaser.Easing.Linear.None, true)
    })
  
  }
}

new Game()

