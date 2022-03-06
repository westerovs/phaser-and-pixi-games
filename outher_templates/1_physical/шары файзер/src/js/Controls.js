export default class Controls {
  constructor(game, element) {
    this.element = element
    this.game = game
  }
  
  init = () => {
    console.log('Controls')
  }
  
  touchMoveHandler = (event) => {
    // event.preventDefault()
    console.warn(event)
    
    // let touch = event.targetTouches[0]
    
    // this.element.position.y = `${touch.pageY - (wrapper.offsetTop) - (this.element.offsetWidth / 2)}px`
    // this.element.position.x = `${touch.pageX - (wrapper.offsetLeft) - (this.element.offsetHeight / 2)}px`
  
    // this.element.position.y = `${touch.pageY - 0 - (this.element.offsetWidth / 2)}`
    // this.element.position.x = `${touch.pageX - 0 - (this.element.offsetHeight / 2)}`
  
  
    // empty.map(item => {
    //   if (
    //     this.element.getBoundingClientRect().top + this.element.offsetWidth / 2 < item.getBoundingClientRect().bottom &&
    //     this.element.getBoundingClientRect().right - this.element.offsetWidth / 2 > item.getBoundingClientRect().left &&
    //     this.element.getBoundingClientRect().bottom - this.element.offsetWidth / 2 > item.getBoundingClientRect().top &&
    //     this.element.getBoundingClientRect().left + this.element.offsetWidth / 2 < item.getBoundingClientRect().right
    //   ) {
    //     item.classList.add('active')
    //     itemAppend = item
    //   }
    //   else {
    //     item.classList.remove('active')
    //   }
    // })
  }
}
