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

// Particle Class (Math & Code Symbols)
const symbols = ['Σ', 'λ', '∫', '≠', '∞', 'π', 'θ', '√', '{ }', '</>', '[]', 'f(x)', '∇', '∃', '∀'];

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.velocity = Math.random() * 0.5 + 0.1; // Slow upward float
        this.size = Math.floor(Math.random() * 20) + 14; // Font size 14-34px
        this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
        this.baseX = this.x;
        this.baseY = this.y;
        this.opacity = 0; // Start invisible
        this.fadeSpeed = Math.random() * 0.01 + 0.005;
        this.fadingIn = true;
        this.color = Math.random() > 0.5 ? '#FACC15' : '#3B82F6'; // Gold or Blue
    }

    update() {
        // Mouse Interaction (Subtle disturbance)
        if (mouse.x != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                const angle = Math.atan2(dy, dx);
                this.x -= Math.cos(angle) * force * 2;
                this.y -= Math.sin(angle) * force * 2;
            }
        }

        // Floating Movement
        this.y -= this.velocity;
        this.x += Math.sin(this.y * 0.01) * 0.5; // Slight wave

        // Reset if off screen
        if (this.y < -50) {
            this.y = height + 50;
            this.x = Math.random() * width;
            this.opacity = 0;
            this.fadingIn = true;
        }

        // Fade In / Fade Out Logic
        if (this.fadingIn) {
            this.opacity += this.fadeSpeed;
            if (this.opacity >= 0.6) { // Max opacity
                this.opacity = 0.6;
                this.fadingIn = false;
            }
        } else {
            this.opacity -= this.fadeSpeed * 0.5; // Fade out slower
            if (this.opacity <= 0) {
                this.opacity = 0;
                this.fadingIn = true;
                this.y = height + 50; // Reset position
                this.x = Math.random() * width;
            }
        }
    }

    draw() {
        ctx.font = `${this.size}px 'Courier New', monospace`; // Monospace for code look
        ctx.fillStyle = this.color;

        // Optional Blur Effect for "dreamy" look
        // ctx.filter = 'blur(1px)'; 

        ctx.globalAlpha = this.opacity;
        ctx.fillText(this.symbol, this.x, this.y);
        ctx.globalAlpha = 1.0; // Reset
        ctx.filter = 'none';
    }
}

// Initialize Particles
function initParticles() {
    particles = [];
    const particleCount = Math.floor(width / 20); // Lower density for cleaner look
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
        // No connections - purely symbols floating
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
