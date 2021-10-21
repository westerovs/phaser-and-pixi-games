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

    this.timerHint = null
    this.EnamHintAnimation = {
      show : false,
      scale: false,
    }

    this.hand = this.sprites.hand
    this.cursor = document.querySelector('.cursor')
  }

  init() {
    document.addEventListener('click', () => {
      if (this.timerHint) this.timerHint.destroy()
      this.resetHintTimer()
    })

    // отмена hint руки, когда активен курсор
    document.body.addEventListener('mousemove', () => {
      if (this.timerHint) this.timerHint.destroy()
      this.resetHintTimer()
    })
    document.body.addEventListener('touchmove', () => {
      if (this.timerHint) this.timerHint.destroy()
      this.resetHintTimer()
      this.cursor.classList.add('cursor-visible')
      this.cursor.classList.remove('cursor-hidden')
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
      this.hand.alpha = 0
      return
    }

    this.hand.alpha = 1
    this.hand.scale.set(this.factor)

    const {x: aliveElementPosX, y: aliveElementPosY} = aliveElements[0].worldPosition

    if (aliveElementPosX - this.hand.width < 0) {
      this.hand.scale.x = -this.factor
    }
    if (aliveElementPosY + this.hand.height > this.game.height) {
      this.hand.scale.y = -this.factor
    }

    this.hand.position.x = aliveElementPosX
    this.hand.position.y = aliveElementPosY
    this.runHandAnimate(this.hand, stateElements)
  }

  runHandAnimate(hand) {
    // [0] cursor animations костыль ↓
    this.cursor.classList.remove('cursor-hidden')
    this.cursor.classList.add('cursor-visible')
    this.cursor.style.transform = `translate(${this.hand.position.x}px, ${this.hand.position.y}px) scale(${1 * this.factor})`

    // [1] set animations
    this.EnamHintAnimation.show = this.createTween(hand, {alpha: 1}, 0, Phaser.Timer.QUARTER)
    this.EnamHintAnimation.scale = this.createTween(hand.scale, {
      x: hand.scale.x * 0.9,
      y: hand.scale.y * 0.9,
    }, 0, Phaser.Timer.QUARTER)

    // [2] окончание появления
    this.EnamHintAnimation.show
      .onComplete.add(() => {
        this.EnamHintAnimation.show = false
        this.EnamHintAnimation.scale.yoyo(true).repeat(3)

          .onComplete.add(() => {
            // [0] cursor animations костыль ↓
            this.cursor.classList.add('cursor-hidden')
            this.cursor.classList.remove('cursor-visible')

            this.EnamHintAnimation.scale = false
            this.EnamHintAnimation.scale = this.createTween(hand, {alpha: 0}, 0, Phaser.Timer.HALF)
            this.resetHintTimer()
          })
      })
  }

  resetHintTimer() {
    if (this.timerHint) {
      this.timerHint.destroy()
    }

    this.timerHint = this.game.time.create(false)
    this.timerHint.loop(Phaser.Timer.SECOND * 3, () => {
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
