class Game {
  constructor() {
    this.game  = null
    
    this.group = null
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
  
  preload = () => {
    this.game.load.image('block1', '/src/img/block1.png')
    this.game.load.image('block2', '/src/img/block2.png')
  }
  
  create = () => {
    this.group = this.game.add.group()
    this.group.x = 200
    this.group.y = 200
    
    // this.group.pivot.x = 250
    // this.group.pivot.y = 300
    
    const block1 = this.group.create(0, 0, 'block1')
    const block2 = this.group.create(0, 200, 'block2')
    
  }
  
  update = () => {
    // this.group.rotation += 0.02
    // this.group.angle += 2
  }
}

new Game().init()
