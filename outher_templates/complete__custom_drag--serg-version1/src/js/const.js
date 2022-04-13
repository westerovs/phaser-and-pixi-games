const crystalName = {
  crystalBody: 'crystalBody',
  crystalLeft: 'crystalLeft',
  crystalTop: 'crystalTop',
  crystalRight: 'crystalRight',
}

const crystalPartsParams = [
  {
    key: crystalName.crystalBody,
    x: 380,
    y: 350,
    anchor: {
      x: 0.5,
      y: 0.5
    },
    angle: 0,
    // angle: 0,
  },
  {
    key: crystalName.crystalLeft,
    x: 200,
    y: 345,
    anchor: {
      x: 0,
      y: 1
    },
    angle: -60,
    // angle: -0,
  },
  {
    key: crystalName.crystalTop,
    x: 386,
    y: 200,
    anchor: {
      x: 1,
      y: 0.599
    },
    angle: 80,
    // angle: 0,
  },
  {
    key: crystalName.crystalRight,
    x: 565,
    y: 190,
    anchor: {
      x: 1,
      y: 0.65
    },
    angle: 120,
    // angle: 0,
  },
]

const crystalParts = {
  crystalBody: null,
  crystalLeft: null,
  crystalTop: null,
  crystalRight: null,
}

export {
  crystalPartsParams,
  crystalParts
}
