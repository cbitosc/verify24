
document.addEventListener("DOMContentLoaded", function () {
const urlParams = new URLSearchParams(window.location.search);
const odysseyCode = urlParams.get("id");

fetch("data.json")
    .then((response) => response.json())
    .then((jsonData) => {
        const matchingEntry = jsonData.find((entry) => entry.code === odysseyCode);

        if (matchingEntry) {
            const generalHeader = document.getElementById("general-header");
            generalHeader.classList.add("hidden");

            const nameElement = document.getElementById("name-element");
            nameElement.textContent = `${matchingEntry.holder}`;

            const headerNameElement = document.getElementById("header-name-element");
            headerNameElement.textContent = `${matchingEntry.holder}`;

            const certHeader = document.getElementById("cert-header");
            const certificate = document.getElementById("certificate");

            certHeader.classList.remove("hidden");
            certificate.classList.remove("hidden");

            const qrContainer = document.getElementById("qr-container");

            const qr = new QRCode(qrContainer, {
                text: "https://cbitosc.github.io/verify24/hfestM/?id=" + matchingEntry.code,
                width: 384,
                height: 384,
                typeNumber: 8,
                correctLevel: QRCode.CorrectLevel.H,
                colorDark: "#FFFFFF",  // White color for QR code modules
                colorLight: "#000000"
            });

        } else {
            console.error("No matching entry found for the provided code.");
        }
    })
    .catch((error) => console.error("Error loading JSON:", error));
});
