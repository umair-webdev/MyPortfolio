const progressBar = document.querySelector('.progress-bar');
const loadingScreen = document.querySelector('.loading-screen');
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const mouseLight = document.querySelector('.mouse-light');
const typingText = document.getElementById('typingText');
const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
const sections = Array.from(document.querySelectorAll('main section[id]'));
const commandPalette = document.getElementById('commandPalette');
const commandInput = document.getElementById('commandInput');
const commandButtons = Array.from(document.querySelectorAll('.command-results button'));
const navToggle = document.querySelector('.nav-toggle');
const navLinksContainer = document.querySelector('.nav-links');

const phrases = [
  'Aspiring Front-End Developer',
  'Building responsive experiences',
  'Learning Python & Linux',
  'Exploring Cybersecurity'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const current = phrases[phraseIndex];
  typingText.textContent = current.slice(0, charIndex);

  if (!isDeleting && charIndex < current.length) {
    charIndex += 1;
  } else if (isDeleting && charIndex > 0) {
    charIndex -= 1;
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  const speed = isDeleting ? 50 : 90;
  setTimeout(typeEffect, speed);
}

function updateProgress() {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? scrollTop / height : 0;
  progressBar.style.transform = `scaleX(${progress})`;
}

function revealSections() {
  document.querySelectorAll('.reveal').forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight - 90) {
      element.classList.add('visible');
    }
  });
}

function updateActiveLink() {
  let current = sections[0]?.id || '';
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 140) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

function openPalette() {
  commandPalette.classList.add('is-open');
  commandInput.focus();
  commandInput.value = '';
}

function closePalette() {
  commandPalette.classList.remove('is-open');
}

function handleMouseMove(event) {
  const x = event.clientX;
  const y = event.clientY;
  cursorDot.style.left = `${x}px`;
  cursorDot.style.top = `${y}px`;
  cursorRing.style.left = `${x}px`;
  cursorRing.style.top = `${y}px`;
  mouseLight.style.left = `${x}px`;
  mouseLight.style.top = `${y}px`;
}

function handleMouseLeave() {
  cursorDot.style.opacity = '0';
  cursorRing.style.opacity = '0';
  mouseLight.style.opacity = '0';
}

function handleMouseEnter() {
  cursorDot.style.opacity = '1';
  cursorRing.style.opacity = '1';
  mouseLight.style.opacity = '1';
}

function toggleMobileNav() {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navLinksContainer.classList.toggle('is-open');
}

function scrollToSection(targetId) {
  const target = document.getElementById(targetId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

window.addEventListener('load', () => {
  setTimeout(() => loadingScreen.classList.add('is-hidden'), 900);
});

window.addEventListener('scroll', () => {
  updateProgress();
  revealSections();
  updateActiveLink();
});

window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('mouseleave', handleMouseLeave);
window.addEventListener('mouseenter', handleMouseEnter);
window.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    openPalette();
  }

  if (event.key === 'Escape' && commandPalette.classList.contains('is-open')) {
    closePalette();
  }
});

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href').slice(1);
    event.preventDefault();
    scrollToSection(targetId);
  });
});

commandButtons.forEach((button) => {
  button.addEventListener('click', () => {
    scrollToSection(button.dataset.target);
    closePalette();
  });
});

commandPalette.addEventListener('click', (event) => {
  if (event.target === commandPalette) {
    closePalette();
  }
});

navToggle.addEventListener('click', toggleMobileNav);

updateProgress();
revealSections();
updateActiveLink();
typeEffect();
