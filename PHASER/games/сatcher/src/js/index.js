class Game {
  constructor() {
    this.game = null;
  
  }
  
  preload = () => {
    console.log('preload')
  }
  
  create = () => {
    console.log('create')
  }
  
  update = () => {
    console.log('update')
  }
  
  init() {
    this.game = new Phaser.Game(
      480,
      320,
      Phaser.CANVAS,
      null, {
        preload: this.preload,
        create : this.create,
        update : this.update
      })
  }
}

new Game().init()

