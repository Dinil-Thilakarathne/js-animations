import '../scss/style.scss'
import {gsap, ScrollTrigger} from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.box',
        start: 'top 70%',
        end: 'top 40%',
        scrub: true,
        markers: true,
    }}
)
const boxes = gsap.utils.toArray('.box')
console.log(boxes);

boxes.forEach(box => {
    tl.to(box, {
        height: '100vh',
        width: '100vw',
        duration:1,
        stagger:.5,
        scrollTrigger: {
            // trigger: box
        }
    })
})


