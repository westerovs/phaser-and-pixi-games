import DoorLock from './components/intro/DoorLock.js';

class Game {
  constructor() {
    this.game  = null
    this.init()
  }
  
  init() {
    this.game = new Phaser.Game(
      1366,
      1366,
      Phaser.CANVAS,
      null,
      {
        preload: this.preload,
        create : this.create,
        update : this.update,
      })
  }
  
  preload() {
    this.game.load.image('doorOpen', '/src/img/intro/door-open.png')
    this.game.load.image('doorClosed', './src/img/intro/door-closed.png')
    this.game.load.image('doorShadow', './src/img/intro/door-shadow.png')
    this.game.load.image('doorBolt', './src/img/intro/door-bolt.png')
    this.game.load.image('doorBoltRing', './src/img/intro/door-bolt-ring.png')
    
    this.game.load.image('lock', './src/img/common-items/lock.png')
    this.game.load.image('lockSlice', './src/img/common-items/lock-slice.png')
  }
  
  create() {
    new DoorLock(this.game)
  }
  
  update() {
  
  }
}

new Game()

