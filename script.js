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

// Sticky Nav...
const stickTheNav = function(entries, observer){
    const [entry] = entries;

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

// Tabbed component implementation...
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

// Reveal sections on scroll...
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

// Lazy loading images...
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
