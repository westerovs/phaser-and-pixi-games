import {crystals} from '../const.js'
import {autoRotate} from '../utils/utils.js'
import IsWin from './isWin.js'

export default class Part {
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
    this.block = null
    
    // параметры вращения
    this.progress = 0
    this.startProgress = this.initAngle
    this.finishVal = 0
    this.nex = null
    this.degreeAngle = null
    this.startTouches = null
    this.rotationSpeed = -1

    // components
    this.isWin = null
    this.isWinStatusRotate = null
    
    this.init()
  }
  
  init = () => {
    this.isWin = new IsWin(this.game)
    this.#createBlock()
  }
  
  #createBlock = () => {
    this.block = this.game.make.image(this.positionPartX + (this.anchorX * 100), this.positionPartY + (this.anchorY * 100), this.sprite)
    this.block.isComplete = this.isComplete
    this.block.initAngle  = this.initAngle
    
    this.block.inputEnabled = this.disabled ? false : true
    
    this.block.angle = this.startProgress
    this.block.anchor.set(...this.anchor)
  
    this.mainGroup.add(this.block)
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
    this.nex = parseFloat(this.block.angle)
    
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
    
    angleDistance *= this.rotationSpeed
    this.degreeAngle = angleDistance * (180 / Math.PI)
    this.finishVal = Math.trunc(this.degreeAngle + this.nex)
  
    this.#checkRotate()
    
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
    
    // если произошла ошибка, то с задержкой в 1сек делать доворот
    autoRotate(this.game, this.block, null, 0)
      .onComplete.add(() => this.game.input.addMoveCallback(this.#onTouchMove))
  }
}
