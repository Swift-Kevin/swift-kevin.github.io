// Some JS to run the loading dots on the index page when redirecting the site
let dotCount = 1;

function updateDots()
{
    const dotsElement = document.getElementById("loadingDots");
    const currentDots = dotsElement.textContent;

    if (dotCount < 5)
    {
        dotsElement.textContent = currentDots + " . ";
        dotCount++;
    }
    else
    {
        dotsElement.textContent = '\u00A0\u00A0\u00A0';
        dotCount = 0;
    }
}

setInterval(updateDots, 500);