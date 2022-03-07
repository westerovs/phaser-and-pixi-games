class Game {
  constructor() {
    this.game = null

    this.block1  = null
    this.block2  = null
    this.target1 = null
    this.target2 = null

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
    this.game.input.addMoveCallback(this.onTouchMove)
    this.game.stage.backgroundColor = '#0072bc'

    this.block1 = this.createBlock(200, 200, 0.5, 0.5)
    this.target1 = this.createTarget(500, 200)

  }
  
  createBlock = (x, y, anchorX = 0.5, anchorY = 0.5) => {
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

  update = () => {
    this.block1.rotation = this.game.physics.arcade.angleBetween(this.block1, this.target1)
  }

  render = () => {
    this.game.debug.text("Drag the ball", 32, 32)
    this.game.debug.spriteInfo(this.block1, 32, 100)
  }

  onTouchMove = (pointer, x, y) => {

  }
}

new Game()








