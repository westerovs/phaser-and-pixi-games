const autoRotateOnError = (game, crystal, cb) => {
  if (cb) game.input.deleteMoveCallback(cb)
  
  const rotation = +crystal.rotation.toFixed(2)
  
  let angleError = null
  if (rotation > 0) angleError = crystal.initAngle
  else angleError = angleError = crystal.angle - crystal.initAngle
  
  return game.add.tween(crystal)
    .to(
      {angle: angleError},
      Phaser.Timer.HALF / 10, Phaser.Easing.Linear.None, true
    )
}

export {
  autoRotateOnError
}
