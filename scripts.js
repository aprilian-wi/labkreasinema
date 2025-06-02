document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");

    // Create popup container
    const popup = document.createElement("div");
    popup.id = "formPopup";
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    popup.style.color = "white";
    popup.style.padding = "20px 30px";
    popup.style.borderRadius = "8px";
    popup.style.fontSize = "1.2rem";
    popup.style.zIndex = "10000";
    popup.style.display = "none";
    popup.style.textAlign = "center";
    popup.style.maxWidth = "80%";
    popup.style.boxShadow = "0 0 10px rgba(255, 215, 0, 0.7)";
    document.body.appendChild(popup);

    function showPopup(message, isSuccess) {
        popup.textContent = message;
        popup.style.backgroundColor = isSuccess ? "rgba(40, 167, 69, 0.9)" : "rgba(220, 53, 69, 0.9)";
        popup.style.display = "block";
        setTimeout(() => {
            popup.style.display = "none";
        }, 4000);
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        const formData = new FormData(form);

        fetch(form.action, {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error("Network response was not ok");
                }
            })
            .then((text) => {
                showPopup(text, true);
                form.reset();
            })
            .catch((error) => {
                showPopup("There was a problem sending your message. Please try again later.", false);
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = "Send Message";
            });
    });
});

// Navbar transparent on top, solid on scroll (global untuk semua halaman)
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('main-navbar');
    if (!navbar) return;
    if (window.scrollY > 10) {
        navbar.classList.remove('bg-transparent');
        navbar.classList.add('bg-black', 'bg-opacity-80', 'backdrop-blur-md');
    } else {
        navbar.classList.add('bg-transparent');
        navbar.classList.remove('bg-black', 'bg-opacity-80', 'backdrop-blur-md');
    }
});

// Mobile navbar toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuClose = document.getElementById('menu-close');
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.remove('hidden');
        });
    }
    if (menuClose && mobileMenu) {
        menuClose.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    }
    // Optional: close menu on link click (handled inline in HTML)
});
