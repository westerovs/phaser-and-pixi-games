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
  },
  {
    key: crystalName.crystalLeft,
    x: 244,
    y: 290,
    anchor: {
      x: 0,
      y: 1
    },
    angle: -60,
  },
  {
    key: crystalName.crystalTop,
    x: 286,
    y: 175,
    anchor: {
      x: 1,
      y: 0.599
    },
    angle: 80,
  },
  {
    key: crystalName.crystalRight,
    x: 475,
    y: 160,
    anchor: {
      x: 1,
      y: 0.65
    },
    angle: 120,
  },
]

export {
  crystalPartsParams
}
