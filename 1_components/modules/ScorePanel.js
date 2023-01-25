/* eslint-disable */

export default class ScorePanel {
  constructor(game) {
    this.game = game
    
    this.scoreItems = [
      {name: 'coin', x: -114, y: -11, scale: 0.55, score: 0},
      {name: 'lightning', x: 4, y: -10, scale: 1, score: 0},
      {name: 'star', x: 118, y: -13, scale: 1, score: 0},
    ]
    this.scorePanelGroup = game.add.group()
    this.scoreTexts = []
    this.scorePoints = 0
    this.scoreMultiplyer = 10
    this.scorePanel = null
  }
  
  init = () => {
    this.#createScorePanel()
    this.#renderScoreItems()
    this.game.Signals.onResizeSignal.add((isLandscape) => this.#resize(isLandscape))
    this.game.Signals.updateScore.add(() => this.updateScore())
  }
  
  #createScorePanel = () => {
    this.scorePanel = this.game.make.image(0, 0, 'state', 'bar-score.png')
    this.scorePanel.anchor.set(0.5)
    
    this.scorePanelGroup.add(this.scorePanel)
    this.game.LAYERS.GAME.add(this.scorePanelGroup)
  }
  
  #renderScoreItems = () => {
    this.scoreItems.forEach(data => {
      this.#createItemImage(data)
    })
  }
  
  #createItemImage = (data) => {
    const {name, x, y, scale} = data
    
    const image =  this.game.add.image(x, y, 'state', `${ name }.png`)
    image.anchor.set(0.5)
    image.scale.set(scale)
    
    this.scorePanelGroup.add(image)
    this.#createTextScore(image)
  }
  
  #createTextScore = (image) => {
    const style = {
      fontSize       : 30,
      font           : this.game.constants.FF_BASE,
      fill           : '#FFFFFF',
      stroke         : '#5B3200',
      strokeThickness: 2,
    }
  
    const text = this.game.make.text(image.x + 20, image.y + 8, this.scorePoints, style)
    this.scoreTexts.push(text)
    this.scorePanelGroup.add(text)
  }
  
  updateScore = () => {
    this.scorePoints += this.scoreMultiplyer
    this.scoreTexts.forEach((text, i) => {
      this.game.time.events.add(250 * i, () => {
        text.setText(this.scorePoints)
  
        this.game.add.tween(text.scale)
          .to({x: 1.5, y: 1.5}, 250, Phaser.Easing.Linear.None, true)
          .yoyo(true)
      })
    })
  }
  
  #resize = (isLandscape) => {
    if (isLandscape) this.scorePanelGroup.position.set(363, 783)
    else this.scorePanelGroup.position.set(682, 1010)
  }
}
