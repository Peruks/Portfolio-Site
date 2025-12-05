// Neural Network Animation (Advanced Interactive Version)
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
let mouse = { x: null, y: null, radius: 150 };

// Resize Canvas
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initParticles();
}

// Track Mouse Position
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

// Particle Class
class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8; // Slightly faster
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
    }

    update() {
        // Mouse Interaction (Repulsion)
        if (mouse.x != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            if (distance < mouse.radius) {
                this.x -= directionX;
                this.y -= directionY;
            }
        }

        // Normal Movement
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.fillStyle = 'rgba(34, 211, 238, 0.7)'; // Cyan
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize Particles
function initParticles() {
    particles = [];
    const particleCount = Math.floor(width / 10); // Higher density
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update and Draw Particles
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect Particles
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                ctx.beginPath();
                // Dynamic opacity based on distance
                let opacity = 1 - (distance / 120);
                ctx.strokeStyle = `rgba(167, 139, 250, ${opacity * 0.4})`; // Violet connections
                ctx.lineWidth = 0.8;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}



// Start
window.addEventListener('resize', resize);
resize();
animate();

console.log('Advanced Interactive Animation Loaded');

// Typewriter Effect
const quoteText = "“Fresh graduates bring energy. I bring energy + discipline + maturity + commitment.”";
const quoteElement = document.getElementById('quote-text');
let hasTyped = false;

function typeWriter(text, i) {
    if (i < text.length) {
        quoteElement.innerHTML = text.substring(0, i + 1) + '<span class="animate-blink border-r-2 border-cyan-400 ml-1">&nbsp;</span>';
        setTimeout(() => typeWriter(text, i + 1), 50);
    } else {
        quoteElement.innerHTML = text + '<span class="animate-blink border-r-2 border-cyan-400 ml-1">&nbsp;</span>';
    }
}

const quoteObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasTyped) {
            hasTyped = true;
            typeWriter(quoteText, 0);
        }
    });
}, { threshold: 0.5 });

if (quoteElement) {
    quoteObserver.observe(quoteElement);
}

// Spotlight Effect
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));
