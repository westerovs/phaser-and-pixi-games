/* eslint-disable */

export default class Hint {
  constructor(game, sprites, stateItems) {
    this.game = game
    this.factor = game.factor
    this.sprites = sprites
    this.stateItems = stateItems
    
    this.hintDelay = 3
    this.timerHint = null
    
    this.hint = this.sprites.hint
    this.init()
  }
  
  init = () => {
    this.resetHintTimer()
    
    this.hint.alpha = 0

    if (this.timerHint) this.timerHint.destroy()
    this.resetHintTimer()
  }
  
  createHintHand = () => {
    const aliveElements = []
  
    this.stateItems.filter((element) => {
      if (!element.sprite.alive) return

      aliveElements.push(element.sprite)
      return aliveElements
    })
  
    if (aliveElements.length === 0) {
      this.hint.alpha = 0
      return
    }
    
    const aliveElem = aliveElements[0]
    
    const {x: aliveElementPosX, y: aliveElementPosY} = aliveElements[0].worldPosition
    
    this.hint.position.set(aliveElementPosX, aliveElementPosY)
    
    this.runHandAnimate(aliveElem)
  }
  
  runHandAnimate = (hint) => {
    this.createTween(hint.scale, {
      x: hint.scale.x * 0.85,
      y: hint.scale.y * 0.85,
    }, 0, Phaser.Timer.QUARTER)
      .yoyo(true).repeat(2)
      .onComplete.add(() => {
        this.resetHintTimer()
      })
  }
  
  resetHintTimer = () => {
    if (this.timerHint) {
      this.timerHint.destroy()
    }
    // console.log('resetHintTimer')
    
    this.timerHint = this.game.time.create(false)
    this.timerHint.loop(Phaser.Timer.SECOND * this.hintDelay, () => {
      if (this.game.input.activePointer.isDown) return
      this.createHintHand()
    })
    this.timerHint.start()
  }
  
  createTween(
    sprite,
    prop,
    delay = 0,
    time = Phaser.Timer.SECOND,
    easing = Phaser.Easing.Linear.None,
    autostart = true,
  ) {
    return this.game.add
      .tween(sprite)
      .to(prop, time, easing, autostart, delay)
  }
}
