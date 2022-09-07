/* eslint-disable */
// import { scaleTween } from '../utils/tweens.js';
const scaleTween = (game, item, scale, duration = 300) => {
  return game.add.tween(item.scale)
    .to({x: scale, y: scale}, duration, Phaser.Easing.Linear.None, true)
}

export default class SpeechBubble {
  constructor(game, container) {
    this.game = game
    this.container = container

    this.bubbleContainer = null
    this.phrase = 'Find the keys!'

    this.init()
  }

  init = () => {
    this.bubbleContainer = this.game.make.group()
    this.bubbleContainer.position.set(270, 0)
    this.bubbleContainer.scale.set(0)
    
    const bubble = this.#createBubble()
    const text = this.#createText()

    this.bubbleContainer.add(bubble)
    this.bubbleContainer.add(text)
    this.container.add(this.bubbleContainer)

    this.#showBubble(this.game, this.bubbleContainer, 1)
      .onComplete.add(() => this.animateText(text, this.phrase, this.#hideBubble))
  }

  #createBubble = () => {
    const bubble = this.game.make.image(0, 0, 'main', 'text-bubble.png')
    bubble.anchor.set(0.5)

    return bubble
  }

  #createText = () => {
    const style = {
      font         : this.game.constants.FF_BASE,
      fontSize     : 40,
      fill         : '#5E1300',
      // stroke         : '#000000',
      // strokeThickness: 4,
      fontWeight   : 800,
      align        : 'center',
      boundsAlignV : 'top',
      wordWrap     : true,
      wordWrapWidth: 500,
    }

    const text = this.game.make.text(10, -5, '', style)
    text.anchor.set(0.5)

    return text
  }
  
  #showBubble = () => {
    return scaleTween(this.game, this.bubbleContainer, 1)
  }
  
  #hideBubble = () => {
    scaleTween(this.game, this.bubbleContainer, 0)
  }
  
  animateText = (initText, newText, callback, speed = 80) => {
    const splitText = newText.split('')
    let letter = ''

    splitText.forEach((word, i) => {
      setTimeout(() => {
        letter += word
        initText.setText(letter)

        // вызов callback
        if (i === splitText.length - 1) {
          setTimeout(() => (callback ? callback() : null), 500)
        }
      }, speed * i)
    })
  }
}
