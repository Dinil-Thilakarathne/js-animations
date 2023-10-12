import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Cursor = () => {
    const cursorRef = useRef(null);
    const cursorScaleRefs = useRef([]);
    const projects  = document.querySelectorAll('.project')
  
    useEffect(() => {
      // Your GSAP animation code
      var cursor = cursorRef.current;
      var cursorScale = cursorScaleRefs.current;
      var mouseX = 0;
      var mouseY = 0;
  
      gsap.to({}, 0.016, {
        repeat: -1,
        duration: 1,
        ease: 'power2.ease',
        onRepeat: function () {
          gsap.set(cursor, {
            css: {
              left: mouseX,
              top: mouseY,
            },
            ease: 'slow(0.7, 0.7, false)',
            delay: 0.05,
          });
        },
      });
  
      window.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      projects.forEach((project) => {
        project.addEventListener('mouseover', () => {
            cursor.classList.remove('hidden');
        });
        project.addEventListener('mouseout', () => {
              cursor.classList.add('hidden');
       });
        
      })
  
  
    //   cursorScale.forEach((link) => {
    //     link.addEventListener('mouseleave', () => {
    //       cursor.classList.remove('grow');
    //       cursor.classList.remove('grow-small');
    //     });
    //     link.addEventListener('mousemove', () => {
    //       cursor.classList.add('grow');
    //       if (link.classList.contains('small')) {
    //         cursor.classList.remove('grow');
    //         cursor.classList.add('grow-small');
    //       }
    //     });
    //   });
  
    //   const btn = document.querySelector('.btn');
  
    //   btn.addEventListener('mouseover', () => {
    //     btn.classList.add('cursor-btn');
    //     cursor.classList.add('btn-hidden');
    //   });
  
    //   btn.addEventListener('mouseout', () => {
    //     btn.classList.remove('cursor-btn');
    //     cursor.classList.remove('btn-hidden');
    //   });
    }, []);
  
    return (
        <div ref={cursorRef} className="cursor hidden">
             <svg data-v-72a5aa4a="" viewBox="0 0 10 10" fill="#eee" xmlns="http://www.w3.org/2000/svg" className="arrow-svg" width="32px" height="32px">
                <path data-v-72a5aa4a="" d="M9.21969 0.747192L1.86969 0.747192V2.12719H6.72969L0.804687 8.05219L1.88469 9.13219L7.80969 3.23719V8.09719H9.21969V0.747192Z" fill="#eee"></path>
              </svg>
        </div>
    );
  };
  
  export default Cursor;
  