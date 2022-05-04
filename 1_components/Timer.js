/* eslint-disable */

export default class Timer {
  constructor(game, callBack, timeSecond = 15) {
    this.game = game
    this.callBack = callBack
    this.timeSecond = timeSecond
  
    this.timer = null
    this.activity = false
    this.init()
  }
  
  init = () => {
    this.game.canvas.addEventListener('pointerdown', () => {
      console.log('click')
      if (this.timer) this.timer.destroy()
      this.reset()
    })

    this.reset()
  }

  reset = () => {
    if (this.timer) {
      this.timer.destroy()
    }
    
    this.timer = this.game.time.create(false)
    this.timer.loop(Phaser.Timer.SECOND * this.timeSecond, () => {
      this.timer.destroy()
      this.callBack()
      console.log('BOOM')
    })
    
    this.timer.start()
  }
}
