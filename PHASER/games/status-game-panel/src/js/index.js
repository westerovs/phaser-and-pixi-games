class Game {
  constructor() {
    this.game = null
    this.panel = null
    
    this.lifeParams = {
      col    : 3,
      width  : 60,
      height : 50,
      padding: 10, // расстояние между sprites
      offset : {
        top : 2,
        left: 40,
      },
    }
    this.panelParams = {
      width : 222,
      height: 55,
      offset: {
        top : 0,
        left: 0,
      },
    }
  }
  
  preload = () => {
    this.game.stage.backgroundColor = '#244000'    // поменять фон канваса
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.game.scale.pageAlignHorizontally = true
    this.game.scale.pageAlignVertically = true
    
    this.game.load.image('panel', './src/img/panel.png')
    this.game.load.image('light', './src/img/light.png')
    this.game.load.image('life', './src/img/life.png')
  }
  
  create = () => {
    this.createPanel(0, 50, 'life')
    this.createPanel(100, 150, 'light')
  }
  
  update = () => {
    // код внутри update - это requestAnimations - он всё время запущен
  }
  
  init() {
    this.game = new Phaser.Game(
      400,
      400,
      Phaser.CANVAS,
      null, {
        preload: this.preload,
        create : this.create,
        update : this.update
      })
  }
  
  createPanel(x, y, sprite) {
    this.panel = this.game.add.group()
    const panelPosX = (this.panelParams.width / 2) + this.panelParams.offset.left
    const panelPosY = this.panelParams.height / 2
    
    const newPanel = this.game.add.sprite(panelPosX, panelPosY, 'panel')
    newPanel.anchor.set(0.5)
    this.panel.add(newPanel)

    this.createPanelItems(sprite)
    this.panel.position.set(x, y)
  }
  
  createPanelItems(sprite) {
    for (let i = 0; i < this.lifeParams.col; i++) {
      const lifePosX = (i * (this.lifeParams.width + this.lifeParams.padding)) + this.lifeParams.offset.left
      const lifePosY = (this.lifeParams.height / 2) + this.lifeParams.offset.top
    
      const newLife = this.game.add.sprite(lifePosX, lifePosY, sprite)
      newLife.anchor.set(0.5)
      this.panel.add(newLife)
    }
  }
}

new Game().init()
