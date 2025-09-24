// ================================
// Прокрутка страницы и прогресс-бар
// ================================
function updateProgressBar() {
    // Вычисляем процент прокрутки страницы
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = scrolled + '%';
    }
}

// ====================================
// Анимация появления секций при скролле
// ====================================
function animateOnScroll() {
    const sections = document.querySelectorAll('section');
    const triggerHeight = window.innerHeight * 0.8;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY > sectionTop - triggerHeight && window.scrollY < sectionBottom) {
            section.classList.add('visible'); // Добавляем класс для анимации
        }
    });
}

// ================================
// Обновление активного состояния точек навигации
// ================================
function updateNavDots() {
    const sections = ['hero', 'about', 'experience', 'skills', 'interests', 'contact'];
    const navDots = document.querySelectorAll('.nav-dot');
    const scrollPos = window.scrollY + window.innerHeight * 0.1; // Немного смещаем для точности

    sections.forEach((sectionId, index) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            if (scrollPos >= top && scrollPos <= bottom) {
                navDots.forEach(dot => dot.classList.remove('active'));
                if (navDots[index]) navDots[index].classList.add('active');
            }
        }
    });
}

// ================================
// Плавная прокрутка при клике на точки навигации
// ================================
document.querySelectorAll('.nav-dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
        const sections = ['hero', 'about', 'experience', 'skills', 'interests', 'contact'];
        const targetSection = document.getElementById(sections[index]);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ================================
// Плавная прокрутка для кнопок CTA
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ================================
// Скрытие/появление хедера при скролле
// ================================
function toggleHeader() {
    const header = document.querySelector("header");
    const about = document.getElementById("about");
    if (!header || !about) return;

    const scrollPos = window.scrollY;

    if (scrollPos >= about.offsetTop - 100) {
        header.classList.add("hidden"); // Скрываем хедер
    } else {
        header.classList.remove("hidden"); // Показываем хедер
    }
}

// ================================
// Параллакс эффект для hero секции
// ================================
function parallaxHero() {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const scrolled = window.scrollY;
    hero.style.transform = `translateY(${scrolled * 0.5}px)`; // Смещение фона
}

// ================================
// Объединенный обработчик скролла для оптимизации
// ================================
function onScrollHandler() {
    updateProgressBar();
    animateOnScroll();
    updateNavDots();
    toggleHeader();
    parallaxHero();
}

// ================================
// Инициализация при загрузке страницы
// ================================
window.addEventListener('scroll', onScrollHandler);
window.addEventListener('load', () => {
    onScrollHandler(); // Анимации и состояния при загрузке
});


