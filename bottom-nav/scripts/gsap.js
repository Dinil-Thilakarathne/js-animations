import '../scss/style.scss'
import {gsap} from 'gsap'
import { ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)

const t1 = gsap.timeline()

t1.to('footer', {
    display: 'block',
    opacity: 1,
    duration: .75,
    y:-40,
    scrollTrigger: {
        trigger: '.hero',
        // markers: true,
        start:"50% 50%",
        end:"50%+=40px 50%",
        scrub:true,
        pin:true
    }
})