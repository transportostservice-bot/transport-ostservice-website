/*
 * Transport Ostservice – Bewerbungsformular
 * Versand über Formspree.
 * In bewerbung.html DEINE_FORM_ID durch die Formular-ID aus dem
 * Formspree-Dashboard ersetzen (z.B. https://formspree.io/f/xxxxxxxx).
 */
(() => {
    const form = document.getElementById("bewerbungsformular");
    if (!form) return;

    const message = document.getElementById("formularmeldung");
    const submitButton = document.getElementById("bewerbung-absenden");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;

        message.textContent = "Deine Bewerbung wird gesendet …";
        submitButton.disabled = true;

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: { "Accept": "application/json" }
            });

            const result = await response.json().catch(() => ({}));

            if (!response.ok) {
                const detail = result.errors?.map(item => item.message).join(" ") || result.error || "";
                throw new Error(detail || "Formspree hat die Bewerbung nicht angenommen.");
            }

            message.textContent = "Vielen Dank! Deine Bewerbung wurde erfolgreich übermittelt.";
            form.reset();
        } catch (error) {
            message.textContent = "Deine Bewerbung konnte gerade nicht gesendet werden. Bitte versuche es später erneut oder schreibe an transport.ostservice@gmail.com.";
            console.error("Bewerbungsformular:", error);
        } finally {
            submitButton.disabled = false;
        }
    });
})();
