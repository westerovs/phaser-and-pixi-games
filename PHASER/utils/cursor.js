/*
* Создаёт кастомный курсор, путем создания DOM элемента. Стили берет из файла CSS
* */
export default class Cursor {
  constructor(game, factor, settings) {
    this.game = game
    this.factor = factor
    this.settings = settings

    this.parent = this.game.context.canvas
    this.cursor = null
    this.className = 'cursor'
    this.scale = 1 * this.factor

    this.timeoutCursor = null
    this.mouseMoveTimeout = null
    this.timeToHideCursor = 1500
  }

  init = () => {
    if (this.settings === 'game') {
      this.game.context.canvas.style.cursor = 'none'

      this.createCursor()
      this.addedHandlers()
      this.hideMouse()

      this.cursor.style.transform = `
        translate(${document.documentElement.clientWidth * 0.5}px, ${document.documentElement.clientHeight * 0.8}px)
        scale(${this.scale})`
    }
  }

  destroy = () => {
    this.cursor.remove()
    document.removeEventListener('mousemove', this.mouseMove)
    document.removeEventListener('touchstart', this.touchStart)
    document.removeEventListener('touchmove', this.touchMove)
    document.removeEventListener('touchend', this.touchEnd)
  }

  addedHandlers = () => {
    if (('ontouchstart' in window)) {
      // если это touch и ширина, или длинна > 1080, то запуск. тачовые события
      if (document.documentElement.clientWidth >= 1080 || document.documentElement.clientHeight >= 1080) {
        document.addEventListener('touchstart', this.touchStart)
        document.addEventListener('touchmove', this.touchMove)
        document.addEventListener('touchend', this.touchEnd)
      }
    } else {
      // если это мышь
      this.cursor.classList.add('cursor-visible')
      document.addEventListener('click', this.mouseClick)
      document.addEventListener('mousemove', this.mouseMove)
    }
  }

  createCursor = () => {
    this.cursor = document.createElement('div')
    this.cursor.classList.add(this.className)
    document.body.append(this.cursor)
  }

  hideMouse = () => {
    clearTimeout(this.mouseMoveTimeout)
    this.mouseMoveTimeout = setTimeout(() => {
      this.cursor.classList.remove('cursor-visible')
      this.cursor.classList.add('cursor-hidden')
    }, this.timeToHideCursor)
  }

  showMouse = () => {
    this.cursor.classList.add('cursor-visible')
    this.cursor.classList.remove('cursor-hidden')
  }

  mouseClick = (event) => {
    event.preventDefault()
    this.showMouse()
    this.hideMouse()
  }

  mouseMove = (event) => {
    event.preventDefault()

    const x = event.clientX
    const y = event.clientY
    this.cursor.style.transform = `translate(${x}px, ${y}px) scale(${this.scale})`

    this.showMouse()
    this.hideMouse()
  }

  touchStart = (event) => {
    event.preventDefault()
    const touch = event.targetTouches[0]

    this.cursor.classList.add('cursor-visible')
    this.cursor.classList.remove('cursor-hidden')

    clearTimeout(this.timeoutCursor)

    this.cursor.style.transform = `translate(${touch.pageX - (this.parent.offsetLeft)}px, ${touch.pageY - (this.parent.offsetTop)}px) scale(${this.scale})`
  }

  touchMove = (event) => {
    event.preventDefault()

    const touch = event.targetTouches[0]
    this.cursor.style.transform = `translate(${touch.pageX - (this.parent.offsetLeft)}px, ${touch.pageY - (this.parent.offsetTop)}px) scale(${this.scale})`
  }

  touchEnd = (event) => {
    event.preventDefault()

    this.timeoutCursor = setTimeout(() => {
      this.cursor.classList.remove('cursor-visible')
      this.cursor.classList.add('cursor-hidden')
    }, this.timeToHideCursor)
  }
}
