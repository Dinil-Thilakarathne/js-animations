import '../scss/style.scss'
import {gsap} from 'gsap'

const headerAnimTextElements = document.querySelectorAll('.header .mask a');
const heroAnimTextElements = document.querySelectorAll('.hero-content .mask span');
const heroImgOverlay = document.querySelector('.hero-img__overlay')
const headerMenu = document.querySelector('ul')
const headerLogo = document.querySelector('.header-logo')


const tl = gsap.timeline({
    defaults: {
        ease: 'none',
    }
});

tl.fromTo(heroImgOverlay,{
    width: '100%'
},{
    width:0,
    duration: .5
})
tl.fromTo('.header-logo',{
    rotate: '45deg',
    scale: 0
},{
    rotate: 0,
    scale:1,
    duration: .5
}, "-=.2")

headerAnimTextElements.forEach((element) => {
    tl.fromTo(element, {
      x: '200%',
    }, {
      x: 0,
      duration: .5,
      stagger: 0.4
    }, '-=.4');
});
  
heroAnimTextElements.forEach((element, index) => {
    const startPosition = index % 2 === 0 ? '100%' : '-100%';
    
    tl.fromTo(element, {
      x: startPosition,
      scale:0
    }, {
      x: 0,
      scale: 1,
      duration: .75,
      stagger: 0.4
    }, '-=.4');
});
  

tl.play()

var cursor = document.querySelector('.cursor'),
    cursorScale = document.querySelectorAll('.cursor-scale'),
    mouseX = 0,
    mouseY = 0

gsap.to({}, 0.016, {
    repeat: -1,
    duration: 1,
    ease: 'power2.ease',

    onRepeat: function () {
        gsap.set(cursor, {
            css: {
                left: mouseX,
                top: mouseY
            },
            ease: 'slow(0.7, 0.7, false)',
            delay: 0.05
        })
    }
});

window.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY
});
window.addEventListener("mouseout", () => {
    cursor.classList.add("hidden");
})
window.addEventListener("mouseover", () => {
    cursor.classList.remove("hidden");
})

cursorScale.forEach(link => {
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('grow');
        cursor.classList.remove('grow-small');
    });
    link.addEventListener('mousemove', () => {
        cursor.classList.add('grow');
        if(link.classList.contains('small')){
            cursor.classList.remove('grow');
            cursor.classList.add('grow-small');
        }
    });
});

headerMenu.addEventListener('mouseleave', () => {
    cursor.classList.remove('btn-hidden');
});
headerMenu.addEventListener('mousemove', () => {
    cursor.classList.add('btn-hidden');
});
headerLogo.addEventListener('mouseleave', () => {
    cursor.classList.remove('btn-hidden');
});
headerLogo.addEventListener('mousemove', () => {
    cursor.classList.add('btn-hidden');
});