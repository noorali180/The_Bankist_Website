'use strict'

// SELECTING ELEMENTS...

const scrollToBtn = document.querySelector('.btn-scroll-to');
const section1 = document.querySelector('#section-1');
const navLinks = document.querySelector('.nav_links');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const tabsContainer = document.querySelector('.operations_tab-container');
const operationTabs = document.querySelectorAll('.operations_tab');
const tabsContent = document.querySelectorAll('.operations_content');
const sections = document.querySelectorAll('.section');
const imageTargets = document.querySelectorAll('img[data-src]');

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const sliderNextBtn = document.querySelector('.slider_btn-right');
const sliderPrevBtn = document.querySelector('.slider_btn-left');

const dotsContainer = document.querySelector('.dots');
// const dots = document.querySelectorAll('.dots_dot');
// SMOOTH SCROLLING...

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

// STICKY NAV...

const stickTheNav = function(entries, observer){
    const [entry] = entries; // could be array of multiple thresholds. (entries)

    if(!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickTheNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${nav.getBoundingClientRect().height}px`,
});

headerObserver.observe(header);

// observing the navbar.
const navObserver = new IntersectionObserver(function(entries, observer){
    const [entry] = entries;
    if(!entry.isIntersecting) nav.classList.add('transform');
    else nav.classList.remove('transform');
}, {
    root: null,
    threshold: 0,
});
navObserver.observe(nav);

// NAV ANIMATION HANDLER...

const animateNav = function(e){
    if(e.target.classList.contains('nav_link')){
        const link = e.target;
        const siblings = e.target.closest('.nav').querySelectorAll('.nav_link');
        const logo = e.target.closest('.nav').querySelector('img');

        siblings.forEach((el) => {
            if(el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
    }
}
nav.addEventListener('mouseover', animateNav.bind(0.5));
nav.addEventListener('mouseout', animateNav.bind(1));

// TABBED COMPONENT IMPLIMENTATION...

tabsContainer.addEventListener('click', function(e){
    e.preventDefault();

    const clicked = e.target.closest('.operations_tab');

    if(!clicked) return;

    // removing active classes from all tabs.
    operationTabs.forEach((tab) => tab.classList.remove('operations_tab-active'));
    // removing active classes from all tab content containers.
    tabsContent.forEach((content) => content.classList.remove('operations_content-active'));

    // adding active class to the target tab.
    clicked.classList.add('operations_tab-active');
    // adding active class to the target content.
    document.querySelector(`.operations_content-${clicked.dataset.tab}`).classList.add('operations_content-active');
});

// REVEAL SECTIONS ON SCROLL...

const revealSections = function(entries){
    const [entry] = entries;

    if(!entry.isIntersecting) return;

    entry.target.classList.remove('section-hidden');
    sectionObserver.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSections, {
    root: null,
    threshold: 0.20,
});
sections.forEach((section) => {
    sectionObserver.observe(section);
    section.classList.add('section-hidden');
});

// LAZY LOADING IMAGES...

const lazyLoadImages = function(entries){
    const [entry] = entries;

    if(!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function(){
        entry.target.classList.remove('lazy-img');
    });

    imgObserver.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(lazyLoadImages, {
    root: null,
    threshold: 0,
    rootMargin: '-200px',
});
imageTargets.forEach((img) => imgObserver.observe(img));

// SLIDER...

const sliderr = function(){
    let curSlide;

    // FUNCTIONALITIES.... >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const createDots = function(){
        slides.forEach((_, i) => {
            dotsContainer.insertAdjacentHTML('beforeend', 
            `
            <div class="dots_dot" data-dot="${i}"></div>
            `);
        });
    }

    const activateDots = function(){
        document.querySelectorAll('.dots_dot').forEach((dot) => {
            dot.classList.remove('dots_dot-active');
        });
        document.querySelector(`.dots_dot[data-dot = "${curSlide}"]`).classList.add('dots_dot-active');
    }

    const goToSlide = function(slide){
        slides.forEach((sl, i) => {
            sl.style.transform = `translateX(${100 * (i-slide)}%)`;
        });
        // 0%, 100%, 200%
        activateDots();
    }

    const init = function(){
        curSlide = 0;
        createDots();
        // to set initial condition. // 0%, 100%, 200%,
        goToSlide(curSlide);
    }
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    init();

    // function to go to next slide..
    const nextSlide = function(){
        if(curSlide === slides.length - 1) curSlide = 0;
        else curSlide++;
        // -100%, 0%, 100%

        goToSlide(curSlide);
    }

    // function to go to previous slide..
    const prevSlide = function(){
        if(curSlide === 0) curSlide = slides.length - 1;
        else curSlide--;
        // 0%, 100%, 200%

        goToSlide(curSlide);
    }

    sliderNextBtn.addEventListener('click', nextSlide);
    sliderPrevBtn.addEventListener('click', prevSlide);
    dotsContainer.addEventListener('click', function(e){
        if (e.target.classList.contains('dots_dot')){
            const slide = +e.target.dataset.dot;
            curSlide = slide;
            goToSlide(curSlide);
        }
    });
}
sliderr();

// SHOW MODAL FUNCTIONALITY...

const modal = document.querySelector('.modal');
const modalShowBtns = document.querySelectorAll('.btn-show-modal');
const modalCloseBtn = document.querySelector('.btn-close-modal');
const overlay = document.querySelector('.overlay');

modalShowBtns.forEach((btn) => {
    btn.addEventListener('click', function(e){
        e.preventDefault();
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    });
});

modalCloseBtn.addEventListener('click', function(e){
    e.preventDefault();

    modal.classList.add('hidden');
    overlay.classList.add('hidden');
})
