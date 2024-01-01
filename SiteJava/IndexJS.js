let dotCount = 1;

function updateDots() {
    const dotsElement = document.getElementById("loadingDots");
    const currentDots = dotsElement.textContent;

    if (dotCount < 5) {
        dotsElement.textContent = currentDots + " . ";
        dotCount++;
    }
    else {
        dotsElement.textContent = '\u00A0\u00A0\u00A0'; // Non-breaking spaces
        dotCount = 0;
    }
}

setInterval(updateDots, 500);