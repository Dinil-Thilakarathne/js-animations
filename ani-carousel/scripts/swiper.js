// import Swiper JS
import {Swiper} from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination'


const swiper = new Swiper(".mySwiper", {
    // configure Swiper to use modules
    modules: [ Autoplay, Pagination],
    direction: 'horizontal',
    slidesPerView: 2,
    loop: true,
    spaceBetween: 20,
    delay:1000,
    autoplay: {
        delay: 4500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
    breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 50,
        },
      },
});