import {bedIsChecked, wallpaperIsChecked} from './const.js';
import {render} from './utils.js';
import ActiveTabs from './ActiveTabs.js';

class Game {
    constructor() {
        this.game = document.querySelector('.game')
        this.btnPanel = document.querySelector('.button-panel')
        
        this.rowItemWallpaper = document.querySelector('.row-items-wallpaper')
        this.rowItemBad       = document.querySelector('.row-items-bed')
        
        this.btnWallpaper = document.querySelector('.button-wallpaper')
        this.btnBad = document.querySelector('.button-bad')
    }
    
    _btnWallpaperHandler = () => {
        if (wallpaperIsChecked.check) {
            this.btnWallpaper.disabled = true
        }
        
        this.rowItemWallpaper.classList.toggle('visually-hidden')
        this.btnBad.classList.toggle('visually-hidden')
    }
    
    _btnBedHandler = () => {
        if (bedIsChecked.check) {
            this.btnBad.disabled = true
        }
        
        this.rowItemBad.classList.toggle('visually-hidden')
        this.btnWallpaper.classList.toggle('visually-hidden')
    }
    
    _addedHandlers = () => {
        this.btnWallpaper.addEventListener('click', this._btnWallpaperHandler)
        this.btnBad.addEventListener('click', this._btnBedHandler)
    }
    
    init() {
        this._addedHandlers()
    }
}

new Game().init()
new ActiveTabs('.row-items-bed .button-items', '.bed').init()
new ActiveTabs('.row-items-wallpaper .button-items', '.wallpaper').init()