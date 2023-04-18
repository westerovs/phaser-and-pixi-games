const crystalName = {
  crystalBody : 'crystalBody',
  crystalLeft : 'crystalLeft',
  crystalTop  : 'crystalTop',
  crystalRight: 'crystalRight',
}

const crystalPartsParams = [
  {
    key   : crystalName.crystalBody,
    isDisabled: true,
    x     : 330,
    y     : 300,
    anchor: [0.5, 0.5],
    initAngle : 0,
  },
  {
    key   : crystalName.crystalLeft,
    isDisabled: false,
    // x     : 200,
    // y     : 240,
    x     : 130,
    y     : 300,
    // anchor: [0, 1],
    anchor: [0.5, 0.5],
    // initAngle: -60,
    initAngle: 0,
  },
  {
    key   : crystalName.crystalTop,
    isDisabled: false,
    // x     : 282,
    // y     : 138,
    x     : 282,
    y     : 38,
    anchor: [1, 0.599],
    // initAngle: 80,
    initAngle: 0,
  },
  {
    key   : crystalName.crystalRight,
    isDisabled: false,
    // x     : 460,
    // y     : 125,
    x     : 480,
    y     : 25,
    anchor: [1, 0.65],
    // initAngle: 120,
    initAngle: 0,
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
