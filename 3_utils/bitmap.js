  #createCoverWrap = () => {
    this.coverWrap = this.game.add.bitmapData(200, 200)
    this.coverWrap.x = 200
    this.coverWrap.y = 200
    
    this.coverWrap.context.fillStyle = 'brown'
    this.coverWrap.context.fillRect(0, 0, 500, 200)
    this.coverWrap.ctx.fillStyle = "blue"
    this.coverWrap.ctx.font = '35px san-serif'
    
    const textString = 'Потри меня!'
    const textWidth = this.coverWrap.ctx.measureText(textString).width
    this.coverWrap.ctx.fillText(textString, (this.coverWrap.width / 2) - (textWidth / 2), 120)
  
    // или создать картинку 
    // this.coverWrap.copy('redBlock');
    
    this.coverWrap.update()
    this.coverWrap.addToWorld(this.coverWrap.x, this.coverWrap.y)
  }