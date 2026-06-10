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
