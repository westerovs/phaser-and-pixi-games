export default class Part {
  constructor(game) {
    this.game  = game
    
    this.group = null
    this.circle = null
    this.partInner = null
    this.part = null
    this.targetAngleBetween = 0
    this.ROTATION_SPEED = 1 * Math.PI
    this.deltaTime = 0
  }
  
  create = (x, y, anchorX, anchorY) => {
    this.group = this.game.add.group()
    this.circle = this.#createCircle(400, 300, 400)
    
    // Это будет вращаться мгновенно
    this.partInner = this.#createArrow(400, 300, anchorX, anchorY)
    this.partInner.alpha = 0.3
    
    // Это будет вращаться со скоростью ROTATION_SPEED
    this.part = this.#createArrow(400, 300, anchorX, anchorY)

    this.game.input.addMoveCallback((pointer) => {
      this.targetAngleBetween = Phaser.Math.angleBetweenPoints(this.part, pointer)
    })
  
    this.group.add(this.circle)
    this.group.add(this.partInner)
    this.group.add(this.part)
  
    this.group.position.set(x, y)
  }
  
  #createCircle = (x, y, r) => {
    const circle = this.game.make.graphics(0, 0);
    circle.beginFill(0x222222, 1);
    circle.drawCircle(x, y, r);
    
    return circle
  }
  
  #createArrow = (x, y, anchorX, anchorY) => {
    const arrow = this.game.make.image(x, y, 'block')
    arrow.anchor.set(anchorX, anchorY)
    
    return arrow
  }
  
  update = (time) => {
      const delta = time.time.elapsed
      this.partInner.rotation = this.targetAngleBetween

      const coefSpeed = 0.004

      this.part.rotation = Phaser.Math.rotateToAngle(
        this.part.rotation,
        this.targetAngleBetween,
        this.ROTATION_SPEED * coefSpeed * delta
      )
  }
}
