 // вызывать в рендере
 reateCameraDebug = () => {
    this.game.debug.cameraInfo(this.game.camera, 20, 45, 'black')
    this.game.debug.font = '60px monospace'
    this.game.debug.lineHeight = 55
    this.game.debug.renderShadow = false
  }

  //   cameraRender() {
  //   if (this.isCameraFollow) {
  //     this.#createCameraDeadZone()
  //   }
  //   this.#createCameraDebug()
  // }