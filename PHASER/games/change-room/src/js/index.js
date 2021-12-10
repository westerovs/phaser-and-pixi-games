import ActiveTabs from './utils.js';

class Game {
    constructor() {
        this.game = document.querySelector('.game')
        this.btnPanel = document.querySelector('.button-panel')
        
        this.rowItemWallpaper = document.querySelector('.row-items-wallpaper')
        this.rowItemBad       = document.querySelector('.row-items-bed')
        
        this.btnWallpaper = document.querySelector('.button-wallpaper')
        this.btnBad = document.querySelector('.button-bad')
    }
    
    btnWallpaperHandler = () => {
        console.log('press wallpaper')
        this.rowItemWallpaper.classList.toggle('visually-hidden')
        // this.btnBad.classList.toggle('visually-hidden')
    }
    
    btnBadHandler = () => {
        console.log('press bad')
        this.rowItemBad.classList.toggle('visually-hidden')
        // this.btnWallpaper.classList.toggle('visually-hidden')
    }
    
    addedHandlers = () => {
        this.btnWallpaper.addEventListener('click', this.btnWallpaperHandler)
        this.btnBad.addEventListener('click', this.btnBadHandler)
    }
    
    init() {
        this.addedHandlers()
    }
}

new Game().init()
new ActiveTabs('.row-items-bed .button-items', '.bed').init()
new ActiveTabs('.row-items-wallpaper .button-items', '.wallpaper').init()