import { crystals, errorIcon } from '../const.js';
import {autoRotate} from '../utils/utils.js'
import IqCounter from './IqCounter.js';
// const iqCounter = new IqCounter()

export default class IsWin {
  constructor(game) {
    this.game = game
    this.crystal = null
    
    this.rotation = null
    this.StatusRotate = true
    // this.StatusRotate = {
    //   NORMAL: true,
    //   ERROR: true,
    //   FINISH: null,
    // }
    
    // components
    this.errorIcon = errorIcon
    
    this.init()
  }
  
  init = () => {
    this.errorIcon = {...errorIcon}[0]
  }
  
  checkOnFinishRotate = (crystal) => {
    this.crystal = crystal
    this.rotation = +crystal.rotation.toFixed(2)
    // console.log(this.rotation)
    
    const crystalsCopy = Object.assign({}, ...crystals)

    // если на объект базе
    if (crystalsCopy.crystalLeftBig.isComplete) {
      if (crystal.key === 'crystalLeft') {
        if (this.rotation >= 2.00 && this.rotation <= 3.20) {
          console.warn('СТОЛКНОВЕНИЕ')
          this.StatusRotate = false
          autoRotate(this.game, crystal, this.rotation)
        }
        this.autoRotateWhenFinish()
        this.StatusRotate = true
        return this.StatusRotate
      }
    }
    if (crystalsCopy.crystalLeft.isComplete) {
      if (crystal.key === 'crystalTop') {
        if (this.rotation >= 1.8 && this.rotation <= 1.90) {
          console.warn('СТОЛКНОВЕНИЕ')
          this.StatusRotate = false
          autoRotate(this.game, crystal, this.rotation)
        }
      }
    }
    if (crystalsCopy.crystalTop.isComplete) {
      if (crystal.key === 'crystalRight') {
        if (this.rotation <= -2 && this.rotation >= -2.15) {
          console.warn('СТОЛКНОВЕНИЕ')
          this.StatusRotate = false
          autoRotate(this.game, crystal, this.rotation)
        }
      }
    }
  
    // если не на базе
    if (!crystalsCopy.crystalLeft.isComplete) {
      if (crystal.key === 'crystalLeftBig') {
        if (this.rotation >= 1.05 && this.rotation <= 1.15) {
          console.warn('СТОЛКНОВЕНИЕ')
          this.errorIcon.changePositionIcon(crystal.position.x - 85, crystal.position.y - 100)
          this.StatusRotate = false
          autoRotate(this.game, crystal, this.rotation)
        }
        if (this.rotation <= -0) {
          console.warn('СТОЛКНОВЕНИЕ')
          this.StatusRotate = false
          autoRotate(this.game, crystal, this.rotation)
        }
      }
      if (crystal.key === 'crystalTop') {
        if (this.rotation >= 0.80 && this.rotation <= 0.99) {
          console.warn('СТОЛКНОВЕНИЕ')
          this.errorIcon.changePositionIcon(crystal.position.x - 135, crystal.position.y - 90)
          this.StatusRotate = false
          autoRotate(this.game, crystal, this.rotation)
        }
        if (this.rotation >= 1.8 && this.rotation <= 1.90) {
          console.warn('СТОЛКНОВЕНИЕ')
          this.errorIcon.changePositionIcon(crystal.position.x + 85, crystal.position.y - 5)
          this.StatusRotate = false
          autoRotate(this.game, crystal, this.rotation)
        }
      }
    }
    if (!crystalsCopy.crystalTop.isComplete) {
      if (crystal.key === 'crystalRight') {
        if (this.rotation >= 0.80 && this.rotation <= 0.99) {
          console.warn('СТОЛКНОВЕНИЕ')
          this.errorIcon.changePositionIcon(crystal.position.x - 120, crystal.position.y - 70)
  
          this.StatusRotate = false
          autoRotate(this.game, crystal, this.rotation)
        }
        if (this.rotation <= -2 && this.rotation >= -2.15) {
          console.warn('СТОЛКНОВЕНИЕ')
          this.errorIcon.changePositionIcon(crystal.position.x - 25, crystal.position.y + 140)
  
          this.StatusRotate = false
          autoRotate(this.game, crystal, this.rotation)
        }
      }
      if (crystal.key === 'crystalLeft') {
        if (this.rotation >= 2.00 && this.rotation <= 3.20) {
          console.warn('СТОЛКНОВЕНИЕ')
          this.errorIcon.changePositionIcon(crystal.position.x + 10, crystal.position.y - 110)
          this.StatusRotate = false
          autoRotate(this.game, crystal, this.rotation)
        }
        if (this.rotation >= 1.00 && this.rotation <= 1.15) {
          console.warn('СТОЛКНОВЕНИЕ xxx')
          this.errorIcon.changePositionIcon(crystal.position.x - 95, crystal.position.y + 10)
          this.StatusRotate = false
          autoRotate(this.game, crystal, this.rotation)
        }
      }
    }
  
    this.autoRotateWhenFinish()
    return this.StatusRotate
  }
  
  // авто-доводка если фигура становится на базу
  autoRotateWhenFinish = () => {
    if (Math.abs(this.rotation) >= 0 && Math.abs(this.rotation) <= 0.15) {
      console.warn('FINISH ROTATE')
  
      this.#setTint()
      // iqCounter.iqPlus()
  
      this.crystal.disabled = true
      this.crystal.isComplete = true

      this.game.add.tween(this.crystal)
        .to({
          angle: 0,
        }, Phaser.Timer.HALF / 2, Phaser.Easing.Linear.None, true)
    }
  }
  
  #setTint = () => {
    // нужен жесткий рефакторинг !
    const body = Object.assign({}, ...crystals)
  
    const initTintCrystal = this.crystal.tint
    const initTintBody = this.crystal.tint
    this.crystal.tint = 0x2DE200
    body.crystalBody.tint = 0x2DE200
  
    const crystalsCopy = crystals.map(item => {
      return Object.values(item)
    })
  
    const arr = []
    crystalsCopy.forEach(item => arr.push(...item))
  
    arr.forEach(item => {
      if (item.isComplete) {
        const initTintCrystal = item.tint
        item.tint = initTintCrystal
        item.tint = 0x2DE200
        this.game.time.events.add(Phaser.Timer.SECOND, () => {
          item.tint = initTintCrystal
        })
      }
    })
  
    this.game.time.events.add(Phaser.Timer.SECOND, () => {
      this.crystal.tint = initTintCrystal
      body.crystalBody.tint = initTintBody
    })
  }
  
  createError = () => {
  }
  
  // return booleanRotate
}
