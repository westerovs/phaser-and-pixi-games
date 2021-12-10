import {bedIsChecked, wallpaperIsChecked} from './const.js';

export default class ActiveTabs {
  constructor(tabSelector, contentSelector) {
    this.tabItems = Array.from(document.querySelectorAll(tabSelector))
    this.contentItems = Array.from(document.querySelectorAll(contentSelector))
  }
  
  _clearActiveClass = (element, className = 'is-active') => {
    element.find(item => item.classList.remove(`${ className }`))
  }
  
  _setActiveClass = (element, index, className = 'is-active') => {
    element[index].classList.add(`${ className }`)
  }
  
  _checkoutTabs = (btn, index) => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('is-active')) return
      this._getCheckedStatus(btn, index)
      
      this._clearActiveClass(this.tabItems)
      this._clearActiveClass(this.contentItems)
      
      this._setActiveClass(this.tabItems, index)
      this._setActiveClass(this.contentItems, index)
    })
  }
  
  _getCheckedStatus = (btn, index) => {
    switch (btn.dataset.type) {
      case 'wallpaper':
        wallpaperIsChecked.check = true
        wallpaperIsChecked.indexItem = index
        break
      case 'bed':
        bedIsChecked.check = true
        bedIsChecked.indexItem = index
        break
    }
  
  }
  
  init = () => {
    this.tabItems.forEach(this._checkoutTabs)
  }
}