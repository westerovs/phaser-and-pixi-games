import { crystals } from '../const.js';
import {autoRotateOnError} from '../utils/utils.js'

export default class IsWin {
  constructor(game) {
    this.game = game
    this.crystal = null
    
    this.rotation = null
    this.booleanRotate = true
    this.test = null
  }
  
  checkOnFinishRotate = (crystal) => {
    this.crystal = crystal
    this.rotation = +crystal.rotation.toFixed(2)
    
    crystals.find(item => {
      // если crystalTop активен
      if (item.key === 'crystalTop' && !item.isComplete) {
        switch (this.crystal.key) {
          case 'crystalLeft':
            break;
          case 'crystalTop':
            break;
          case 'crystalRight':
            if (this.rotation >= 0.80 && this.rotation <= 0.99) {
              console.warn('СТОЛКНОВЕНИЕ')
              this.booleanRotate = false
              autoRotateOnError(this.game, crystal, this.rotation)
            }
            if (this.rotation >= -2.15 && this.rotation <= -2) {
              console.warn('СТОЛКНОВЕНИЕ')
              this.booleanRotate = false
              autoRotateOnError(this.game, crystal, this.rotation)
            }
            break;
        }
      }
      if (item.key === 'crystalTop' && item.isComplete) {
        switch (this.crystal.key) {
          case 'crystalLeft':
            break;
          case 'crystalTop':
            break;
          case 'crystalRight':
            // if (this.rotation >= 0.80 && this.rotation <= 0.99) {
            //   console.warn('СТОЛКНОВЕНИЕ')
            //   this.booleanRotate = false
            //   autoRotateOnError(this.game, crystal, this.rotation)
            // }
            // if (this.rotation >= -2.15 && this.rotation <= -2) {
            //   console.warn('СТОЛКНОВЕНИЕ')
            //   this.booleanRotate = false
            //   autoRotateOnError(this.game, crystal, this.rotation)
            // }
            break;
        }
      }
    })
    
    this.autoRotateOnFinish()
    
    return this.booleanRotate
  }
  
  // авто-доводка если фигура становится на базу
  autoRotateOnFinish = () => {
    if (Math.abs(this.rotation) >= 0 && Math.abs(this.rotation) <= 0.15) {
      this.crystal.tint = 0x2DE200
      this.crystal.disabled = true
      this.crystal.isComplete = true
      
      this.game.add.tween(this.crystal)
        .to({
          angle: 0,
        }, Phaser.Timer.HALF / 2, Phaser.Easing.Linear.None, true)
    }
  }
  
  // return booleanRotate
}
