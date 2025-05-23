document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");
    const formMessage = document.getElementById("formMessage");

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
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then((text) => {
                formMessage.textContent = text;
                formMessage.classList.remove("text-red-500");
                formMessage.classList.add("text-green-500");
                form.reset();
            })
            .catch((error) => {
                formMessage.textContent = "There was a problem sending your message. Please try again later.";
                formMessage.classList.remove("text-green-500");
                formMessage.classList.add("text-red-500");
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = "Send Message";
            });
    });
});
