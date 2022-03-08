const config = {
  type  : Phaser.AUTO,
  width : 800,
  height: 600,
  loader: {
    baseURL    : 'https://labs.phaser.io',
    crossOrigin: 'anonymous'
  },
  scene : {
    preload: preload,
    create : create,
    update : update
  }
}

const game = new Phaser.Game(config)

function preload() {
  this.load.image('arrow', 'assets/sprites/longarrow-white.png')
  this.load.image('cursor', 'assets/sprites/drawcursor.png')
}

let arrow1 = null
let arrow2 = null
let target = 0
let ROTATION_SPEED = 1 * Math.PI // radians per second

function create() {
  this.add.circle(400, 300, 200, 0x222222)

  // Эта стрелка будет вращаться мгновенно
  arrow1 = this.add.image(400, 300, 'arrow')
    .setOrigin(0, 0.5)
    .setAlpha(0.4)

  // Эта стрелка будет вращаться со скоростью ROTATION_SPEED
  arrow2 = this.add.sprite(400, 300, 'arrow')
    .setOrigin(0, 0.5)

  this.input.on('pointermove', function (pointer) {
    target = Phaser.Math.Angle.BetweenPoints(arrow2, pointer)
  })
}

function update(time, delta) {
  arrow1.rotation = target

  arrow2.rotation = Phaser.Math.Angle.RotateTo(
    arrow2.rotation,
    target,
    ROTATION_SPEED * 0.001 * delta
  )
}

