
const nav = document.querySelector('.main-nav');
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const carousels = document.querySelectorAll('.carousel-container');


burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            navLinks.classList.remove('nav-active');
        }
    });
});

carousels.forEach(carousel => {
    const slide = carousel.querySelector('.carousel-slide');
    const cards = slide.querySelectorAll('.card');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    
    const cardsToShow = 3;
    const cardWidth = carousel.offsetWidth / cardsToShow;

    cards.forEach(card => {
        card.style.flex = `0 0 ${100/cardsToShow}%`;
        card.style.maxWidth = `${100/cardsToShow}%`;
    });
    
    let currentIndex = 0;
    const maxIndex = Math.max(0, cards.length - cardsToShow);
  
    updateCarousel();

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    function updateCarousel() {
        const translateX = -(currentIndex * (100 / cardsToShow));
        slide.style.transform = `translateX(${translateX}%)`;

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === maxIndex;

        prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
        nextBtn.style.opacity = currentIndex === maxIndex ? '0.3' : '1';

        prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        nextBtn.style.pointerEvents = currentIndex === maxIndex ? 'none' : 'auto';
    }
  
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newCardWidth = carousel.offsetWidth / cardsToShow;
            cards.forEach(card => {
                card.style.flex = `0 0 ${100/cardsToShow}%`;
                card.style.maxWidth = `${100/cardsToShow}%`;
            });
            updateCarousel();
        }, 100);
    });
});

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        const url = card.dataset.url;
        if (url) {
            window.open(url, '_blank');
        }
    });
});

const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        if (email) {
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        }
    });
}