const scriptURL = 'https://script.google.com/macros/s/AKfycbzFfxeE-lJyrOBTgRqyvK0KKPfgVv-gM3C1YBDgVgSHOUuBLaap7gTgkRDmaRXhtvDu/exec'; // Replace with your Google Apps Script Web app URL
const form = document.forms['rsvp-form'];

form.addEventListener('submit', e => {
    e.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    const formMessage = document.getElementById('form-message');
    submitButton.disabled = true;

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                formMessage.style.display = 'block';
                formMessage.textContent = 'Тілегіңіз сәтті жіберілді!';
                form.reset();
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 3000);
            } else {
                formMessage.style.display = 'block';
                formMessage.textContent = 'Қателік пайда болды. Қайтадан көріңіз.';
            }
            submitButton.disabled = false;
        })
        .catch(error => {
            console.error('Error!', error.message);
            formMessage.style.display = 'block';
            formMessage.textContent = 'Қателік пайда болды. Қайтадан көріңіз.';
            submitButton.disabled = false;
        });
});

// Existing music toggle code (if present)
const music = document.getElementById('wedding-music');
const musicBtn = document.getElementById('music-toggle');
musicBtn.addEventListener('click', () => {
    if (music.muted) {
        music.muted = false;
        musicBtn.textContent = '🔊';
    } else {
        music.muted = true;
        musicBtn.textContent = '🎵';
    }
});

//https://script.google.com/macros/s/AKfycbzQIz182fbtTY5VY0jBlCVaRbMW6gHz0MABgW8rdYZbUH28w9KY4CzbOVYHW6_EJKw/exec