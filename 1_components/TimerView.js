export default class TimerView {
  constructor(game) {
    this.game = game
    this._timer = game.add.group()
  
    this.clocktext = null
    this.clocktimer = null
    this.clockseconds = 20
    
    this.init()
  }
  
  init = () => {
    this.clocktimer = this.game.time.create(false)
    this.clocktimer.loop(Phaser.Timer.SECOND / 2, this.#updateText, this)
  
    this.#createTimerSprite()
    this.#createText()
    this.startClock()
    this.#initSignals()
  }
  
  startClock = () => {
    this.clocktimer.start()
  }
  
  stopClock = () => {
    this.clocktimer.stop(false)
  }
  
  #createTimerSprite = () => {
    const timer = this.game.make.image(0, 0, 'timer')
    timer.anchor.set(0.5)
    
    this._timer.add(timer)
  }
  
  #createText = () => {
    this.clocktext = this.game.make.text(0, 0, '00:20', {
      fill: '#ffffff', font: '30pt Arial',
    })
    this.clocktext.anchor.set(0.5)
    
    this._timer.add(this.clocktext)
  }
  
  #updateText = () => {
    this.clockseconds--
    if (this.clockseconds <= 0) {
      this.clocktext.setText('00:00')
      return
    }
    if (this.clockseconds <= 9) {
      this.clocktext.setText(`00:0${this.clockseconds}`)
    } else {
      this.clocktext.setText(`00:${this.clockseconds}`)
    }
  }
  
  #initSignals = () => {
    this.game.Signals.onResizeSignal.add((isLandscape) => this.#resize(isLandscape))
  }
  
  #resize = (isLandscape) => {
    if (isLandscape) this._timer.position.set(135, 50)
    else this._timer.position.set(135, 50)
  }
}
