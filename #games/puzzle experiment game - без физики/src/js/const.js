const crystalName = {
  crystalBody   : 'crystalBody',
  crystalLeft   : 'crystalLeft',
  crystalLeftBig: 'crystalLeftBig',
  crystalTop    : 'crystalTop',
  crystalRight  : 'crystalRight',
}

const crystalPartsParams = [
  {
    key        : crystalName.crystalBody,
    isDisabled : true,
    x          : 380,
    y          : 296,
    anchor     : [0.5, 0.5],
    initAngle  : 0,
    finishAngle: 0,
  },
  {
    key        : crystalName.crystalLeft,
    isDisabled : false,
    x          : 202,
    y          : 246,
    anchor     : [0, 1],
    initAngle  : -60,
    finishAngle: 0,
  },
  {
    key        : crystalName.crystalLeftBig,
    isDisabled : false,
    x          : 245,
    y          : 345,
    anchor     : [0.55, 0],
    initAngle  : 50,
    finishAngle: 0,
  },
  {
    key        : crystalName.crystalTop,
    isDisabled : false,
    x          : 284,
    y          : 141,
    anchor     : [1, 0.599],
    initAngle  : 80,
    finishAngle: 0,
  },
  {
    key        : crystalName.crystalRight,
    isDisabled : false,
    x          : 461,
    y          : 127,
    anchor     : [1, 0.65],
    initAngle  : 120,
    finishAngle: 0,
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
