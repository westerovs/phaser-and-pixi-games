export default class IqCounter {
  constructor() {
    this.iqCount = this.counter
    this.counter = 60
    this.stepIqCount = 10
  }
  
  iqPlus = () => {
    this.iqCount = this.counter += this.stepIqCount
    console.warn(this.iqCount)
  }
  
  iqMinus = () => {
    this.iqCount = this.counter -= this.stepIqCount
    console.warn(this.counter)
  }
}

const newCounter = new IqCounter()

