// import Swiper JS
import {Swiper} from 'swiper';
// import Swiper styles
import 'swiper/css';


const swiper = new Swiper(".mySwiper", {
    direction: 'horizontal',
    slidesPerView: 2,
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});