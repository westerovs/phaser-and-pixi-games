class Game {
  constructor() {
    this.game  = null
    this.panel = null
    
    this.PANEL_PARTS = 4
    this.panelParams = {
      width  : 200,
      height : 200,
      padding: 50,
      offset : {
        top : 50,
        left: 0,
      }
    }
    
    this.crystalParts = [
      {
        x: 250,
        y: 80,
        angle: 0,
        key: 'crystalPart1'
      },
      {
        x: 530,
        y: 130,
        angle: 0,
        key: 'crystalPart2'
      },
      {
        x: 125,
        y: 310,
        angle: 0,
        key: 'crystalPart3'
      }
    ]
  }
  
  preload = () => {
    this.game.load.image('bg', '/src/img/bg.jpg')
    this.game.load.image('crystalBody', '/src/img/crystalBody.png')
    this.game.load.image('crystalPart1', '/src/img/crystal_part1.png')
    this.game.load.image('crystalPart2', '/src/img/crystal_part2.png')
    this.game.load.image('crystalPart3', '/src/img/crystal_part3.png')
  }
  
  create = () => {
    this.game.add.sprite(0, 0, 'bg')
    this.game.add.sprite(200, 200, 'crystalBody')
    
    this.createCrystalParts()
  }
  
  createCrystalParts = () => {
    this.crystalParts.forEach(item => {
      this.game.add.sprite(item.x, item.y, item.key)
    })
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
}

new Game().init()

