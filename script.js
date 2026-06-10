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
    threshold: 0.15 // Triggers when 15% of the card is visible on screen
};

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

// Automatically apply the reveal animation to all your glass cards
document.querySelectorAll('.glass-card').forEach((card) => {
    card.classList.add('reveal-item');
    scrollObserver.observe(card);
});

// Automatically apply the slide-in effect to all section headers
document.querySelectorAll('.section-header').forEach((header) => {
    header.classList.add('reveal-left');
    scrollObserver.observe(header); // Reuses the observer we created earlier
});

// Automatically apply the line drawing effect to all section dividers
document.querySelectorAll('.section-divider').forEach((divider) => {
    divider.classList.add('reveal-scale');
    scrollObserver.observe(divider); // Reuses the observer we created earlier
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
