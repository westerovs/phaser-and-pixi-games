/* eslint-disable */
import { tweenSetAlpha } from '../utils/tweens.js';

export default class Hint {
  constructor(game, sprites, stateItems) {
    this.game = game
    this.factor = game.factor
    this.sprites = sprites
    this.stateItems = stateItems
    
    this.hintDelay = 3
    this.timerHint = null
    
    this.glow = this.sprites.glow
    this.hint = this.sprites.hint
    this.init()
  }
  
  init = () => {
    this.resetHintTimer()
    
    this.glow.alpha = 0
    this.hint.alpha = 0

    if (this.timerHint) this.timerHint.destroy()
    this.resetHintTimer()
  
    this.game.canvas.addEventListener('pointerdown', () => {
      console.log('!!!!')
      tweenSetAlpha(this.game, this.glow, 0)
      tweenSetAlpha(this.game, this.hint, 0)

      if (this.timerHint) this.timerHint.destroy()
      this.resetHintTimer()
    })
  }
  
  createHintHand = () => {
    const aliveElements = []
  
    this.stateItems.filter((element) => {
      if (!element.alive) return

      aliveElements.push(element)
      return aliveElements
    })
  
    if (aliveElements.length === 0) {
      this.hint.alpha = 0
      this.glow.alpha = 0
      this.hint.alpha = 0
      return
    }
    
    const {x: aliveElementPosX, y: aliveElementPosY} = aliveElements[0].worldPosition
    this.hint.position.set(aliveElementPosX, aliveElementPosY)
    this.glow.position.set(aliveElementPosX, aliveElementPosY)
  
    tweenSetAlpha(this.game, this.glow, 1)
    tweenSetAlpha(this.game, this.hint, 1)
    this.glow.scale.set(this.factor)
    this.hint.scale.set(this.factor)
  
    // const aliveElem = aliveElements[0]
    // this.runHandAnimate(aliveElem)
    this.runHandAnimate(this.glow)
    this.runHandAnimate(this.hint)
  }
  
  runHandAnimate = (hint) => {
    this.game.add.tween(hint.scale)
      .to({
        x: hint.scale.x * 0.85,
        y: hint.scale.y * 0.85,
      }, Phaser.Timer.QUARTER, Phaser.Easing.Linear.None, true)
      .yoyo(true).repeat(2)
      .onComplete.add(() => {
        this.resetHintTimer()
  
      tweenSetAlpha(this.game, this.glow, 0)
      tweenSetAlpha(this.game, this.hint, 0)
    })
  }
  
  resetHintTimer = () => {
    if (this.timerHint) {
      this.timerHint.destroy()
    }
    
    this.timerHint = this.game.time.create(false)
    this.timerHint.loop(Phaser.Timer.SECOND * this.hintDelay, () => {
      if (this.game.input.activePointer.isDown) return
      setTimeout(() => {
        this.createHintHand()
      }, 3000)
    })
    this.timerHint.start()
  }
}
