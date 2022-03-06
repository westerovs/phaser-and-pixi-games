class Game {
  constructor() {
    this.game = null
    
    this.arrow  = null;
    this.ball = null;
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
    this.game.load.image('arrow', './src/img/longarrow.png');
    this.game.load.image('ball', './src/img/pangball.png');
  }
  
  create = () => {
    this.game.stage.backgroundColor = '#0072bc'
    this.game.input.addMoveCallback(this.onTouchMove)
    
    this.arrow = this.createBlock(200, 250, 0, 0.5)
    
    this.arrow.events.onInputDown.add((_, {x, y}) => {
      this.ball = this.createTarget(x + this.delta.x, y + this.delta.y)
    })
    
    this.arrow.events.onInputUp.add(() => {
      this.ball.destroy()
      this.ball = null
    })
  }
  
  createBlock = (x, y, anchorX = 0.5, anchorY = 0.5) => {
    const block = this.game.add.sprite(x, y, 'arrow')
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
    if (this.ball) {
      this.arrow.rotation = this.game.physics.arcade.angleBetween(this.arrow, this.ball)
    }
  }
  
  render = () => {
    this.game.debug.text("Drag the ball", 32, 32);
    this.game.debug.spriteInfo(this.arrow, 32, 100);
  }
  
  onTouchMove = (pointer, x, y) => {
    if (this.ball) {
      console.log('onTouchMove')
      this.ball.position.set(x + this.delta.x, y + this.delta.y)
    }
  }
}

new Game()
