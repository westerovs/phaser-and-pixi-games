
class Game {
  constructor() {
    this.game  = null
    
    this.arrow1 = null
    this.arrow2 = null
    this.target = 0
    this.ROTATION_SPEED = 1 * Math.PI
    this.deltaTime = 0
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
    this.game.load.image('arrow', '/src/img/longarrow-white.png')
    this.game.load.image('cursor', '/src/img/drawcursor.png')
  }
  
  create = () => {
    const circle = this.game.add.graphics(0, 0);
    circle.beginFill(0x222222, 1);
    circle.drawCircle(400, 300, 200);
  
    // Эта стрелка будет вращаться мгновенно
    this.arrow1 = this.game.add.image(400, 300, 'arrow')
    this.arrow1.anchor.set(0, 0.5)
    this.arrow1.alpha = 0.3

    // Эта стрелка будет вращаться со скоростью ROTATION_SPEED
    this.arrow2 = this.game.add.sprite(400, 300, 'arrow')
    this.arrow2.anchor.set(0, 0.5)
  
    this.game.input.addMoveCallback((pointer) => {
      this.target = Phaser.Math.angleBetweenPoints(this.arrow2, pointer)
    })
  }
  
  update = (time) => {
    const delta = time.time.elapsed
    this.arrow1.rotation = this.target
  
    this.arrow2.rotation = Phaser.Math.rotateToAngle(
      this.arrow2.rotation,
      this.target,
      this.ROTATION_SPEED * 0.001 * delta
    )
  }
}

new Game().init()

