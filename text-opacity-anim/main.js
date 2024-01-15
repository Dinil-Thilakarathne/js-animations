import './style.scss'
import gsap from 'gsap/all'
import { ScrollTrigger } from 'gsap/all'
import SplitType from 'split-type'
import Lenis from '@studio-freight/lenis'

const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

gsap.registerPlugin(ScrollTrigger)
const animText = new SplitType('.anim', { types: 'words, chars' })

gsap.set(animText.chars, {
  opacity: 0.2
})

gsap.to(animText.chars,{
  opacity:1,
  stagger: .05,
  scrollTrigger: {
    trigger: '.anim',
    start: 'top 50%',
    end: 'bottom 100%',
    scrub: true
  }
})