/* eslint-disable */


/*
вызов
  #createHint = () => {
    const hint = this.game.add.image(0, 0, 'state', 'hint.png')
    hint.alpha = 0
    this.game.LAYERS.GAME.add(hint)
    
    this.hint = new Hint(this.game, this.stateItems.getItems, hint)
  }
*/


// паттерн стейт
import { tweenSetAlpha } from '../../utils/tweens.js';

const STATE_HINT = {
  SEARCH_IDLE: 'SEARCH_IDLE',  // Если найдена пара, или первый ход - хинт рандомно тыкает на любую
}
let state = STATE_HINT.SEARCH_IDLE

export default class Hint {
  constructor(game, targets, frame) {
    this.game = game
    this.targets = targets
    this.frame = frame
    this.hint = frame
    
    this.timer = null
    this.timeVisible = 2000
    
    this.timerDelay  = 3000
    this.hint.isShow = false
    this.isDisabedInput = false
    this.game.isHintDestroyed = false
    
    this.randomTarget = false
    this.init()
  }
  
  init() {
    this.createTimer()
    this.onHandlerClick()
    this.game.Signals.onResizeSignal.add(() => this.setPosition())
  }
  
  resetHint = () => {
    this.hide()
    this.timer.destroy()
    this.createTimer()
  }
  
  destroy = () => {
    this.game.isHintDestroyed = true
    this.hide()
    this.timer.destroy()
  }
  
  show = () => {
    this.hint.isShow = true
    tweenSetAlpha(this.game, this.hint, 1)
    
    if (this.frame.frameName === 'hint.png') {
      this.game.add.tween(this.hint.scale)
        .to({x: 0.9, y: 0.9,
        }, 250, Phaser.Easing.Linear.None, true, 250)
        .repeat(3)
        .yoyo(true)
    }
    
    this.game.time.events.add(this.timeVisible, () => {
      this.resetHint()
    })
  }
  
  hide = () => {
    this.hint.isShow = false
    tweenSetAlpha(this.game, this.hint, 0)
  }
  
  // timer
  createTimer = () => {
    if (this.game.isHintDestroyed) return
    if (this.timer) {
      this.timer.destroy()
    }
    
    this.timer = this.game.time.create(false)
    this.timer.loop(this.timerDelay, () => {
      this.tick()
    })
    this.timer.start()
  }
  
  tick = () => {
    if (this.hint.isShow) this.hide()
    else this.show()
    
    if (this.game.isHintDestroyed) return
    this.checkHintState()
  }
  
  // position
  getAliveElements = () => {
    const aliveElements = []
    
    this.targets.filter((element) => {
      if (!element.alive) return
      
      aliveElements.push(element)
    })
    
    if (aliveElements.length === 0) this.destroy()
    
    return aliveElements
  }
  
  getCurrentPosition = () => {
    const aliveElements = this.getAliveElements()
    
    if (aliveElements.length === 0) {
      this.destroy()
      return {x: 0, y: 0}
    }
    
    let aliveElement = null
    if (this.randomTarget) aliveElement = Phaser.ArrayUtils.getRandomItem(aliveElements)
    else aliveElement = aliveElements[0]
    
    return {
      x: Math.trunc(aliveElement.x - 30),
      y: Math.trunc(aliveElement.y - 60),
    }
  }
  
  setPosition = () => {
    if (this.game.isHintDestroyed) return
    
    const {x, y} = this.getCurrentPosition()
    this.hint.position.set(x, y)
  }
  
  // click
  onHandlerClick = () => {
    if (this.game.isHintDestroyed) return
    
    this.game.canvas.addEventListener('pointerdown', () => {
      if (this.isDisabedInput) return
      this.resetHint()
    })
  }
  
  // [0] -----------------------------------

  checkHintState = () => {
    switch (state) {
      case 'SEARCH_IDLE':
        this.setPosition()
        break
    }
  }
}
