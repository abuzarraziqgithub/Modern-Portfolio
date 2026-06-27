
const navPanel = document.querySelector('.nav-panel');
const hamMenu = document.querySelector('.ham-menu');
const navLinks = Array.from(document.querySelectorAll('.nav-panel a'));
const revealTargets = document.querySelectorAll('.reveal');
const sections = document.querySelectorAll('main section[id]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const setNavState = (isOpen) => {
    if (!navPanel || !hamMenu) {
        return;
    }

    navPanel.classList.toggle('active', !isOpen);
    hamMenu.setAttribute('aria-expanded', String(isOpen));
};

if (hamMenu && navPanel) {
    hamMenu.addEventListener('click', () => {
        const isOpen = navPanel.classList.contains('active');
        setNavState(isOpen);
    });
}

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 768px)').matches) {
            setNavState(false);
        }
    });
});

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }

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
}, {
    rootMargin: '-45% 0px -45% 0px',
    threshold: 0.1,
});

sections.forEach((section) => navObserver.observe(section));

if (prefersReducedMotion) {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
} else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.12,
    });

    revealTargets.forEach((element) => revealObserver.observe(element));
}