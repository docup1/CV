const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const particles = [];
const colors = ['#00f0ff','#ff006e','#8b5cf6','#00ff88'];
class Particle {
    constructor(){
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.size = Math.random()*3+1;
        this.speedX = Math.random()*2-1;
        this.speedY = Math.random()*2-1;
        this.color = colors[Math.floor(Math.random()*colors.length)];
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if(this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill();
    }
}
for(let i=0;i<80;i++) particles.push(new Particle());

function connectParticles(){
    for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.hypot(dx,dy);
            if(dist < 120){
                ctx.strokeStyle = `rgba(0,240,255,${1-dist/120})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=> {p.update();p.draw();});
    connectParticles();
    requestAnimationFrame(animate);
}
animate();
addEventListener('resize',()=>{canvas.width=innerWidth;canvas.height=innerHeight;});

document.addEventListener('mousemove', e => {
    document.querySelector('.cursor-glow').style.left = e.clientX + 'px';
    document.querySelector('.cursor-glow').style.top = e.clientY + 'px';
});

document.querySelectorAll('article').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.transform = `translateY(-20px) rotateX(${(rect.height/2-y)/10}deg) rotateY(${(rect.width/2-x)/10}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
});