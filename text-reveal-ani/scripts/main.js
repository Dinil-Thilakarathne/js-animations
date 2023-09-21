import '../scss/style.scss'
import gsap from 'gsap'
import SplitType from 'split-type'

// Split text into words and characters
const headerText = new SplitType('.main .header', { types: 'chars' })
const descriptionText = new SplitType('.main .description', { types: 'words' })
const cdnBtnText = new SplitType('.main .cdn-btn', { types: 'words' })
const linkBtnText = new SplitType('.main .link-btn', { types: 'words' })

const t1 = gsap.timeline()
// Animate characters into view with a stagger effect
t1.from(headerText.chars, {
  opacity: 0,
  y: 40,
  duration: 0.5,
  stagger: { amount: 0.5 },
}).from(descriptionText.words, {
  opacity: 0,
  y: 40,
  duration: 0.5,
  stagger: { amount: 0.5 },
},'-=.5').from('.cdn-btn', {
  opacity: 0,
  y: 40,
  duration: 0.5,
  stagger: { amount: 0.5 },
},'-=.5').from(cdnBtnText.words, {
  opacity: 0,
  y: 40,
  duration: 0.5,
  stagger: { amount: 0.5 },
},'-=.5').from('.link-btn', {
  opacity: 0,
  y: 40,
  duration: 0.5,
  stagger: { amount: 0.5 },
},'-=.65').from(linkBtnText.words, {
  opacity: 0,
  y: 40,
  duration: 0.5,
  stagger: { amount: 0.5 },
},'-=.75')