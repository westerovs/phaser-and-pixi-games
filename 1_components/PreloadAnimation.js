/* eslint-disable */
import { getPositionsCards } from '../utils/utils.js';
import { tweenSetAlpha } from '../utils/tweens.js';

export default class PreloadAnimation extends Phaser.Group {
  constructor(game, positions) {
    super(game)
    
    this.game = game
    this.positions = positions
    
    this.cards = []
    this.cardsGlow = []
    this.countGlow = 0
    
    this.init()
  }
  
  init() {
    this.createCards()
    this.setPosition(this.positions.x, this.positions.y)
    
    this.runAnimation()
  }
  
  createCards = () => {
    // todo оптимизировать вызов
    const positions = getPositionsCards(this.game.constants.CARDS.rows, this.game.constants.CARDS.cols,
      {
        width: 150,
        height: 211,
        offset: {x: -15, y: 0},
      })
    
    for (let i = 1; i <= 3; i++) {
      const card = this.game.add.image(positions[i].x, positions[i].y, 'cards', `card${i}.png`)
      const cardGlow = this.game.add.image(0, 0, 'cards', 'card-glow.png')
      card.addChild(cardGlow)
  
      card.anchor.set(0.5)
      cardGlow.anchor.set(0.5)
      
      this.add(card)
      this.cards.push(card)
      this.cardsGlow.push(cardGlow)
    }
    
    this.cardsGlow[0].alpha = 0
    this.cardsGlow[1].alpha = 0
    this.cardsGlow[2].alpha = 0
  }
  
  runAnimation = () => {
    this.cardsGlow.forEach((card, index) => {
      this.checkoutGlow(card, index)
    })
  }
  
  checkoutGlow = (card, delay) => {
    tweenSetAlpha(this.game, card, 1, 0.5, 1 * delay)
      .onComplete.add(() => {

        tweenSetAlpha(this.game, card, 0, 1,).onComplete.add(() => {
          this.countGlow++
          if (this.countGlow === 3) {
            this.countGlow = 0
            this.runAnimation()
          }
        })
    })
  }
  
  setPosition(x, y) {
    this.position.set(x, y)
  }
}
