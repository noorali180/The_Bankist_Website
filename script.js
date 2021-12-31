'use strict'

// SELECTING ELEMENTS...

const scrollToBtn = document.querySelector('.btn-scroll-to');
const section1 = document.querySelector('#section-1');
const navLinks = document.querySelector('.nav_links');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

// Smooth Scrolling...
scrollToBtn.addEventListener('click', function(e){
    e.preventDefault();

    const s1Coords = section1.getBoundingClientRect();

    window.scrollTo({
        left: s1Coords.left + window.pageXOffset,
        top: s1Coords.top + window.pageYOffset,
        behavior: 'smooth',
    });

});

navLinks.addEventListener('click', function(e){
    e.preventDefault();

    if(e.target.classList.contains('nl')){
        const id = e.target.getAttribute('href');

        document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    }
});
