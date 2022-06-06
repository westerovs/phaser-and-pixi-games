/* eslint-disable */

export default class Timer {
  constructor(game, callBack, timeSecond) {
    this.game       = game
    this.callBack   = callBack
    this.timeSecond = timeSecond
    
    this.timer = null
    this.init()
  }
  
  init = () => {
    this.#reset()
  }
  
  render = () => {
    this.#touchStart()
  }
  
  destroy = () => {
    console.log('***')
    console.log('timer destroyed')
    console.log('***')
    this.timer.destroy()
  }
  
  #touchStart = () => {
    if (this.game.input.activePointer.isDown) {
      if (this.timer) this.timer.destroy()
      this.#reset()
    }
  }
  
  #reset = () => {
    if (this.timer) {
      this.timer.destroy()
    }
    
    this.timer = this.game.time.create(false)
  
    this.timer.loop(Phaser.Timer.SECOND * this.timeSecond, () => {
      this.timer.destroy()
      this.callBack()
      console.log('CLEAR TIMER')
    })
    
    this.timer.start()
  }

}
