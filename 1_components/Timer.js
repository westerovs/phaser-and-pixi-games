/* eslint-disable */

export default class Timer {
  constructor(game, callBack, timeSecond = 3) {
    this.game = game
    this.callBack = callBack
    this.timeSecond = timeSecond
  
    this.timer = null
    this.firstInit = false
    this.init()
  }
  
  init = () => {
     this.game.canvas.addEventListener('pointerdown', this.touchStart)
  
    this.reset()
  }
  
  touchStart = () => {
    console.log('click')
    if (this.timer) this.timer.destroy()
    
    this.reset()
    
    setTimeout(() => {
      this.destroy()
    }, 3000)
  }
  
  reset = () => {
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
  
  destroy = () => {
    console.log('timer destroyed')
    this.game.canvas.removeEventListener('pointerdown', this.touchStart)
    this.timer.destroy()
  }
}
