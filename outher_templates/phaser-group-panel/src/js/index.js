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
  }
  
  preload = () => {
    this.game.load.image('background', '/src/img/background.jpg')
    this.game.load.image('item_panel1', '/src/img/item_panel1.jpg')
  }
  
  create = () => {
    this.game.add.tileSprite(0, 0, 1366, 1366, 'background')
    this.game.world.setBounds(0, 0, 1366, 1366)
    
    this.createPanel(200, 0)
  }
  
  createPanel = (x, y) => {
    this.panel = this.game.make.group()
    this.panel.position.set(x, y)
    
    this.createPanelItems()
    
    this.panel.setAll('anchor.x', 0.5)
    this.panel.setAll('anchor.y', 0.5)
    
    this.game.world.add(this.panel)
    // this.panel.inputEnabledChildren = true
    this.panel.onChildInputDown = () => console.log('!!!')
  }
  
  createPanelItems = () => {
    for (let i = 0; i < this.PANEL_PARTS; i++) {
      const panelPosX = 0
      const panelPosY = i * (this.panelParams.height + this.panelParams.offset.top)
      
      const newItem = this.createRect(panelPosX, panelPosY, 200, 200)
      this.panel.add(newItem)
    }
  }
  
  createRect = (x, y, w, h) => {
    const rect = this.game.add.graphics(0, 0)
    rect.beginFill(0xFF00AE)
    // rect.anchor.set(0.5)
    rect.drawRect(x, y, w, h)
    
    return rect
  }
  
  update = () => {
    // код внутри update - это requestAnimations - он всё время запущен
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

