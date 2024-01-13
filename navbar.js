let lastScrollPosition = 0;
const navbar = document.querySelector('nav');


const animateNavbar = () => {
    let moveTop = '-60px';

    if(window.innerWidth < 450) {
        moveTop = '-120px';
    }
    
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > lastScrollPosition) {
        navbar.style.top = moveTop;
    }
    else {
        navbar.style.top = '0';
    }
    lastScrollPosition = currentScrollPosition;
}

window.addEventListener('scroll', () => {
    animateNavbar();
});