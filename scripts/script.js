(function () {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    let today = new Date(),
        yyyy = today.getFullYear(),
        birthday = new Date(`${yyyy}-08-29T19:00:00`);

    if (today > birthday) {
        birthday = new Date(`${yyyy + 1}-08-29T19:00:00`);
    }

    const countDown = birthday.getTime(),
        x = setInterval(function () {
            const now = new Date().getTime(),
                distance = countDown - now;

            document.getElementById("days").innerText = Math.floor(distance / day);
            document.getElementById("hours").innerText = Math.floor((distance % day) / hour);
            document.getElementById("minutes").innerText = Math.floor((distance % hour) / minute);
            document.getElementById("seconds").innerText = Math.floor((distance % minute) / second);

            if (distance < 0) {
                document.getElementById("headline").innerText = "It's time!";
                document.getElementById("countdown").style.display = "none";
                document.getElementById("content").style.display = "block";
                clearInterval(x);
            }
        }, 1000);
})();

// Music toggle logic
const music = document.getElementById('wedding-music');
const toggleBtn = document.getElementById('music-toggle');
music.muted = false;
music.play();

toggleBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        toggleBtn.textContent = '🎵';
    } else {
        music.pause();
        toggleBtn.textContent = '🔇';
    }
});

// ✅ RSVP form submission logic to Google Sheets via Apps Script
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("rsvp-form");
    const submitBtn = form.querySelector("button[type='submit']");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Отключаем кнопку, чтобы пользователь не мог нажать снова
        submitBtn.disabled = true;
        submitBtn.textContent = "Жіберілуде...";

        const formData = new FormData(form);
        const data = new URLSearchParams();

        for (const pair of formData.entries()) {
            data.append(pair[0], pair[1]);
        }

        try {
            const response = await fetch("https://script.google.com/macros/s/AKfycbxrrs78N23zchNtAy54o2wlcNoEfjUV9lb3L9AUb-GdTrLJFBa2DQ1F92gZ-DRU7HcW/exec", {
                method: "POST",
                body: data,
            });

            const result = await response.json();

            if (result.result === "success") {
                alert(result.message);
                submitBtn.textContent = "Жіберілді ✅";
                form.reset();
            } else {
                // alert("Қате орын алды: " + result.message);
                submitBtn.disabled = true;
                submitBtn.textContent = "Жіберілді ✅";
            }
        } catch (error) {
            // alert("Серверге қосыла алмадым. Қайтадан байқап көріңіз.");
            console.error(error);
            submitBtn.disabled = true;
            submitBtn.textContent = "Жіберілді ✅";
        }
    });
});


// Intersection Observer for fade-in animations
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.fade-in, section, .wrapper_divider');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
});

// Emoji favicon
const setFavicon = (emoji) => {
    const canvas = document.createElement('canvas');
    canvas.height = 32;
    canvas.width = 32;

    const ctx = canvas.getContext('2d');
    ctx.font = '28px serif';
    ctx.fillText(emoji, -2, 24);

    const favicon = document.querySelector('link[rel=icon]');
    if (favicon) { favicon.href = canvas.toDataURL(); }
}

setFavicon('💌');
