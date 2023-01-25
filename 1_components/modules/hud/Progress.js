/* eslint-disable */
import {tweenSetAlpha} from '../../../utils/tweens.js'
import {createMask} from '../../../utils/utils.js';

export default class Progress {
  constructor(game, atlas, spriteKey, parentContainer) {
    this.game = game
    this.atlas = atlas
    this.spriteKey = spriteKey
    this.parentContainer = parentContainer
    
    this.Lines = {
      green: null
    }
    this.maxStepLines = 5
    this.stepValue = 1 // один шаг за один ход
    this.currentStep = 0
  
    this.progressPosition = [134, 234, 334, 444, 524,]
    
    this.init()
  }
  
  init = () => {
    this.#creteProgressBar()
    this.#initSignals()
  }
  
  #creteProgressBar = () => {
    this.Lines.green = this.#createLine(this.spriteKey, -265, -37)
    this.parentContainer.add(this.Lines.green)

    // маска в которой весь контейнер с линиями
    this.mask = createMask({
      game: this.game,
      container: this.Lines.green,
      x: -(this.Lines.green.width),
      y: 0,
      w: this.Lines.green.width,
      h: this.Lines.green.height,
      child: true,
    })
  
    this.Lines.green.mask = this.mask
  }
  
  #createLine = (frame, x = 0, y = 0) => {
    return this.game.add.image(x, y, this.atlas, `${ frame }.png`)
  }
  
  #initSignals = () => {
    this.game.progressPlus = new Phaser.Signal()

    this.game.progressPlus.add(() => this.animationProgress())
  }
  
  animationProgress = () => {
    if (this.currentStep >= 5) return
    
    if (this.tweenPlus && this.tweenPlus.isRunning) {
      this.tweenPlus.stop()
      this.game.tweens.remove(this.tweenPlus)
      
      this.tweenPlus = this.tweenProgress(this.progressPosition[this.currentStep])
      this.tweenPlus.start()
      this.currentStep += this.stepValue
    }
    else {
      this.tweenPlus = this.tweenProgress(this.progressPosition[this.currentStep])
      this.tweenPlus.start()
      this.currentStep += this.stepValue
    }
  }
  
  tweenProgress = (progressPosition) => {
    return this.game.add.tween(this.mask)
      .to({x: progressPosition}, 500, Phaser.Easing.Linear.None, false)
  }
}
