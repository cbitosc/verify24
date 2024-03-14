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

                var certId = "";
                var nameElementId = "";
                var qrContainerId = "";

                if (matchingEntry.position === "first") {
                    certId = "certificate-1";
                    nameElementId = "name-element-1";
                    qrContainerId = "qr-container-1";
                } else if (matchingEntry.position === "second") {
                    certId = "certificate-2";
                    nameElementId = "name-element-2";
                    qrContainerId = "qr-container-2";
                } else if (matchingEntry.position === "third") {
                    certId = "certificate-3";
                    nameElementId = "name-element-3";
                    qrContainerId = "qr-container-3";
                }

                const nameElement = document.getElementById(nameElementId);
                nameElement.textContent = `${matchingEntry.holder}`;

                const headerNameElement = document.getElementById(
                    "header-name-element"
                );
                headerNameElement.textContent = `${matchingEntry.holder}`;

                const certHeader = document.getElementById("cert-header");
                const certificate = document.getElementById(certId);

                certHeader.classList.remove("hidden");
                certificate.classList.remove("hidden");

                const qrContainer = document.getElementById(qrContainerId);

                // Use qrcode library to generate the QR code
                const qr = new QRCode(qrContainer, {
                    text:
                        "https://cbitosc.github.io/verify24/gitcryptexM/?id=" +
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
