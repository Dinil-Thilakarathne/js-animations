import '../scss/style.scss'
import {gsap} from 'gsap'
import { ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)


const tl = gsap.timeline({scrollTrigger:{
    trigger:".anim-img",
    // markers:true,
    start:"50% 50%",
    end:"150% 50%",
    scrub:2,
    pin:true
}});


tl.to('.anim-img', {
    scale: 4
})