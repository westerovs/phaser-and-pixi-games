export default class Timer {
  constructor(game, callback, timeSeconds) {
    this.game = game
    this.callback = callback
    this.timeSeconds = timeSeconds

    this.timer = null
    this.init()
  }

  init = () => {
    console.clear()
    console.log('init timer')
    this.#createTimer()
  }

  #createTimer = () => {
    this.timer = this.game.time.create(false)
    this.timer.loop(this.timeSeconds, this.#handleTimerEvent)
    this.timer.start()

    this.game.input.onDown.add(this.#handleInputDown)
  }

  destroy = () => {
    if (this.timer) {
      this.timer.stop()
      this.timer.destroy()
      this.timer = null
      this.game.input.onDown.remove(this.#handleInputDown)

      console.log('timer destroy')
    }
  }

  #reset = () => {
    this.destroy()
    this.#createTimer()
    console.log('reset destroy')
  }

  #handleTimerEvent = () => {
    this.callback()
    this.destroy()
  }

  #handleInputDown = () => {
    console.log('click timer')
    this.#reset()
  }
}
