const form = document.querySelector('.contact-form');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // ஃபார்ம் சப்மிட் ஆகும்போது பேஜ் ரீலோடு ஆகாம தடுக்குது

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
