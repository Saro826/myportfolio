const form = document.querySelector('.contact-form');

// Form intha page-la iruntha mattum intha action run aaganum nu check pandrom
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                window.location.href = "https://saro826.github.io/myportfolio/thanks.html";
            } else {
                console.log(response);
                alert(json.message);
            }
        })
        .catch(error => {
            console.log(error);
            alert("Something went wrong!");
        });
    });
}
    // --- Theme Toggle Logic (Now safely outside the form code) ---
    const themeToggle = document.getElementById('theme-toggle');

    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) {
            themeToggle.textContent = '☀️';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');

            let theme = 'light';
            if (document.body.classList.contains('dark-mode')) {
                theme = 'dark';
                themeToggle.textContent = '☀️';
            } else {
                themeToggle.textContent = '🌙';
            }

            localStorage.setItem('theme', theme);
        });
    }

// =========================================
// 3. PREMIUM MOTION ANIMATIONS (STAGGERED)
// =========================================
const motionOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // 10% card therinjalum animation start aagidum
};

const motionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            // Scroll panni mela pogum pothu thirumba hide aagidum (repeat aaga)
            entry.target.classList.remove('active');
        }
    });
}, motionOptions);

// Grid-kulla irukka cards-ah kandupudichu, onnu pinnaadi onna (delay) varamaari set pandrom
document.querySelectorAll('.skills-grid, .projects-grid, .edu-grid, .cert-list').forEach(grid => {
    const cards = grid.querySelectorAll('.glass-card');

    cards.forEach((card, index) => {
        card.classList.add('motion-card');
        // Ovvoru card-kum 150ms delay set pandrom (1st card odane varum, 2nd card konjam late-a varum)
        card.style.transitionDelay = `${index * 150}ms`;
        motionObserver.observe(card);
    });
});

// Headers matrum dividers-ku normal slide animation
document.querySelectorAll('.section-header').forEach((header) => {
    header.classList.add('reveal-left');
    motionObserver.observe(header);
});

document.querySelectorAll('.section-divider').forEach((divider) => {
    divider.classList.add('reveal-scale');
    motionObserver.observe(divider);
});

// Single glass cards (like Experience blocks)
document.querySelectorAll('.exp-block, .contact-link, .contact-form').forEach((block) => {
    block.classList.add('motion-card');
    block.style.transitionDelay = '100ms';
    motionObserver.observe(block);
});

// =========================================
// NAVBAR SCROLL EFFECT
// =========================================
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});
// =========================================
// TYPEWRITER EFFECT
// =========================================
const textArray = ["Aspiring Network Engineer"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

const typedTextSpan = document.getElementById("typewriter-text");
function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}
function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}
document.addEventListener("DOMContentLoaded", function() {
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});
