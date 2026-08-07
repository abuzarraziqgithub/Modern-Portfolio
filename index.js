
const navPanel = document.querySelector('.nav-panel');
const hamMenu = document.querySelector('.ham-menu');
const navLinks = Array.from(document.querySelectorAll('.nav-panel a'));
const revealTargets = document.querySelectorAll('.reveal');
const sections = document.querySelectorAll('main section[id]');
const scrollProgress = document.getElementById('scrollProgress');
const cursorGlow = document.getElementById('cursorGlow');
const tiltTargets = document.querySelectorAll('[data-tilt]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

/* ---------- Mobile nav ---------- */

const setNavState = (isOpen) => {
    if (!navPanel || !hamMenu) return;
    navPanel.classList.toggle('active', !isOpen);
    hamMenu.setAttribute('aria-expanded', String(isOpen));
};

if (hamMenu && navPanel) {
    hamMenu.addEventListener('click', () => {
        setNavState(!navPanel.classList.contains('active'));
    });
}

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 768px)').matches) setNavState(false);
    });
});

/* ---------- Scroll spy ---------- */

const navObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            navLinks.forEach((link) => {
                const href = link.getAttribute('href') || '';
                const targetId = href.startsWith('#') ? href.slice(1) : href.split('#')[1];

                if (targetId === entry.target.id) {
                    link.classList.add('is-active');
                } else if (href.startsWith('#') || href.includes('#')) {
                    link.classList.remove('is-active');
                }
            });
        });
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0.1 }
);

sections.forEach((section) => navObserver.observe(section));

/* ---------- Scroll progress ---------- */

const updateProgress = () => {
    if (!scrollProgress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;
    scrollProgress.style.transform = `scaleX(${ratio})`;
};

/* ---------- Cursor glow ---------- */

let glowX = -1000;
let glowY = -1000;
let cursorRaf = null;

const moveGlow = () => {
    if (cursorGlow) {
        cursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
    }
    cursorRaf = null;
};

window.addEventListener('pointermove', (event) => {
    glowX = event.clientX - 260;
    glowY = event.clientY - 260;

    if (cursorGlow && !cursorGlow.classList.contains('is-on')) {
        cursorGlow.classList.add('is-on');
    }

    if (!cursorRaf) {
        cursorRaf = requestAnimationFrame(moveGlow);
    }
}, { passive: true });

/* ---------- 3D tilt ---------- */

const applyTilt = (element, x, y) => {
    const strength = Number(element.dataset.tilt) || 10;
    const rect = element.getBoundingClientRect();
    const px = (x - rect.left) / rect.width - 0.5;
    const py = (y - rect.top) / rect.height - 0.5;
    const rotateX = -py * strength;
    const rotateY = px * strength;
    element.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

const resetTilt = (element) => {
    element.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
};

if (!prefersReducedMotion && !isCoarsePointer) {
    tiltTargets.forEach((element) => {
        element.addEventListener('pointermove', (event) => {
            applyTilt(element, event.clientX, event.clientY);
        });
        element.addEventListener('pointerleave', () => resetTilt(element));
    });
}

/* ---------- Reveal on scroll ---------- */

const setStagger = () => {
    let index = 0;
    revealTargets.forEach((element) => {
        if (index < 12) {
            element.style.setProperty('--reveal-delay', `${index * 70}ms`);
        }
        index += 1;
    });
};

if (prefersReducedMotion) {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
} else {
    setStagger();

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    );

    revealTargets.forEach((element) => revealObserver.observe(element));
}

/* ---------- Scroll handlers ---------- */

const onScroll = () => {
    updateProgress();
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
