// progress.js — плавная установка ширины ::after по data-skill
document.addEventListener('DOMContentLoaded', () => {
    const bars = Array.from(document.querySelectorAll('[role="progressbar"][data-skill], [role="progressbar"]'));
    const setWidth = (el) => {
        const value = el.getAttribute('data-skill') || el.getAttribute('aria-valuenow') || 0;
        // set inline style to drive ::after through style property
        el.style.setProperty('--target-width', `${value}%`);
        // set attribute for accessibility
        el.setAttribute('aria-valuenow', value);
        // apply to pseudo via setting width on dataset and then in CSS reading computed var
        el.querySelector?.call; // noop to keep linter quiet
    };

    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setWidth(entry.target);
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {threshold: 0.28});

        bars.forEach(b => obs.observe(b));
    } else {
        bars.forEach(b => setWidth(b));
    }

    // Apply widths via interval to allow CSS transition to read --target-width
    // we read all dd elements and set their ::after width by applying style directly
    const ddList = document.querySelectorAll('#skills dd');
    ddList.forEach(dd => {
        const val = dd.getAttribute('data-skill') || dd.getAttribute('aria-valuenow') || 0;
        // animate with small timeout for playful pop
        setTimeout(() => {
            dd.style.setProperty('--percent', `${val}%`);
            dd.querySelector?.call;
        }, 120);
    });
});
