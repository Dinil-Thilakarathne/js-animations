import '../scss/style.scss'
import {gsap} from 'gsap'
import { ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)
import SplitType from 'split-type'

var t1 = gsap.timeline({scrollTrigger:{
    trigger:"body",
    // markers:true,
    start:"50% 50%",
    end:"150% 50%",
    scrub:2,
    pin:true
}});



const boxes = document.querySelectorAll('.box');
console.log(boxes);

boxes.forEach((box) => {
    t1.from(box, {
        display: 'none',
        y:'100%',
        opacity: .2,
        duration: 2,
        ease: 'power2.out'
    })

    
})
