/* eslint-disable */
import { configDoorRings, configLocks } from './config.js'
// import { tweenShake } from '../../utils/tweens.js';

export default class DoorLock {
  constructor(game) {
    this.game = game
    console.log(this.game)
    this.doorBoltContainer = null
    this.#createDoorBolt()
  }
  
  #createDoorBolt = () => {
    this.doorBoltContainer = this.game.add.group()
    
    this.game.time.events.add(Phaser.Timer.SECOND * 0.6, () => {
      this.#createDoorRings()
      this.#createLocks()
    })
  }
  
  #createDoorRings = () => {
    const doorBold = this.game.make.image(0, 0, 'doorBolt')
    this.doorBoltContainer.add(doorBold)
    
    configDoorRings.forEach((item, i) => {
      const ring = this.game.make.image(item.x, item.y, 'doorBoltRing')
      this.doorBoltContainer.add(ring)
    })
  }
  
  #createLocks = (delay = 0.2) => {
      this.game.time.events.add(Phaser.Timer.SECOND * delay, () => {
        configLocks.forEach((item, index) => {
          // create lock
          const lock = this.game.make.image(item.x, item.y, 'lock')
          lock.anchor.set(0.5)
          lock.scale.set(1.4)
          lock.angle = item.angle
    
          this.#createAnimationsShowLock(lock, index)
      })
    })
  }
  
  #createAnimationsShowLock = (lock, index) => {
    const delayShowLock = 200
  
    // scale
    this.game.add.tween(lock.scale)
      .to({x: 0.6, y: 0.6,}, Phaser.Timer.HALF, Phaser.Easing.Linear.None, true)
  
    // create delay show lock
    this.game.time.events.add(delayShowLock * index, () => {
      this.doorBoltContainer.add(lock)
      this.doorBoltContainer.moveDown(lock)
      this.doorBoltContainer.moveDown(lock)
      this.doorBoltContainer.moveDown(lock)
    
      // shake
      // tweenShake(this.game, lock, {
      //   params1: {angle: lock.angle - 1},
      //   params2: {angle: lock.angle + 2},
      //   repeat: 2,
      // })
    })
  }
}
