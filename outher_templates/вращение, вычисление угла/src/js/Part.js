export default class Part {
  constructor(game, x, y, anchor, name) {
    this.game = game
    this.positionPartX = x
    this.positionPartY = y
    this.anchor = anchor
    this.name = name
    
    this.block = null
    this.progress = 0
    this.startProgress = 0
    this.val = 0
    this.nex = null
    this.degreeAngle = null
    this.startTouches = null
    
    this.init()
  }
  
  init = () => {
    this.create()
  }
  
  create = () => {
    this.block = this.game.add.sprite(this.positionPartX, this.positionPartY, 'block1')
    this.block.inputEnabled = true
    this.block.angle = this.startProgress
    // this.block.anchor.set(...this.anchor)
    this.block.anchor.set(0.5)
  
    this.block.events.onInputDown.add(this.touchStart)
    this.block.events.onInputUp.add(this.touchUp)
    
    this.game.world.add(this.block)
    return this.block
  }
  
  touchStart = (sprite, pointer) => {
    this.startProgress = this.progress
    this.nex = parseFloat(this.block.angle)
    
    // получаем первые координаты касания
    this.startTouches = {
      x: pointer.x,
      y: pointer.y
    }
  
    this.game.input.addMoveCallback(this.touchMove)
  }
  
  touchMove = (pointer) => {
    if (!pointer.isDown) return
    if (!this.startTouches) return
  
    // получаем координаты текущего касания
    const touch = {
      x: pointer.x,
      y: pointer.y
    }
    
    // центр объекта
    const center = {
      x: this.block.centerX,
      y: this.block.centerY
    }
    
    // вычисление угла
    let angleDistance = Math.atan2(
      (center.x - touch.x) * (center.y - this.startTouches.y) - (center.y - touch.y) * (center.x - this.startTouches.x),
      (center.x - touch.x) * (center.x - this.startTouches.x) + (center.y - touch.y) * (center.y - this.startTouches.y)
    )
  
    angleDistance *= -1
    
    this.degreeAngle = angleDistance * (180 / Math.PI)
    this.val = this.degreeAngle + this.nex
    this.block.angle = this.val
  }
  
  touchUp = () => {
    console.log('UP')
  }
}
