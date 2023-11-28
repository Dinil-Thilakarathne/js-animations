import '../scss/style.scss'
import { gsap } from 'gsap'
import SplitType from 'split-type'


const counter3 = document.querySelector('.counter-3')

for(let i = 0; i <2; i++){
    for(let j =0; j < 10; j++){
        const div = document.createElement('div')
        div.className = 'num'
        div.textContent = j
        counter3.appendChild(div)
    }

}

const finalDiv =  document.createElement('div')
finalDiv.className = 'num'
finalDiv.textContent = '0'
counter3.appendChild(finalDiv)

function animate(counter, duration, delay =0){
    const numHeight = counter.querySelector('.num').clientHeight
    console.log(numHeight);
    const totalDistance = (counter.querySelectorAll('.num').length - 1) * numHeight 
    console.log(totalDistance);

    gsap.to(counter, {
        y: -totalDistance,
        duration: duration,
        delay, delay,
        ease: 'power2.inOut',
    })

}
animate(counter3, 5)
animate(document.querySelector('.counter-2'), 6)
animate(document.querySelector('.counter-1'), 2, 4)

const t1 = gsap.timeline()

t1
.to('.loader-bar', {
    width:'100%',
    duration:6,
    ease: 'power2.inOut'
})
.to('.loader',{
    rotate:  '90deg',
})
.to('.loader',{
    height:'100vw',
    width: '100vh',
    ease: 'power2.in'
})


const t2 = gsap.timeline({
    defaults: {
        ease: "power2.inOut",
    }
})

t2.pause()

const logo = document.querySelector('.header-logo')
const menuItems = document.querySelectorAll('.header-menu li')

const menuItemsText = new SplitType('.main-menu span', {types: 'words, chars'})

t2
.to('.preloader', {
    display: 'none'
})
.from(logo,{
    y:25,
    opacity:0
})
.from(menuItemsText.chars, {
    y: 15,
    opacity:0,
    duration:0.05,
    stagger:.02
}, "<")
.from('.hero-header__img',{
    y:15,
    rotate: '90deg',
    opacity:0,
},'-=.5')
.from('.hero-header span', {
    y: 50,
    opacity:0,
    stagger:.25 
},"<")
.from('.hero-content__img',{
    y:15,
    opacity:0,
    rotate: '90deg'
},'-=.5')
.from('.hero-bottom__content', {
    y: 15,
    opacity:0,
})

t1.eventCallback('onComplete', () => {
    t2.play()
})