document.addEventListener("DOMContentLoaded", function () {
    // Get the button:
    let mybutton = document.getElementById("topBtn");

    mybutton.style.display = "none";

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
});