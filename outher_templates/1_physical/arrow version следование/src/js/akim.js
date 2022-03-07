class Game {
  constructor() {
    this.game = null
    
    this.block  = null
    this.target = null
    this.delta  = {x: 0, y: 0}
    
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
        render : this.render
      })
  }
  
  preload = () => {
    this.game.load.image('block', './src/img/block.png')
    this.game.load.image('ball', './src/img/pangball.png')
  }
  
  create = () => {
    this.game.stage.backgroundColor = '#0072bc'
    this.game.input.addMoveCallback(this.onTouchMove)
    
    this.block = this.createArrow(200, 250, 0, 0.5)
    this.block.anchor.set(0.5)
    // this.block.rotation = -0.4326641357405498
    
    this.block.events.onInputDown.add((_, {x, y}) => {
      this.target = this.createTarget(x + this.delta.x, y + this.delta.y)
    })
    
    this.block.events.onInputUp.add(() => {
      this.target.destroy()
      this.target = null
    })
  
  }
  
  update = () => {
    if (this.target) {
      // устанавливает поворот для стрелочки
      console.log(this.game.physics.arcade.angleBetween(this.block, this.target))
      // this.block.rotation = this.game.physics.arcade.angleBetween(this.target, this.block)
      this.block.rotation = this.game.physics.arcade.angleBetween(this.block, this.target)
      if (this.block.rotation >= 0.00) return
    }
  }
  
  render = () => {
    this.game.debug.text('Arrow', 20, 20, '#FF00AE');
    this.game.debug.spriteInfo(this.block, 20, 40)
    this.game.debug.spriteBounds(this.block)
    
    if (this.target) {
      this.game.debug.text('Target', 360, 20, '#FF00AE');
      this.game.debug.spriteBounds(this.target)
      this.game.debug.spriteInfo(this.target, 360, 40)
    }
  }
  
  createArrow = (x, y, anchorX = 0.5, anchorY = 0.5) => {
    const block = this.game.add.sprite(x, y, 'block')
    block.anchor.setTo(anchorX, anchorY)
    block.inputEnabled = true
    
    return block
  }
  
  createTarget = (x, y, anchorX = 0.5, anchorY = 0.5) => {
    const target = this.game.add.sprite(x, y, 'ball')
    target.anchor.setTo(anchorX, anchorY)
    target.inputEnabled = true
    target.input.enableDrag(true)
    // target.scale.set(3)
    
    return target
  }
  
  onTouchMove = (pointer, x, y) => {
    if (this.target) {
      // делает custom drag для target, инициализирует его в месте курсора
      this.target.position.set(x + this.delta.x, y + this.delta.y)
    }
  }
}

new Game()
