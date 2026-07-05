/* HERO NAV*/
var typed = new Typed('#text',{
    strings:['Data Engineer.', 'Software Developers.', 'Programmer','UI/UX Designer.        '],
    typeSpeed: 100,
    backSpeed:100,
    loop:true,
});


/* SHOW SKILLS*/
let skillBtn = document.querySelector('.skill_btn');
let skillDet = document.querySelector('.about_bottom');

skillBtn.addEventListener('click',() =>{
    skillDet.classList.toggle('show_skill');
});


/* STICKY NAV*/
let nav = document.querySelector('nav');

window.addEventListener('scroll', () =>{
    if(window.scrollY > 100){
        nav.classList.add('sticky_nav');
    }
    else{
        nav.classList.remove('sticky_nav');
    }
});

/*TESTIMONI SWIPER SLIDE*/

var swiper = new Swiper('.testSwiper', {
    slidesPerView:1,
    loop:true,
    autoplay:true,
});

/*FILTERS SLIDER*/
var mixer = mixitup('.portofolio_images');

/*BLOGS SWIPER SLIDE*/

var swiper = new Swiper('.blogSwiper', {
    slidesPerView:1,
    spaceBetween:30,
    loop:true,
    autoplay:true,
    breakpoints:{
        1200:{
            slidesPerView:3,
            spaceBetween:10,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        390:{
            slidesPerView: 1,
            spaceBetween: 30,
        },
    },
});

// SHOW NAV

let bar = document.querySelector('.bars');
let menu = document.querySelector('.menu');

bar.addEventListener('click',()=>{
    menu.classList.toggle('show_nav');
});