// import Swiper JS
import {Swiper} from 'swiper';
import { Autoplay } from 'swiper/modules';
// import Swiper styles
import 'swiper/css';


const swiper = new Swiper(".mySwiper", {
    // configure Swiper to use modules
    modules: [ Autoplay],
    direction: 'horizontal',
    slidesPerView: 2,
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});