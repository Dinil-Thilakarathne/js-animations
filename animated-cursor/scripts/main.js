import '../scss/style.scss'
import { gsap } from 'gsap';

var cursor = document.querySelector('.cursor'),
    cursorScale = document.querySelectorAll('.cursor-scale'),
    mouseX = 0,
    mouseY = 0

gsap.to({}, 0.016, {
    repeat: -1,
    duration: 1,
    ease: 'power2.ease',

    onRepeat: function () {
        gsap.set(cursor, {
            css: {
                left: mouseX,
                top: mouseY
            },
            ease: 'slow(0.7, 0.7, false)',
            delay: 0.05
        })
    }
});

window.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY
});
window.addEventListener("mouseout", () => {
    cursor.classList.add("hidden");
})
window.addEventListener("mouseover", () => {
    cursor.classList.remove("hidden");
})

cursorScale.forEach(link => {
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('grow');
        cursor.classList.remove('grow-small');
    });
    link.addEventListener('mousemove', () => {
        cursor.classList.add('grow');
        if(link.classList.contains('small')){
            cursor.classList.remove('grow');
            cursor.classList.add('grow-small');
        }
    });
});

const btn = document.querySelector('.btn')

btn.addEventListener('mouseover', () => {
    btn.classList.add('cursor-btn')
    cursor.classList.add('btn-hidden')
})
btn.addEventListener('mouseout', () => {
    btn.classList.remove('cursor-btn')
    cursor.classList.remove('btn-hidden')
})