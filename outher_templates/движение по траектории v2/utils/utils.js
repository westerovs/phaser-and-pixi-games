const runDebugMode = (game, bmd, increment, points, isDebugMode = false) => {
  try {
    if (isDebugMode) {
      console.log('*** run Debug Mode ***')
  
      // Draw the path
      bmd = game.add.bitmapData(game.width, game.height);
      bmd.addToWorld();
  
      // Draw the path
      for (let i = 0; i < 1; i += increment) {
        const posX = game.math.bezierInterpolation(points.x, i);
        const posY = game.math.bezierInterpolation(points.y, i);
        bmd.rect(posX, posY, 3, 3, 'rgba(245, 0, 0, 1)');
      }
    }
  } catch (e) {
    console.log('runDebugMode Error:', e)
  }

}

export {
  runDebugMode
}
