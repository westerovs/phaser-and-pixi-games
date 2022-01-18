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
  
    this.game.physics.startSystem(Phaser.Physics.P2JS)
    this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bear')
    this.game.physics.p2.enable(this.player)
    
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.game.camera.follow(this.player, 0, 1)
  }
  
  update = () => {
    // код внутри update - это requestAnimations - он всё время запущен
    this.player.body.setZeroVelocity()
    
    if (this.cursors.up.isDown) {
      this.player.body.moveUp(300)
    } else if (this.cursors.down.isDown) {
      this.player.body.moveDown(300)
    }
    
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -300
    } else if (this.cursors.right.isDown) {
      this.player.body.moveRight(300)
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

