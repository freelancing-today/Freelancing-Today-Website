document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.site-nav');
    const revealItems = document.querySelectorAll('.reveal');
    const counters = document.querySelectorAll('[data-counter]');
    const form = document.querySelector('.contact-form');
    const formNote = document.querySelector('.form-note');

    const syncNav = () => {
        nav.classList.toggle('is-scrolled', window.scrollY > 10);
    };

    syncNav();
    window.addEventListener('scroll', syncNav, { passive: true });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.18 });

    revealItems.forEach((item) => observer.observe(item));

    counters.forEach((counter) => {
        const target = Number(counter.dataset.counter);
        const duration = 1200;
        const start = performance.now();

        const animate = (time) => {
            const progress = Math.min((time - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.round(target * eased);

            if (progress < 1) {
                window.requestAnimationFrame(animate);
            }
        };

        window.requestAnimationFrame(animate);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        formNote.textContent = 'Thanks. Your message is ready for the next step.';
        form.reset();
    });
});