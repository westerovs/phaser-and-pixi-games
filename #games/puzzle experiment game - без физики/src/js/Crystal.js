const isWin = (crystal) => {
  const rotation = +crystal.rotation.toFixed(2)

  if (rotation >= 0 && rotation <= 0.02) {
    crystal.alpha = 1
    crystal.disabled = true
  }
}

export default class Part {
  constructor(game, x, y, anchor, sprite, disabled = false, initAngle) {
    this.game = game
    this.positionPartX = x
    this.positionPartY = y
    this.anchor = anchor
    this.anchorX = this.anchor[0]
    this.anchorY = this.anchor[1]
    this.sprite = sprite
    this.disabled = disabled
    this.initAngle = initAngle
    
    this.block = null
    this.progress = 0
    this.startProgress = this.initAngle
    this.val = 0
    this.nex = null
    this.degreeAngle = null
    this.startTouches = null
    
    this.init()
  }
  
  init = () => {
    this.#create()
  }
  
  #create = () => {
    this.block = this.game.add.sprite(this.positionPartX + (this.anchorX * 100), this.positionPartY + (this.anchorY * 100), this.sprite)
    this.block.alpha = this.disabled ? 1 : 0.5
    
    this.block.inputEnabled = this.disabled ? false : true
    this.block.inputEnabled = true
    this.block.angle = this.startProgress
    this.block.anchor.set(...this.anchor)
    
    this.block.events.onInputDown.add(this.#touchStart)
    this.block.events.onInputUp.add(this.#touchUp)
    
    // this.block.input.pixelPerfectClick = true;
    // this.block.input.pixelPerfectOver = true;
    // this.block.input.useHandCursor = true;
    
    this.game.world.add(this.block)
    return this.block
  }
  
  #touchStart = (sprite, pointer) => {
    this.block.isPressed = true
    
    this.startProgress = this.progress
    this.nex = parseFloat(this.block.angle)
    
    // получаем первые координаты касания
    this.startTouches = {
      x: pointer.x,
      y: pointer.y
    }
    
    this.game.input.addMoveCallback(this.#touchMove)
  }
  
  #touchMove = (pointer, crystal) => {
    if (this.block.disabled) return;
    
    if (!this.block.isPressed) return
    if (!pointer.isDown || !this.startTouches) return
    
    // получаем координаты текущего касания
    const touch = {
      x: pointer.x,
      y: pointer.y
    }
    
    // центр объекта
    const center = {
      x: this.block.centerX + (this.anchorX * 100),
      y: this.block.centerY + (this.anchorY * 100)
    }
    
    // вычисление угла
    let angleDistance = Math.atan2(
      (center.x - touch.x) * (center.y - this.startTouches.y)
      - (center.y - touch.y) * (center.x - this.startTouches.x),
      
      (center.x - touch.x) * (center.x - this.startTouches.x)
      + (center.y - touch.y) * (center.y - this.startTouches.y),
    )
    
    angleDistance *= -1
    this.degreeAngle = angleDistance * (180 / Math.PI)
    
    this.val = this.degreeAngle + this.nex
    this.block.angle = this.val
  
    //  ==================
    isWin(this.block)
  }
  
  #touchUp = () => {
    this.block.isPressed = false
  }
}
