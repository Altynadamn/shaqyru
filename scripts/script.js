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

// 🎵 Music toggle logic
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

// ✅ RSVP form submission logic
document.getElementById("rsvp-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const form = e.target;
    const formData = {
        attendance: form.attendance.value,
        name: form.name.value.trim(),
        wishes: form.wishes.value.trim()
    };
//https://formspree.io/f/xrblkldp
    //https://getform.io/f/axoymvwb
    fetch("https://formspree.io/f/xrblkldp", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            alert("Рақмет! Жауабыңыз қабылданды.");
            form.reset();
        })
});
