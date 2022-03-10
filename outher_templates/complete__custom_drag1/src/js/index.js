class Game {
  constructor() {
    this.game  = null
    this.block = null
    
    this.INIT_POSITION = {
      x: 200,
      y: 200
    }
    this.initAngle = null
    
    this.position = {
      x: this.INIT_POSITION.x,
      y: this.INIT_POSITION.y
    }
    this.startPosition = {
      x: null,
      y: null
    }
    this.startTouches = 0
  
    this.count = 1
    this.temp = null
    this.init()
  }
  
  init() {
    this.game = new Phaser.Game(
      800,
      800,
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
    this.game.load.image('block', '/src/img/block.jpg')
  }
  
  create = () => {
    this.block = this.game.add.sprite(200, 200, 'block')
    this.block.anchor.set(0.5, 0.5)
    this.block.inputEnabled = true
    this.initAngle = this.block.angle
    
    // touchstart
    this.block.events.onInputDown.add(this.onTouchStart)
    this.game.input.addMoveCallback(this.onTouchMove, this)
    this.block.events.onInputUp.add(this.onTouchEnd)
  }
  
  update = (time) => {
    if (this.block.isPressed) {

    }
  }
  
  render = () => {}
  
  onTouchStart = (crystal, pointer) => {
    this.block.prevPosition = {x: pointer.x, y: pointer.y}
    this.block.isPressed = true
    
    this.startTouches = {
      x: pointer.x,
      y: pointer.y
    }
    
    this.startPosition = {
      x: this.position.x,
      y: this.position.y
    }
  }
  
  getTempXY = (x, y) => {
    this.temp = {
      x,
      y
    }
  }
  
  onTouchMove = (pointer, a, b, c) => {
    if (!this.block.isPressed) return
    
    if (!this.temp) {
      this.temp = {
        x: pointer.x,
        y: pointer.y
      }
    }
    
    const moveTouches = {
      x: pointer.x,
      y: pointer.y
    }
    
    //                          ↓ предыдущий кадр
    const differenceStartMoveX = this.temp.x - moveTouches.x
    const differenceStartMoveY = this.temp.y - moveTouches.y
    
    this.position = {
      x: this.startPosition.x - differenceStartMoveX,
      y: this.startPosition.y - differenceStartMoveY,
    }
  
    this.temp = {
      x: pointer.x,
      y: pointer.y
    }
  
    if (differenceStartMoveX <= 0) this.block.angle++
    if (differenceStartMoveX >= 0) this.block.angle--
    if (differenceStartMoveY >= 0) this.block.angle++
    if (differenceStartMoveY <= 0) this.block.angle--
    
    // let max = 0
    // let absX = Math.abs(differenceStartMoveX)
    // let absY = Math.abs(differenceStartMoveY)
    //
    // if (Math.max(absX, absY) === absX) {
    //   max = differenceStartMoveX
    //   console.log('+')
    // } else {
    //   console.log('-')
    //   max = differenceStartMoveY
    // }
    //
    // const coef = 50
    // this.block.angle += max / coef
    // console.log(this.block.angle)
  
    // this.initAngle += this.count++
    // this.block.angle = this.initAngle / 1000
  }
  
  onTouchEnd = () => {
    this.block.isPressed = false
  }
}

new Game()

