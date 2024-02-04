import './style.css'
import gsap from 'gsap'
import SplitType from 'split-type'

const accordionsWrapper = document.querySelector('.accordion-wrapper')

// accordions data 
const accordionsData = [
  { id: 1, name: "Accordion 01", details: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique, magni! Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, aspernatur." },
  { id: 2, name: "Accordion 02", details: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique, magni! Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, aspernatur." },
  { id: 3, name: "Accordion 03", details: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique, magni! Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, aspernatur." },
  { id: 4, name: "Accordion 04", details: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique, magni! Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, aspernatur." },
]

// create accordions 
accordionsData.forEach((accordion) => {
  const tab = document.createElement('div')
  tab.classList.add('tab')

  const tabHeader = document.createElement('div')
  tabHeader.classList.add('tab-header')
  tabHeader.innerHTML = `<span class="anim-text">${accordion.name} </span>`

  const tabContent = document.createElement('div')
  tabContent.classList.add('tab-content')
  tabContent.textContent = accordion.details

  const tabIcon = document.createElement('span')
  tabIcon.classList.add('tab-icon')

  const divider = document.createElement('div')
  divider.classList.add('tab-divider')

  const dividerOverlay = document.createElement('div')
  dividerOverlay.classList.add('tab-divider__overlay')

  divider.appendChild(dividerOverlay)
  tabHeader.appendChild(tabIcon)

  tab.appendChild(tabHeader)
  tab.appendChild(tabContent)
  tab.appendChild(divider)

  accordionsWrapper.appendChild(tab)
})



const accordionHeaders = document.querySelectorAll('.tab-header')
const accordionContents = document.querySelectorAll('.tab-content')

// console.log(accordionContents);

let currentlyOpenIndex = null;

accordionHeaders.forEach((accordionHeader, index) => {
  accordionHeader.addEventListener('click', () => {
    if (index === currentlyOpenIndex) {
      // Clicking on the already open accordion, so close it
      closeAccordion(accordionContents[index]);
      currentlyOpenIndex = null;
    } else {
      // Clicking on a new accordion, close the currently open one (if any) and open the new one
      if (currentlyOpenIndex !== null) {
        closeAccordion(accordionContents[currentlyOpenIndex]);
      }
      openAccordion(accordionContents[index]);
      currentlyOpenIndex = index;
    }
  });
});

function openAccordion(accordionContent) {
  const tabIcon = accordionContent.parentElement.querySelector('.tab-icon')
  tabIcon.classList.add('active')
  gsap.to(accordionContent, { height: 'auto', duration: 0.25 });
}

function closeAccordion(accordionContent) {
  const tabIcon = accordionContent.parentElement.querySelector('.tab-icon')
  tabIcon.classList.remove('active')
  gsap.to(accordionContent, { height: 0, duration: 0.25 });
}


function cloneElement() {
  const targetELements = document.querySelectorAll('.anim-text')

  targetELements.forEach((target) => {
    const cloneNode = target.cloneNode(true)
    cloneNode.classList.add('cloned-text')
    target.parentElement.appendChild(cloneNode)
  })
}
cloneElement()

function animText(target) {

  let direction = 1

  const mainTextTarget = target.querySelector('.anim-text')
  const clonedTextTarget = target.querySelector('.cloned-text')
  const mainText = new SplitType(mainTextTarget, { types: 'words' })
  const clonedText = new SplitType(clonedTextTarget, { types: 'words' })

  mainText.words.forEach((element) => {
    direction *= -1
    gsap.to(element, {
      yPercent: 100 * direction
    })
  })

  direction == 1 ? direction = -1 : direction = 1
  clonedText.words.forEach((element) => {
    direction *= -1
    gsap.fromTo(element, {
      yPercent: 100 * direction
    }, {
      yPercent: 0
    })
  })
}

const accordionElements = document.querySelectorAll('.tab')

accordionElements.forEach((tab) => {
  tab.addEventListener('mouseenter', (e) => {
    const tabDividerOverlay = e.target.querySelector('.tab-divider__overlay')
    gsap.to(tabDividerOverlay, { width: "100%" })

    animText(e.target)
  })

  tab.addEventListener('mouseleave', (e) => {
    const tabDividerOverlay = e.target.querySelector('.tab-divider__overlay')
    gsap.to(tabDividerOverlay, { width: 0 })
  })
})


