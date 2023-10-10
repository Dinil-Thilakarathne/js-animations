import '../scss/style.scss'
import { gsap } from 'gsap';
import SplitType from 'split-type'

const hero = document.querySelector('.hero');
const menuSection = document.querySelector('.menu-section')
const menuIcon = document.querySelector('.menu-icon')
const menuIconLine = document.querySelectorAll('.menu-icon__line')
const menuLinks = document.querySelectorAll('.menu-link')
const menuItems = new gsap.utils.toArray('.menu .mask')
const menuItemsIcons = new gsap.utils.toArray('.arrow-svg')

const heroText = new SplitType('.hero h1', { types: 'chars' })

const tl = gsap.timeline({
    defaults: {
        ease: 'power4.inOut',
        duration: 1.5
    }
});

gsap.set(menuSection, {
    scaleY:0,
})
gsap.set(menuItems, {
    yPercent: 100
})
gsap.set(menuItemsIcons, {
    scale:0
})
gsap.set(heroText.chars, {
    y:100,
    scale:0,
    opacity:0
})

gsap.to(heroText.chars, {
    y:0,
    scale:1,
    opacity:1,
    stagger:.02,
    duration:.8,
    ease: 'power2.in',
})

tl
    .to(hero, {
        scale: 0.85,
    })
    .to(menuIconLine, {
        backgroundColor:'#fff'
    }, "<")
    .to(menuSection, {
        scaleY:1,
    }, "-=1.5")
    .to(menuItems, {
        yPercent:0,
        stagger:.1
    }, "-=1")
tl.pause()

let menuOpen = false

menuIcon.addEventListener('click',() => {
    gsap.set(menuSection,{
        transformOrigin: menuOpen ? 'top' : 'bottom'
    })
    if (!menuOpen) {
        tl.play();
        menuOpen = true;
    } else {
        tl.reverse();
        menuOpen = false;
    }
})


menuLinks.forEach(link => {
    let linkIcon = link.querySelector('.arrow-svg')
    let linkText = link.querySelector('a')

    link.addEventListener('mouseenter',()=> {
        gsap.to(linkIcon, {
            scale:1
        })
        gsap.to(linkText, {
            x: 20
        })
    })
    link.addEventListener('mouseleave',()=> {
        gsap.to(linkIcon, {
            scale:0
        })
        gsap.to(linkText, {
            x: -20
        })
    })
})
