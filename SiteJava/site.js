// google analytics for site usage
const GaMeasurementId = "G-L1BE83PB09";

const NavLinks =
[
    { Href: "../SitePages/Homepage.html", Icon: "HomeIcon.png", Label: "Home" },
    { Href: "../SitePages/Homepage.html#Projects", Icon: "ProjectsIcon.png", Label: "Projects" },
    { Href: "../SitePages/Homepage.html#Resume", Icon: "ResumeIcon.png", Label: "Résumé" },
];

const SocialLinks =
[
    { Href: "https://www.linkedin.com/in/kevinwall-gamedev/", Img: "linkedin-logo.png", Label: "LinkedIn" },
    { Href: "https://github.com/swift-kevin", Img: "github-mark-white.png", Label: "GitHub" },
];

function HeaderMarkup()
{
    const buttons = NavLinks.map(link => `
            <a class="menu-buttons" href="${link.Href}">
                <img src="../SiteImages/${link.Icon}" alt="" />
                <span>${link.Label}</span>
            </a>`).join("");

    return `
    <div class="header" id="myHeader">
        <div class="header-title">
            <a href="../SitePages/Homepage.html">Kevin Wall</a>
        </div>
        <div class="header-buttons-container">${buttons}
        </div>
    </div>`;
}

function FooterMarkup()
{
    const socials = SocialLinks.map(link => `
        <a href="${link.Href}" target="_blank" rel="noopener" title="${link.Label}">
            <img src="../SiteImages/${link.Img}" alt="${link.Label}" />
        </a>`).join("");

    return `
    <div class="footer-connect clickable">
        <h2>Connect with me:</h2>${socials}
    </div>`;
}

function MountTopButton()
{
    const button = document.createElement("button");
    button.id = "topBtn";
    button.type = "button";
    button.title = "Go to top";
    button.textContent = "Top";
    button.style.display = "none";

    button.addEventListener("click", () =>
    {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.body.appendChild(button);

    window.addEventListener("scroll", () =>
    {
        const scrolled = document.body.scrollTop || document.documentElement.scrollTop;
        button.style.display = scrolled > 500 ? "block" : "none";
    });
}

// Measured live, since the header is injected and its height varies by breakpoint.
function HeaderOffset()
{
    const header = document.querySelector(".header");
    return header ? header.getBoundingClientRect().height + 24 : 104;
}

// Highlights the project index entry matching the row nearest the top, and
// drives the scroll itself so it cannot land short of the sticky header.
function MountProjectIndex()
{
    const links = [...document.querySelectorAll(".project-index a")];
    const rows = [...document.querySelectorAll(".prow")];

    if (!links.length || links.length !== rows.length)
    {
        return;
    }

    function Sync()
    {
        const limit = HeaderOffset() + 8;
        let index = 0;

        rows.forEach((row, n) =>
        {
            if (row.getBoundingClientRect().top <= limit)
            {
                index = n;
            }
        });

        links.forEach((link, n) => link.classList.toggle("active", n === index));
    }

    links.forEach((link, n) =>
    {
        link.addEventListener("click", (event) =>
        {
            event.preventDefault();

            const top = rows[n].getBoundingClientRect().top + window.scrollY - HeaderOffset();
            window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
            history.replaceState(null, "", link.getAttribute("href"));

            links.forEach((other, m) => other.classList.toggle("active", m === n));
        });
    });

    window.addEventListener("scroll", Sync, { passive: true });
    window.addEventListener("resize", Sync, { passive: true });
    Sync();
}

function LoadAnalytics()
{
    const tag = document.createElement("script");
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${GaMeasurementId}`;
    document.head.appendChild(tag);

    window.dataLayer = window.dataLayer || [];

    window.gtag = function ()
    {
        window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", GaMeasurementId);
}

document.addEventListener("DOMContentLoaded", () =>
{
    const headerSlot = document.getElementById("site-header");

    if (headerSlot)
    {
        headerSlot.outerHTML = HeaderMarkup();
    }
    else
    {
        document.body.insertAdjacentHTML("afterbegin", HeaderMarkup());
    }

    const footerSlot = document.getElementById("site-footer");

    if (footerSlot)
    {
        footerSlot.outerHTML = FooterMarkup();
    }
    else
    {
        document.body.insertAdjacentHTML("beforeend", FooterMarkup());
    }

    MountTopButton();
    MountProjectIndex();
    LoadAnalytics();
});
