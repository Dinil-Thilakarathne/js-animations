import '../scss/style.scss'
import {gsap} from 'gsap'

const navIcon = document.querySelector('.nav-icon')
const overlay = document.querySelector('.overlay');
const hero  = document.querySelector('.hero')
const heroContent = document.querySelector('.hero-content')
const menuItems = gsap.utils.toArray('ul li a')

let menuOpen = false;

gsap.set(overlay, {
    scaleY: 0,
})
gsap.set(menuItems, {
    yPercent: 100
})

const tl = gsap.timeline({
    defaults: {
        ease: 'power4.inOut',
        duration: 1
    }
});

tl
.to(hero, {
    scale: 0.95,
})
.to(heroContent, {
    pointerEvents: 'none'
}, "<")
.to(overlay, {
    scaleY: 1
}, "-=0.5")
.to(navIcon, {
    color: '#fff',
}, "-=.9")
.to(menuItems, {
    yPercent: 0,
    stagger: 0.1,
    duration: 2
}, "-=1.5")
tl.pause();

navIcon.addEventListener('click', () => {
    if (!menuOpen) {
        tl.play();
        menuOpen = true;
    } else {
        tl.reverse();
        menuOpen = false;
    }
})