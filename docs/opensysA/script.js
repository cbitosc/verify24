document.addEventListener("DOMContentLoaded", function () {
    // Parse the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const odysseyCode = urlParams.get("id");

    // Fetch the JSON file
    fetch("data.json")
        .then((response) => response.json())
        .then((jsonData) => {
            // Find the entry in the JSON data that matches the provided odyssey code
            const matchingEntry = jsonData.find(
                (entry) => entry.code === odysseyCode
            );

            if (matchingEntry) {
                // Update the text in the "name-element"

                const generalHeader = document.getElementById("general-header");
                generalHeader.classList.add("hidden");

                const nameElement = document.getElementById("name-element");
                nameElement.textContent = `${matchingEntry.holder}`;

                const headerNameElement = document.getElementById(
                    "header-name-element"
                );
                headerNameElement.textContent = `${matchingEntry.holder}`;

                const certHeader = document.getElementById("cert-header");
                const certificate = document.getElementById("certificate");

                certHeader.classList.remove("hidden");
                certificate.classList.remove("hidden");

                const qrContainer = document.getElementById("qr-container");

                // Use qrcode library to generate the QR code
                const qr = new QRCode(qrContainer, {
                    text:
                        "https://cbitosc.github.io/verify24/opensysA/?id=" +
                        matchingEntry.code,
                    width: 384,
                    height: 384,
                    typeNumber: 8,
                    correctLevel: QRCode.CorrectLevel.H,
                });

                // const scaleFactor = 96 / 384;

                // qrContainer.style.transform = "scale(" + scaleFactor + ")";
                // qrContainer.style.transformOrigin = "top left";

                // qrContainer.style.width = "96px";
                // qrContainer.style.height = "96px";
            } else {
                console.error(
                    "No matching entry found for the provided odyssey code."
                );
            }
        })
        .catch((error) => console.error("Error loading JSON:", error));
});
