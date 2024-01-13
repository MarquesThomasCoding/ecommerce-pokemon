let lastScrollPosition = 0;
const navbar = document.querySelector('nav');
const searchSection = document.querySelector('.search-section');
const searchSectionTop = searchSection.computedStyleMap().get('top').value;


const animateNavbar = () => {
    let moveTop = '-60px';
    let searchSectionTop = '60px'

    if(window.innerWidth < 450) {
        moveTop = '-120px';
        searchSectionTop = '120px'
    }
    
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > lastScrollPosition) {
        navbar.style.top = moveTop;
        searchSection.style.top = '0';
    }
    else {
        navbar.style.top = '0';
        searchSection.style.top = searchSectionTop;
    }
    lastScrollPosition = currentScrollPosition;
}

window.addEventListener('scroll', () => {
    animateNavbar();
});