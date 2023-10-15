import '../scss/style.scss'
import SplitType from 'split-type'
import gsap from 'gsap'

const animText = new SplitType('.hero-content__anim-text', {types: 'words'})
const heroMainText = new SplitType('.hero-content__title', {types: 'words, chars'})
const headerItems =  gsap.utils.toArray('.header-item .mask')
const animTextTopBar = document.querySelector('.hero-content__anim-text::before')

console.log(headerItems);
console.log(animTextTopBar);



const mainTL = gsap.timeline()

mainTL.to(headerItems, {
    clipPath: 'circle(150% at 0 100%)',
    duration: .75,
    stagger: .4
}).from(heroMainText.chars, {
    rotate: '25deg',
    y:'100%',
    opacity:0,
    scale:.5,
    duration:.4,
    stagger: .15
},'-=.8').fromTo('.hero-img', {
    scaleY: 0,
    transformOrigin: 'bottom'
}, {
    scaleY:1,
    duration:1
}, '<').fromTo('.hero-content__anim-text .mask', {
    width: 0,
}, {
    width:'100%',
    duration:1,
    stagger: .5
}, '<').fromTo('.hero-img img', {
    scale: 0,
    opacity:0
}, {
    scale:1,
    opacity:1,
    duration:.5
}, '-=2')



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
        cursor.classList.remove('grow-img');
    });
    link.addEventListener('mousemove', () => {
        cursor.classList.add('grow');
        if(link.classList.contains('small')){
            cursor.classList.remove('grow');
            cursor.classList.add('grow-small');
        }
        if(link.classList.contains('cursor-img')){
            cursor.classList.remove('grow');
            cursor.classList.add('grow-img');
        }
    });
});
