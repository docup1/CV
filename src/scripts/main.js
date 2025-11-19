(function() {
    const PREPOSITIONS = [
        "в","и","к","с","у","о","а","но",
        "от","до","на","по","под","при","про",
        "над","без","для","из"
    ];

    // Теги, внутри которых НЕ нужно менять текст
    const EXCLUDE_TAGS = new Set([
        "SCRIPT","STYLE","CODE","PRE","KBD","SAMP","TEXTAREA","OPTION","NOSCRIPT","SVG"
    ]);

    // Построим регулярку: захватываем возможный ведущий пробел/начало строки, затем предлог, затем пробелы
    // Пример замены: " в дом" -> " в дом" (тут мы сохраняем ведущий пробел, заменяем обычный пробел после предлога на NBSP)
    const re = new RegExp(`(^|\\s)(${PREPOSITIONS.join("|")})(\\s+)`, "gi");

    function isExcluded(node) {
        let p = node.parentNode;
        while (p && p.nodeType === 1) {
            if (EXCLUDE_TAGS.has(p.tagName)) return true;
            p = p.parentNode;
        }
        return false;
    }

    function processTextNode(node) {
        if (!node || !node.nodeValue) return;
        const original = node.nodeValue;
        // пропускаем короткие и пустые узлы
        if (original.trim().length < 2) return;

        const replaced = original.replace(re, (match, lead, prep, spaces) => {
            // lead — ведущая пробельная последовательность или начало строки
            // prep — сам предлог (с точным регистром из текста)
            // мы должны вернуть lead + prep + NBSP (но не потерять lead)
            return lead + prep + "\u00A0";
        });

        if (replaced !== original) node.nodeValue = replaced;
    }

    function walkAndFix(root = document.body) {
        if (!root) return;
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (walker.nextNode()) {
            node = walker.currentNode;
            if (isExcluded(node)) continue;
            processTextNode(node);
        }
    }

    // Запустить при загрузке DOM
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => walkAndFix(document.body));
    } else {
        walkAndFix(document.body);
    }

    // Опционально: отслеживаем динамически добавленные узлы (SPA). Можно убрать, если не нужен.
    const observer = new MutationObserver(mutations => {
        for (const m of mutations) {
            // новые узлы
            if (m.addedNodes && m.addedNodes.length) {
                m.addedNodes.forEach(n => {
                    if (n.nodeType === 3) { // текстовый узел
                        if (!isExcluded(n)) processTextNode(n);
                    } else if (n.nodeType === 1) { // элемент
                        if (!EXCLUDE_TAGS.has(n.tagName)) walkAndFix(n);
                    }
                });
            }
            // изменённые текстовые узлы внутри существующих элементов
            if (m.type === "characterData" && m.target) {
                const t = m.target;
                if (t.nodeType === 3 && !isExcluded(t)) processTextNode(t);
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
    });

    // Экспорт функции (если нужно вызвать вручную в консоли)
    window.fixHungPrepositions = () => walkAndFix(document.body);
})();




// ===================== ПАРТИКЛЫ (ФОН) =====================
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const particles = [];
const colors = ['#00f0ff', '#ff006e', '#8b5cf6', '#00ff88'];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.hypot(dx, dy);
            if (dist < 120) {
                ctx.strokeStyle = `rgba(0,240,255,${1 - dist / 120})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
}
animate();

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});


// ===================== КУРСОР — СИЯНИЕ =====================
document.addEventListener('mousemove', e => {
    const glow = document.querySelector('.cursor-glow');
    if (!glow) return;
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});
