import {createTween} from './utils'

function createElectricity(game, x, y) {
  // electricity - название атласа
  const electricity = game.add.sprite(x, y, 'electricity')
  electricity.scale.set(3)

  // Создайте анимацию electro, если не указываем никаких кадров
  // это означает, что она будет использовать все кадры в атласе
  electricity.animations.add('electro')
  electricity.animations.play('electro', 30, false)

  game.add.tween(electricity).to(
    {y: 300},
    2000,
    Phaser.Easing.Quadratic.InOut,
    true,
    0,
  )
}

function createTweenScale(game, sprite, second = 1) {
  createTween(game, {
    sprite: sprite.scale,
    prop  : {
      x: sprite.scale.x * 0.85,
      y: sprite.scale.y * 0.85,
    },
  }, second).repeat(-1).yoyo(true)
}


// эффект разбития на частицы
addSparkleToElement(params) {
  const {
          tweenItem,
          frame,
          count = 1,
          minSpeedX = 0,
          minSpeedY = 0,
          maxSpeedX = 0,
          maxSpeedY = 0,
          gravitation = 0,
        } = params
  
  const sparkleEmitter = this.game.add
    .emitter(tweenItem.worldPosition.x, tweenItem.worldPosition.y, count)
  
  sparkleEmitter.makeParticles('main', `${frame}.png`)
  sparkleEmitter.minParticleSpeed.setTo(minSpeedX * this.factor, minSpeedY * this.factor)
  sparkleEmitter.maxParticleSpeed.setTo(maxSpeedX * this.factor, maxSpeedY * this.factor)
  sparkleEmitter.setScale(0.5 * this.factor, 5 * this.factor, 0.5 * this.factor, 5 * this.factor, 2500)
  sparkleEmitter.gravity = gravitation
  sparkleEmitter.start(true, 500, null, 25)
  
  this.game.stage.add(sparkleEmitter)
}

// вызов ↑
this.addSparkleToElement({
  tweenItem: this.sprites.character1,
  frame    : 'light-slice',
  count    : getRandomNumber(8, 20),
  minSpeedX: -450,
  minSpeedY: -450,
  maxSpeedX: 450,
  maxSpeedY: 450,
})


export {
  createElectricity,
  createTweenScale,
}
