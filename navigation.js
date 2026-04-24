document.addEventListener('DOMContentLoaded', () => {
    // List of slides in order
    const slides = [
        'index.html',
        'slide2.html',
        'slide3.html',
        'propuestas.html',
        'slide4.html',
        'slide5.html',
        'estrategias.html',
        'conclusion.html'
        // Add more slides here
    ];

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentIndex = slides.indexOf(currentPath);

    function goToNextSlide() {
        if (currentIndex < slides.length - 1) {
            document.body.style.animation = 'slideOutLeft 0.5s forwards';
            setTimeout(() => {
                window.location.href = slides[currentIndex + 1];
            }, 500);
        }
    }

    function goToPrevSlide() {
        if (currentIndex > 0) {
            document.body.style.animation = 'slideInRight 0.5s reverse forwards';
            setTimeout(() => {
                window.location.href = slides[currentIndex - 1];
            }, 500);
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
            goToNextSlide();
        } else if (e.key === 'ArrowLeft') {
            goToPrevSlide();
        }
    });

    // Touch navigation (Swipe)
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const threshold = 50;
        if (touchStartX - touchEndX > threshold) {
            // Swiped left -> Next
            goToNextSlide();
        } else if (touchEndX - touchStartX > threshold) {
            // Swiped right -> Prev
            goToPrevSlide();
        }
    }

    // Click to next (useful for mobile if no swipe)
    document.body.addEventListener('dblclick', () => {
        goToNextSlide();
    });
});
