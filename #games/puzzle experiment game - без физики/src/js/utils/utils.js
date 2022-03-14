const autoRotate = (game, crystal, cb, delay = 1000) => {
  if (cb) game.input.deleteMoveCallback(cb)
  
  game.input.deleteMoveCallback(cb)
  const rotation = +crystal.rotation.toFixed(2)
  
  let angleError = null
  if (rotation > 0) angleError = crystal.initAngle
  else angleError = angleError = crystal.angle - crystal.initAngle
  
  return game.add.tween(crystal)
    .to(
      {angle: angleError},
      Phaser.Timer.HALF / 10, Phaser.Easing.Linear.None, true, delay
    )
}

export {
  autoRotate
}
