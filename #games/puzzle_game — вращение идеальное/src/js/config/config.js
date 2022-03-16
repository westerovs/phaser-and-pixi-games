const crystalName = {
  crystalBody   : 'crystalBody',
  crystalLeftBig: 'crystalLeftBig',
  crystalLeft   : 'crystalLeft',
  crystalTop    : 'crystalTop',
  crystalRight  : 'crystalRight',
}

const crystalPartsParams = [
  {
    _name       : crystalName.crystalBody,
    isDisabled : true,
    x          : 134,
    y          : 46,
    anchor     : [0.5, 0.5],
    initAngle  : 0,
    finishAngle: 0,
    isComplete : false,
    children   : null,
  },
  {
    _name       : crystalName.crystalLeftBig,
    isDisabled : false,
    x          : 2,
    y          : 44,
    anchor     : [0.55, 0],
    initAngle  : 50,
    finishAngle: 0,
    isComplete : false,
    children   : null,
  },
  {
    _name       : crystalName.crystalLeft,
    isDisabled : false,
    x          : 5,
    y          : -58,
    anchor     : [1, 0],
    initAngle  : 75,
    finishAngle: 0,
    isComplete : false,
    children   : null,
  },
  {
    _name       : crystalName.crystalTop,
    isDisabled : false,
    x          : 86,
    y          : -98,
    anchor     : [1, 0.599],
    initAngle  : 80,
    finishAngle: 0,
    isComplete : false,
    children   : null,
  },
  {
    _name       : crystalName.crystalRight,
    isDisabled : false,
    x          : 264,
    y          : -106,
    anchor     : [1, 0.65],
    initAngle  : 120,
    finishAngle: 0,
    isComplete : false,
    children   : null,
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
