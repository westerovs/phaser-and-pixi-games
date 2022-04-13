import {autoRotate} from '../utils/utils.js'
import IsWin from './isWin.js'

export default class Crystal {
  constructor(
    game, x, y, anchor, name, disabled = false,
    initAngle, finishAngle, isComplete
  ) {
    this.game = game
    this.positionPartX = x
    this.positionPartY = y
    this.anchor = anchor
    this.anchorX = this.anchor[0]
    this.anchorY = this.anchor[1]
    this.sprite = name
    this.disabled = disabled
    this.initAngle = initAngle
    this.finishAngle = finishAngle
    this.isComplete = isComplete
    
    //
    this.mainGroup = game.add.group()
    this.mainGroupOffset = {
      x: 300,
      y: 300,
    }
    this.block = null
    
    // параметры вращения
    this.progress = 0
    this.startProgress = this.initAngle
    this.finishVal = 0
    this.angleTouchStart = null
    this.degreeAngle = null
    this.startTouches = null
    this.rotationSpeed = -1

    // components
    this.isWin = null
    this.isWinStatusRotate = null
    
    this.dot = null
    this.init()
  }
  
  init = () => {
    this.dot = this.game.add.image(0, 0, 'debugDot')
    this.isWin = new IsWin(this.game)
    this.#createBlock()
  }
  
  #createBlock = () => {
    this.block = this.game.make.image(this.positionPartX, this.positionPartY, this.sprite)
    this.block.isComplete = this.isComplete
    this.block.initAngle  = this.initAngle
    
    this.block.inputEnabled = this.disabled ? false : true
    
    this.block.angle = this.startProgress
    this.block.anchor.set(...this.anchor)
  
    this.mainGroup.add(this.block)
    this.mainGroup.position.set(this.mainGroupOffset.x, this.mainGroupOffset.y)
    this.game.world.add(this.mainGroup)
    this.#initEvents()
    
    return this.block
  }
  
  #initEvents = () => {
    this.block.events.onInputDown.add(this.#onTouchStart)
    this.game.input.addMoveCallback(this.#onTouchMove)
    this.block.events.onInputUp.add(this.#OnTouchUp)
  }
  
  #onTouchStart = (sprite, pointer) => {
    this.block.isPressed = true
    
    this.startProgress = this.progress
    this.angleTouchStart = parseFloat(this.block.angle)
    
    // получаем первые координаты касания
    this.startTouches = {
      x: pointer.x,
      y: pointer.y
    }
  }
  
  #onTouchMove = (pointer) => {
    // console.log('move')
    if (this.block.disabled) return;
    if (!this.block.isPressed) return
    if (!pointer.isDown || !this.startTouches) return
    
    // получаем координаты текущего касания
    const touch = {
      x: pointer.x,
      y: pointer.y
    }
    
    const anchorPosition = {
      x: this.block.position.x + this.mainGroupOffset.x,
      y: this.block.position.y + this.mainGroupOffset.y,
    }
    
    this.dot.position.set(anchorPosition.x, anchorPosition.y)
    
    // вычисление угла
    let angleDistance = Math.atan2(
      (anchorPosition.x - touch.x) * (anchorPosition.y - this.startTouches.y)
      - (anchorPosition.y - touch.y) * (anchorPosition.x - this.startTouches.x),
      
      (anchorPosition.x - touch.x) * (anchorPosition.x - this.startTouches.x)
      + (anchorPosition.y - touch.y) * (anchorPosition.y - this.startTouches.y),
    )
    
    angleDistance *= this.rotationSpeed
    this.degreeAngle = angleDistance * (180 / Math.PI)
    this.finishVal = Math.trunc(this.degreeAngle + this.angleTouchStart)
  
    // this.#checkRotate()
    
    this.block.angle = this.finishVal
  }
  
  #checkRotate = () => {
    // если срабатывает событие ошибки, или финиша
    this.isWinStatusRotate = this.isWin.checkOnFinishRotate(this.block)
    console.log(this.isWinStatusRotate)
    
    if (!this.isWinStatusRotate) {
      this.block.angle = this.initAngle
      this.isWin.StatusRotate = true
      this.game.input.deleteMoveCallback(this.#onTouchMove)
    }
  }
  
  #OnTouchUp = () => {
    this.block.isPressed = false
    if (this.block.disabled) return
  
    this.block.angle = this.initAngle
    
    // если произошла ошибка, то с задержкой в 1сек делать доворот
    // autoRotate(this.game, this.block, null, 0)
    //   .onComplete.add(() => this.game.input.addMoveCallback(this.#onTouchMove))
  }
}
