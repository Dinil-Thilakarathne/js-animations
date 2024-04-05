import './style.css'
import gsap from 'gsap'


document.addEventListener('DOMContentLoaded', function () {

  const animProjectImgWrapper = document.querySelector('.anim-project__img-wrapper')
  const animProjectImgs = document.querySelectorAll('.anim-project__img')
  const projects = document.querySelectorAll('.project')
  const projectWrapper = document.querySelector('.project-gallery__wrapper')

  let mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {

    function mouseEnter() {
      gsap.to(animProjectImgWrapper, { scale: 1 })
    }
    function mouseLeave() {
      gsap.to(animProjectImgWrapper, { scale: 0 })
    }

    projectWrapper.addEventListener('mouseenter', mouseEnter)
    projectWrapper.addEventListener('mouseleave', mouseLeave)


    projects.forEach((project) => {
      project.addEventListener('mouseenter', () => {
        let scrollPercent = project.getAttribute('data-scroll')
        let imgHeight = document.querySelector('.anim-project__img').clientHeight
        let gap = 32
        let scrollY = imgHeight * -1 * scrollPercent - gap * scrollPercent

        gsap.to(animProjectImgs, {
          y: scrollY,
          ease: "sine.in",
        })
      })
    })

    let mouseXPosition;
    let mouseYPosition;
    let offsetX = (animProjectImgWrapper.clientWidth / 2)
    let offsetY = (animProjectImgWrapper.clientHeight / 2)
    let delay = 0.3

    function trackCursor(e) {
      // Check if the event object exists
      mouseXPosition = e.clientX - offsetX;
      mouseYPosition = e.clientY - offsetY;

      gsap.to(animProjectImgWrapper, {
        top: mouseYPosition,
        left: mouseXPosition,
        ease: 'none',
        duration: delay
      });
    }

    function resetAnimation() {
      gsap.to([animProjectImgs, animProjectImgWrapper], {
        clearProps: "all"
      });
    }
    projectWrapper.addEventListener('mousemove', trackCursor)
    projectWrapper.addEventListener('mouseleave', resetAnimation)

    return () => {
      projectWrapper.removeEventListener('mouseenter', mouseEnter)
      projectWrapper.removeEventListener('mousemove', trackCursor)
    };
  });

  window.addEventListener('resize', gsap.matchMediaRefresh())
})
