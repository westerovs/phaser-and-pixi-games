/*
* Всё ещё не абстрактный класс Hint
* В данной реализации содержит костыль для показа курсора, вместе с рукой
* */

export default class Hint {
  constructor(game, factor, sprites, settings, states) {
    this.game = game
    this.factor = factor
    this.sprites = sprites
    this.settings = settings
    this.states = states

    this.parent = this.game.context.canvas

    this.hintDelay = 3
    this.timerHint = null
    this.EnamHintAnimation = {
      show : false,
      scale: false,
    }

    this.hint = this.sprites.hint
  }

  init() {
    this.parent.addEventListener('pointerdown', () => {
      this.hint.alpha = 0
      if (this.timerHint) this.timerHint.destroy()
      this.resetHintTimer()
    })

    this.resetHintTimer()
  }

  createHintHand(stateElements) {
    const aliveElements = []
    stateElements.filter((element) => {
      if (element.alive) {
        aliveElements.push(this.sprites[element.name])
      }
      return aliveElements
    })

    if (aliveElements.length === 0) {
      this.hint.alpha = 0
      return
    }

    this.hint.alpha = 1
    this.hint.scale.set(this.factor)

    const {x: aliveElementPosX, y: aliveElementPosY} = aliveElements[0].worldPosition

    this.hint.scale.x = this.factor
    this.hint.scale.y = this.factor

    this.hint.frameName = `${aliveElements[0].frameName.split('.')[0]}-light.png`

    this.hint.position.x = aliveElementPosX
    this.hint.position.y = aliveElementPosY
    this.runHandAnimate(this.hint, stateElements)
  }

  runHandAnimate(hint) {
    // [1] set animations
    this.EnamHintAnimation.show = this.createTween(hint, {alpha: 1}, 0, Phaser.Timer.QUARTER)
    this.EnamHintAnimation.scale = this.createTween(hint.scale, {
      x: hint.scale.x * 0.95,
      y: hint.scale.y * 0.95,
    }, 0, Phaser.Timer.QUARTER)

    // [2] окончание появления
    this.EnamHintAnimation.show
      .onComplete.add(() => {
        this.EnamHintAnimation.show = false
        this.EnamHintAnimation.scale.yoyo(true).repeat(3)

          .onComplete.add(() => {
            this.EnamHintAnimation.scale = false
            this.EnamHintAnimation.scale = this.createTween(hint, {alpha: 0}, 0, Phaser.Timer.HALF)
            this.resetHintTimer()
          })
      })
  }

  resetHintTimer() {
    if (this.timerHint) {
      this.timerHint.destroy()
    }

    this.timerHint = this.game.time.create(false)
    this.timerHint.loop(Phaser.Timer.SECOND * this.hintDelay, () => {
      if (this.settings === 'game') {
        this.createHintHand(this.states.one)
      } else {
        this.createHintHand(this.states.two)
      }
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
