import '../scss/style.scss'
import {gsap, ScrollTrigger} from 'gsap/all'
import SplitType from 'split-type'
gsap.registerPlugin(ScrollTrigger)

const t1 = gsap.timeline({
    scrollTrigger: {
        trigger: '.loader',
        start: '50% 50%',
        end: '150% 50%',
        scrub: true,
        markers: true,
    }}
)


const loaderHeader = new SplitType('.loader-header', {types: 'chars'})

gsap.from(loaderHeader.chars, {
    y:100,
    duration: .25,
    fontSize: 0,
    opacity: 0,
    ease: 'power2.out',
    stagger: .1
})