    const form = document.querySelector('.contact-form');

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
    }); // <-- Notice this bracket! This closes the form code.


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
// NEW ANIMATIONS - SCROLL REVEAL
// =========================================

const revealOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0// Triggers earlier so it works great on mobile screens
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Adds the animation when scrolling down
            entry.target.classList.add('active');
        } else {
            // Removes the animation when you scroll away, so it can play again!
            entry.target.classList.remove('active');
        }
    });
}, revealOptions);

// Automatically apply the reveal animation to all cards
document.querySelectorAll('.glass-card').forEach((card) => {
    card.classList.add('reveal-item');
    scrollObserver.observe(card);
});

// Automatically apply the slide-in effect to all section headers
document.querySelectorAll('.section-header').forEach((header) => {
    header.classList.add('reveal-left');
    scrollObserver.observe(header);
});

// Automatically apply the line drawing effect to all section dividers
document.querySelectorAll('.section-divider').forEach((divider) => {
    divider.classList.add('reveal-scale');
    scrollObserver.observe(divider);
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
