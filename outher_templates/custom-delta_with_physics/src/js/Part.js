export default class Part {
  constructor(game, x, y, anchor, sprite) {
    this.game = game
    this.positionPartX = x
    this.positionPartY = y
    this.anchor = anchor
    this.anchorX = this.anchor[0]
    this.anchorY = this.anchor[1]
    this.sprite = sprite
  
    this.isPhysicsOn = false
    
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
    this.#create()
  }
  
  #create = () => {
    this.block = this.game.add.sprite(
      this.positionPartX + (this.anchorX * 100),
      this.positionPartY + (this.anchorY * 100),
      this.sprite)
    
    this.#enablePhysics()
  
    this.block.inputEnabled = true
    this.block.angle = this.startProgress
    this.block.anchor.set(...this.anchor)
    this.block.body.offset.set(this.anchorX * 100, this.anchorY * 100)
    
    this.block.events.onInputDown.add(this.#touchStart)
    this.block.events.onInputUp.add(this.#touchUp)

    this.game.world.add(this.block)
    return this.block
  }
  
  #enablePhysics = () => {
    this.isPhysicsOn = true
    
    //  Включить p2 physics
    this.game.physics.startSystem(Phaser.Physics.P2JS)
    
    // Сделайте более упругими
    this.game.physics.p2.defaultRestitution = 0.8
    this.game.physics.p2.restitution = 0.1
    this.game.physics.p2.gravity.x = 0
    this.game.physics.p2.gravity.y = 0
    
    // включить физику для следующих объектов
    this.game.physics.p2.enable(this.block, true)
    
    this.block.body.collideWorldBounds = true
    // this.block.body.fixedRotation = false // выкл поворот
    // this.block.body.kinematic = true
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
  
  #touchMove = (pointer) => {
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
    
    if (!this.isPhysicsOn) {
      console.log('isPhysicsOn false')
      this.block.angle = this.val
    }
    else {
      console.log('isPhysicsOn true')
      this.block.body.angle = this.val
    }
  }
  
  #touchUp = () => {
    this.block.isPressed = false
  }
}
