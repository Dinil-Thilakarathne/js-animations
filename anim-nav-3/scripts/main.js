import '../scss/style.scss'
import gsap from 'gsap'

const themeChangeBtn = document.querySelector('.theme-change')
const menuBtn = document.querySelector('.menu-btn')
// const menuUls = document.querySelectorAll('.header-nav__menu ul')
const menuUls = gsap.utils.toArray('.header-nav__menu ul')
const topMenuItems = gsap.utils.toArray('.top-menu li')
const bottomMenuItems = gsap.utils.toArray('.bottom-menu div')
const menuIcon = document.querySelector('.menu-btn svg')
const menuIconPath = document.querySelector('.menu-btn path')

gsap.set(menuUls, {
    opacity: 0,
    y: 75,
})
gsap.set(topMenuItems, {
    opacity: 0,
    y: 75,
})
gsap.set(bottomMenuItems, {
    opacity: 0,
    y: 75,
})

const menusTL = gsap.timeline()

menusTL
        .to(menuIcon, {
            attr: {viewBox : '0 0 16 4', height: '4'}
        })
        .to(menuIconPath, {
            attr: {d: 'M1.30275 3.30275C0.583262 3.30275 0 2.71949 0 2V2C0 1.28051 0.583262 0.69725 1.30275 0.69725H6.68709H9.31291H14.6972C15.4167 0.69725 16 1.28051 16 2V2C16 2.71949 15.4167 3.30275 14.6972 3.30275H9.31291H6.68709H1.30275Z'}
        },'<')
        .to(menuUls, {
            y:0,
            opacity:1,
            duration: .5,
            stagger: .25
        })
        .to(topMenuItems, {
            y:0,
            opacity:1,
            duration: .5,
            stagger: .15
        })
        .to(bottomMenuItems, {
            y:0,
            opacity:1,
            duration: .5,
            stagger: .1
        },'-=.5')

menusTL.pause()

let menuOpen = false

menuBtn.addEventListener('click', () => {
    menuOpen ? menusTL.reverse() : menusTL.play()
    menuOpen = !menuOpen
})