const crystalName = {
  crystalBody   : 'crystalBody',
  crystalLeft   : 'crystalLeft',
  crystalLeftBig: 'crystalLeftBig',
  crystalTop    : 'crystalTop',
  crystalRight  : 'crystalRight',
}

const crystalPartsParams = [
  {
    key   : crystalName.crystalBody,
    isDisabled: true,
    x     : 380,
    y     : 300,
    anchor: [0.5, 0.5],
    initAngle : 0,
  },
  {
    key   : crystalName.crystalLeft,
    isDisabled: false,
    x     : 200,
    y     : 240,
    anchor: [0, 1],
    initAngle: -60,
  },
  {
    key   : crystalName.crystalLeftBig,
    isDisabled: false,
    x     : 195,
    y     : 410,
    anchor: [0, 1],
    initAngle: 0,
  },
  {
    key   : crystalName.crystalTop,
    isDisabled: false,
    x     : 282,
    y     : 138,
    anchor: [1, 0.599],
    initAngle: 80,
  },
  {
    key   : crystalName.crystalRight,
    isDisabled: false,
    x     : 460,
    y     : 125,
    anchor: [1, 0.65],
    initAngle: 120,
  },
]

const crystalParts = {
  crystalBody : null,
  crystalLeft : null,
  crystalTop  : null,
  crystalRight: null,
}

export {
  crystalPartsParams,
  crystalParts
}
