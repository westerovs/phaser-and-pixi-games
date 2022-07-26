/* eslint-disable */
import { configLockSlices, configLocks } from './config.js'

export default class DoorLock {
  constructor(game) {
    this.game = game
    
    this.avatarContainer = null
    this.locks = []
    this.lockSlices = []
    this.#createAvatar()
  }
  
  #createAvatar = () => {
    this.avatarContainer = this.game.add.group()
    this.avatarContainer.position.set(200, 200)
    
    // create avatar
    this.avatar = this.game.make.image(0, 0, 'avatar')
    this.avatar.anchor.set(0.5)
    this.avatarContainer.add(this.avatar)
    
    this.#createLocks()
    this.#createLockSlice()
  }
  
  #createLocks = () => {
    configLocks.forEach((item, index) => {
      const lock = this.game.make.image(item.x, item.y, 'lock')
      lock.anchor.set(0.5)
      lock.angle = item.angle
      lock.inputEnabled = true
      this.locks.push(lock)
      lock.events.onInputDown.add(() => this.#moveLock(lock, index))
      
      this.avatarContainer.add(lock)
      this.avatarContainer.moveDown(lock)
    })
  }
  
  #createLockSlice = () => {
    configLockSlices.forEach(item => {
      const lockSlice = this.game.make.image(item.x, item.y, 'lockSlice')
      lockSlice.anchor.set(0.5)
      lockSlice.angle = item.angle
      this.lockSlices.push(lockSlice)
      
      this.avatarContainer.add(lockSlice)
    })
  }
  
  #moveLock = (lock, index) => {
    this.lockSlices[index].alpha = 0
    
    this.game.add.tween(lock, index)
      .to({
        x: (this.game.width / 2) - 200,
        y: (this.game.height / 2) - 200,
      }, 200, Phaser.Easing.Linear.None, true)
  
    this.game.add.tween(lock.scale)
      .to({
        x: 4,
        y: 4,
      }, 200, Phaser.Easing.Linear.None, true)
  }
}
