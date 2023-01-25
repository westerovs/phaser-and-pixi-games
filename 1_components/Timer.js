/* eslint-disable */

import {gsap} from 'gsap'

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
  
    this.game.app.stage.on('pointerdown', this.#touchStart)
  }
  
  destroy = () => {
    console.log('timer destroyed')
    console.log('***')
    this.timer.kill()
    // this.timer = null
  
    this.game.app.stage.off('pointerdown', this.#touchStart)
    
    }
  
  #touchStart = () => {
    console.log('click')
    
    if (this.timer) this.timer.kill()
    this.#reset()
  }
  
  #reset = () => {
    if (this.timer) {
      this.timer.kill()
    }
    
    this.timer = gsap.to({}, {duration: this.timeSecond})
      .eventCallback('onComplete', () => {
        console.log('tick')
        this.timer.kill()
        this.callBack()
      })
  }

}
