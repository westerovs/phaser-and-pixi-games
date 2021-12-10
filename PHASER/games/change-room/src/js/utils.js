export default class ActiveTabs {
  constructor(tabSelector, contentSelector) {
    this.tabItems = Array.from(document.querySelectorAll('.row-items-bed .button-items'))
    this.contentItems = Array.from(document.querySelectorAll('.bed'))
  }
  
  clearActiveClass = (element, className = 'is-active') => {
    element.find(item => item.classList.remove(`${ className }`))
  }
  
  setActiveClass = (element, index, className = 'is-active') => {
    element[index].classList.add(`${ className }`)
  }
  
  checkoutTabs = (item, index) => {
    item.addEventListener('click', () => {
      
      if (item.classList.contains('is-active')) return
      console.log(item)
      
      this.clearActiveClass(this.tabItems)
      // this.clearActiveClass(this.contentItems)
      
      this.setActiveClass(this.tabItems, index)
      // this.setActiveClass(this.contentItems, index)
    })
  }
  
  init() {
    this.tabItems.forEach(this.checkoutTabs)
  }
}