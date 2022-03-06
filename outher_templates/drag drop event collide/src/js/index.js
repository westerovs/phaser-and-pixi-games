class Game {
  constructor() {
    this.game    = null

    this.rect    = null
    this.rectGoal = null
    this.image1   = null
    this.image2   = null

    this.cursors = null
    this.controls = null
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

  preload = () => {
    this.game.load.image('bg', '/src/img/background.jpg')
    this.game.load.image('sprite1', '/src/img/item_panel1.jpg')
    this.game.load.image('sprite2', '/src/img/item_panel2.jpg')
  }

  create = () => {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.game.add.sprite(0, 0, 'bg')
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.rect  = this.createRect(200, 200, 100, 100, '0x0FFA9')
    this.rectGoal  = this.createRect(500, 200, 100, 100)
    // this.image1 = this.createImage('sprite1', 200, 200)
    // this.image2 = this.createImage('sprite2', 400, 200, 30)

    // this.game.physics.arcade.enable( [ this.rect, this.rectGoal ], Phaser.Physics.ARCADE)
    // this.game.physics.arcade.overlap(this.rect, this.rectGoal, this.onOverlap, undefined, this)
    // this.game.physics.arcade.overlap(this.rectGoal, this.rect, this.onOverlap, undefined, this)

    this.text = this.game.add.text(16, 16, 'Drag the sprites. Overlapping: false', {fill: '#ffffff'})
  }

  onOverlap = () => {
    console.log('УДАР УДАР')
  }

  render() {
  }

  update = () => {
    this.game.physics.arcade.collide(this.rect, this.rectGoal, this.collisionHandler, null, this)

      if (this.checkOverlap(this.rect, this.rectGoal)) {
        this.text.text = 'Overlapping: true'
      } else {
        this.text.text = 'Overlapping: false'
      }

    // ARROWS
    if (this.cursors.up.isDown) {
      this.rect.position.y -= 10
    } else if (this.cursors.down.isDown) {
      this.rect.position.y += 10
    }
    if (this.cursors.left.isDown) {
      this.rect.position.x -= 10
    } else if (this.cursors.right.isDown) {
      this.rect.position.x += 10
    }
  }

  checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds()
    var boundsB = spriteB.getBounds()
    return Phaser.Rectangle.intersects(boundsA, boundsB)
  }

  collisionHandler = (obj1, obj2) => {
    //  The two sprites are colliding
    console.warn('BOOM')
    this.game.stage.backgroundColor = '#992d2d'
  }

  createImage = (key, x = 0, y = 0, angle) => {
    const image = this.game.add.sprite(x, y, key)
    image.angle = angle

    image.events.onDragStart.add(this.onDragStart, this)
    image.events.onDragUpdate.add(this.onDragUpdate, this)
    image.events.onDragStop.add(this.onDragStop, this)

    image.inputEnabled = true
    image.input.enableDrag()

    image.events.onDragStart.add(this.onDragStart, this)
    image.events.onDragUpdate.add(this.onDragUpdate, this)
    image.events.onDragStop.add(this.onDragStop, this)

    return image
  }

  createRect = (x, y, w, h, color = '0x000000') => {
    const rect = this.game.add.graphics(x, y)
    rect.beginFill(color)
    rect.drawRect(0, 0, w, h)
    rect.endFill()
    // rect.angle = 60

    rect.inputEnabled = true
    rect.input.enableDrag()

    rect.events.onDragStart.add(this.onDragStart, this)
    rect.events.onDragUpdate.add(this.onDragUpdate, this)
    rect.events.onDragStop.add(this.onDragStop, this)

    return rect
  }

  onDragStart = () => {
    // console.log('onDragStart')
  }

  onDragUpdate = (element) => {
    // console.log('position', element.position.x)
    // console.log('worldPosition', element.worldPosition.x)
    // console.log('')
  }

  onDragStop = () => {
    // console.log('onDragStop')
  }
}

new Game().init()

