export default class Part {
  constructor(game, x, y, anchor, sprite) {
    this.game = game
    this.positionPartX = x
    this.positionPartY = y
    this.anchor = anchor
    this.sprite = sprite
    
    this.block = null
    this.progress = 0
    this.startProgress = 0
    this.finishVal = 0
    this.angleTouchStart = null
    this.degreeAngle = null
    this.startTouches = null
    
    this.init()
  }
  
  init = () => {
    this.#create()
  }
  
  #create = () => {
    this.block = this.game.make.image(this.positionPartX, this.positionPartY, this.sprite)
  
    this.block.inputEnabled = true
    this.block.angle = this.startProgress
    this.block.anchor.set(...this.anchor)
    
    this.block.events.onInputDown.add(this.#touchStart)
    this.block.events.onInputUp.add(this.#touchUp)
    
    this.game.world.add(this.block)
    return this.block
  }
  
  #touchStart = (sprite, pointer) => {
    this.block.isPressed = true
  
    this.startProgress = this.progress
    this.angleTouchStart = parseFloat(this.block.angle)
    
    // получаем первые координаты касания
    this.startTouches = {
      x: pointer.x,
      y: pointer.y
    }
  
    this.game.input.addMoveCallback(this.#touchMove)
  }
  
  #touchMove = (pointer) => {
    if (!this.block.isPressed) return
    if (!pointer.isDown || !this.startTouches) return
  
    // получаем координаты текущего касания
    const touch = {
      x: pointer.x,
      y: pointer.y
    }
  
    const anchorPosition = {
      x: this.block.position.x,
      y: this.block.position.y,
    }
    
    // вычисление угла
    let angleDistance = Math.atan2(
      (anchorPosition.x - touch.x) * (anchorPosition.y - this.startTouches.y)
      - (anchorPosition.y - touch.y) * (anchorPosition.x - this.startTouches.x),
  
      (anchorPosition.x - touch.x) * (anchorPosition.x - this.startTouches.x)
      + (anchorPosition.y - touch.y) * (anchorPosition.y - this.startTouches.y),
    )
    
    angleDistance *= -1
    this.degreeAngle = angleDistance * (180 / Math.PI)
  
    this.finishVal = Math.trunc(this.degreeAngle + this.angleTouchStart)
    this.block.angle = this.finishVal
  }
  
  #touchUp = () => {
    this.block.isPressed = false
  }
}
