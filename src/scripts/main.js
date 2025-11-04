// main.js — интерактивность: скачивание CV, анимации появления (pop/tilt/spring)
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('download-cv');
    const printBtn = document.getElementById('print-btn');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            // собираем печатную версию — тут просто запускаем печать
            window.print();
        });
    }

    if (printBtn) {
        printBtn.addEventListener('click', () => window.print());
    }

    // Intersection animations (pop / tilt / spring)
    const animated = Array.from(document.querySelectorAll('[data-animate]'));
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const t = entry.target;
                    const mode = t.getAttribute('data-animate');
                    if (mode === 'pop') {
                        t.style.transform = 'scale(1.03) rotate(0.6deg)';
                        t.style.transition = 'transform 600ms cubic-bezier(.2,.9,.3,1)';
                        setTimeout(()=> t.style.transform = 'scale(1) rotate(0deg)', 600);
                    } else if (mode === 'tilt') {
                        t.style.transform = 'translateY(-6px) rotate(-1.4deg)';
                        t.style.transition = 'transform 520ms cubic-bezier(.3,.85,.25,1)';
                        setTimeout(()=> t.style.transform = 'translateY(0) rotate(0)', 520);
                    } else if (mode === 'spring') {
                        t.style.transform = 'scale(1.04)';
                        t.style.transition = 'transform 700ms cubic-bezier(.2,1.1,.3,1)';
                        setTimeout(()=> t.style.transform = 'scale(1)', 700);
                    }
                    obs.unobserve(entry.target);
                }
            });
        }, {threshold: 0.2});

        animated.forEach(el => observer.observe(el));
    } else {
        // fallback: just apply a subtle effect
        animated.forEach(t => t.style.opacity = 1);
    }
});
