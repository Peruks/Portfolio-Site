// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = navLinks.classList.contains('active') ? 'x' : 'menu';
    mobileMenuBtn.innerHTML = `<i data-lucide="${icon}"></i>`;
    lucide.createIcons();
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Digital Data Matrix Animation
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let matrixColumns = [];
let particles = [];

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initMatrix();
    initParticles();
}

window.addEventListener('resize', resizeCanvas);

// Matrix Rain Effect
const fontSize = 14;
const chars = '01';

function initMatrix() {
    const columns = Math.floor(width / fontSize);
    matrixColumns = [];
    for (let i = 0; i < columns; i++) {
        matrixColumns[i] = Math.random() * height; // Start at random heights
    }
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 240, 255, 0.05)';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < matrixColumns.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, matrixColumns[i] * fontSize);

        if (matrixColumns[i] * fontSize > height && Math.random() > 0.975) {
            matrixColumns[i] = 0;
        }
        matrixColumns[i]++;
    }
}

// Neural Particles
class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.fillStyle = '#00f0ff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const particleCount = Math.floor(width / 15); // Density
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function drawParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 - distance / 800})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    // Fade effect for trails
    ctx.fillStyle = 'rgba(3, 7, 18, 0.1)';
    ctx.fillRect(0, 0, width, height);

    drawMatrix();
    drawParticles();

    requestAnimationFrame(animate);
}

// Initialize
resizeCanvas();
animate();
