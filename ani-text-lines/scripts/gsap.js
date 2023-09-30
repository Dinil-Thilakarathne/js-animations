import '../scss/style.scss'
import {gsap} from 'gsap'
import { ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)

const t1 = gsap.timeline({
    scrollTrigger: {
        trigger: '.hero',
        start: '50% 50%',
        end: '150% 50%',
        scrub: true,
        // markers: true,
    }}
)

const animText = document.querySelector('.anim-text-line')
const animTextLTR = document.querySelector('.anim-text-line-ltr')

t1.to(animText, {
    transform: 'rotate(-15deg)',
    y:-200,
    fontSize:'2.5rem',
    duration: 1,
    ease: 'power2.out',
}, 'a').to(animTextLTR, {
    transform: 'rotate(15deg)',
    y:-250,
    fontSize:'2.5rem',
    duration: 1,
    ease: 'power2.out',
},'a')