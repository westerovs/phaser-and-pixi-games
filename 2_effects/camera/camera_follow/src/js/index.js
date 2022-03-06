class Game {
  constructor() {
    this.game    = null
    this.player  = null
    this.cursors = null
  }
  
  preload = () => {
    this.game.load.image('background', '/src/img/background.jpg')
    this.game.load.image('bear', '/src/img/bear.png')
  }
  
  create = () => {
    this.game.add.tileSprite(0, 0, 5550, 1444, 'background')
    this.game.world.setBounds(0, 0, 5550, 1444) // 1366 - один кадр
  
    this.player = this.game.add.sprite(0, 0, 'bear')
    
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.game.camera.follow(this.player, 0, 1)
  
  }
  
  update = () => {
    // код внутри update - это requestAnimations - он всё время запущен
    // this.player.body.setZeroVelocity()
    
    if (this.cursors.up.isDown) {
      console.log(this.player.position.y)
      this.player.position.y -= 10
    } else if (this.cursors.down.isDown) {
      this.player.position.y += 10
    }

    if (this.cursors.left.isDown) {
      this.player.position.x -= 10
    } else if (this.cursors.right.isDown) {
      this.player.position.x += 10
    }
  }
  
  render = () => {
    // debug info
    this.game.debug.cameraInfo(this.game.camera, 32, 32)
    this.game.debug.spriteCoords(this.player, 32, 200)
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
        render : this.render
      })
  }
}

new Game().init()

