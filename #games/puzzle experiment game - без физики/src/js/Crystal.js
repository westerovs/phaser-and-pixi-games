const isWin = (game, crystal) => {
  const rotation = +crystal.rotation.toFixed(2)

  // авто-доводка если фигура становится на базу
  if (Math.abs(rotation) >= 0 && Math.abs(rotation) <= 0.15) {
    crystal.tint = 0x2DE200
    crystal.disabled = true
  
    game.add.tween(crystal)
      .to({
        angle: 0,
      }, Phaser.Timer.HALF / 2, Phaser.Easing.Linear.None, true)
  }
  
  // switch (crystal.key) {
  //   case 'crystalLeft': console.log(rotation)
  //     break;
  //   case 'crystalTop': console.log(rotation)
  //     break;
  //   case 'crystalRight':
  //     // console.log(rotation)
  //     if (rotation >= -2.15 && rotation <= -2) console.warn(true)
  //     break;
  // }
}

const createError = () => {

}

export default class Part {
  constructor(game, x, y, anchor, sprite, disabled = false, initAngle, finishAngle) {
    this.game = game
    this.positionPartX = x
    this.positionPartY = y
    this.anchor = anchor
    this.anchorX = this.anchor[0]
    this.anchorY = this.anchor[1]
    this.sprite = sprite
    this.disabled = disabled
    this.initAngle = initAngle
    this.finishAngle = finishAngle
    
    this.group = null
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
    this.group = this.game.add.group()
    
    this.block = this.game.make.image(this.positionPartX + (this.anchorX * 100), this.positionPartY + (this.anchorY * 100), this.sprite)
    this.block.inputEnabled = this.disabled ? false : true
    this.block.angle = this.startProgress
    this.block.anchor.set(...this.anchor)
    
    this.block.events.onInputDown.add(this.#touchStart)
    this.block.events.onInputUp.add(this.#touchUp)
  
    this.group.add(this.block)
    this.game.world.add(this.group)
    this.group.position.set(0, 0)

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
  
  #touchMove = (pointer) => {
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
    isWin(this.game, this.block)
  }
  
  #touchUp = () => {
    this.block.isPressed = false
    
    if (this.block.disabled) return
    
    this.block.angle = this.initAngle
  }
}
