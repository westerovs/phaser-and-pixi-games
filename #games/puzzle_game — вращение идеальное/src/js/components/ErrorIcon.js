export default class ErrorIcon {
  constructor(game) {
    this.game      = game
    this.errorIcon = null
  }
  
  createIcon = () => {
    this.errorIcon = this.game.add.image(100, 100, 'iconError')
    return this.errorIcon
  }
  
  changePositionIcon = (x, y) => {
    this.errorIcon.position.set(x, y)
    this.game.add.tween(this.errorIcon)
      .to({alpha: 1}, Phaser.Timer.HALF / 4, Phaser.Easing.Linear.None, true)
      .onComplete.add(() => {
      this.game.add.tween(this.errorIcon)
        .to({alpha: 0}, Phaser.Timer.HALF / 4, Phaser.Easing.Linear.None, true)
    })
  }
}
