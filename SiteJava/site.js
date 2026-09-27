// google analytics for site usage
const GoogleAnalyticsID = "G-L1BE83PB09";

// quick ref for header buttons
const HeaderNavigationLinks =
[
    { Href: "../SitePages/Homepage.html", Icon: "HomeIcon.png", Label: "Home" },
    { Href: "../SitePages/Homepage.html#projectsSection", Icon: "ProjectsIcon.png", Label: "Projects" },
    { Href: "../SitePages/Homepage.html#resumeSection", Icon: "ResumeIcon.png", Label: "Résumé" },
];

// quick ref for my socials (that I want to give out...)
const FooterNavigationLinks =
[
    { Href: "https://www.linkedin.com/in/kevinwall-gamedev/", Img: "linkedin-logo.png", Label: "LinkedIn" },
    { Href: "https://github.com/swift-kevin", Img: "github-mark-white.png", Label: "GitHub" },
];

// creates the header
function HeaderMarkup()
{
    // create each button within nav links
    const buttons = HeaderNavigationLinks.map(link => `
            <a class="siteHeaderNavLink" href="${link.Href}">
                <img src="../SiteImages/${link.Icon}" alt="" />
                <span>${link.Label}</span>
            </a>`).join("");

    // create header div
    return `
    <div class="siteHeader">
        <div class="siteHeaderTitle">
            <a href="../SitePages/Homepage.html">Kevin Wall</a>
        </div>
        <div class="siteHeaderNav">${buttons}
        </div>
    </div>`;
}

// create footer
function FooterMarkup()
{
    // create button for each social link
    const socials = FooterNavigationLinks.map(link => `
        <a href="${link.Href}" target="_blank" rel="noopener" title="${link.Label}">
            <img src="../SiteImages/${link.Img}" alt="${link.Label}" />
        </a>`).join("");

    // create footer div
    return `
    <div class="socialLinksBar">
        <h2>Connect with me:</h2>${socials}
    </div>`;
}

// [Top] is a button to scroll to y=0
function CreateTopButton()
{
    // create the button
    const button = document.createElement("button");
    button.id = "backToTopButton";
    button.type = "button";
    button.title = "Go to top";
    button.textContent = "Top";
    button.style.display = "none";

    // scroll behavior
    button.addEventListener("click", () =>
    {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // place in the page
    document.body.appendChild(button);
    window.addEventListener("scroll", () =>
    {
        const scrolled = document.body.scrollTop || document.documentElement.scrollTop;
        button.style.display = scrolled > 500 ? "block" : "none";
    });
}

// get offset of the header if we are scrolled or not
function HeaderOffset()
{
    const header = document.querySelector(".siteHeader");
    return header ? header.getBoundingClientRect().height + 24 : 104;
}

// scroll bar for project selection (left side of screen)
// on PC view of "More Projects" section
function MountProjectIndex()
{
    // get current list of "more projects"
    const links = [...document.querySelectorAll(".projectIndexNav a")];
    const rows = [...document.querySelectorAll(".projectRow")];

    // if there are none- what.. I should go make some then :)
    if (!links.length || links.length !== rows.length)
    {
        return;
    }

    // synchronize the list whenever clicked
    function SyncLinks()
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

    // go through each link and add an onClick event to swap to that section
    links.forEach((link, n) =>
    {
        link.addEventListener("click", (event) =>
        {
            event.preventDefault();

            // scroll to that section as well
            const top = rows[n].getBoundingClientRect().top + window.scrollY - HeaderOffset();
            window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
            history.replaceState(null, "", link.getAttribute("href"));

            // toggle if its not active
            links.forEach((other, m) => other.classList.toggle("active", m === n));
        });
    });

    // I could scroll and that should also update the list
    window.addEventListener("scroll", SyncLinks, { passive: true });
    window.addEventListener("resize", SyncLinks, { passive: true });
    
    // go ahead and calculate it
    SyncLinks();
}

// I want to see how many site vists I get, google analytics is a useful thing for this
// I dont the analytics for anything aside from seeing how many people are looking
// also helpful to find if bots are spamming my site, why would they? am I that important?
function LoadAnalytics()
{
    // create section for the analytics
    const tag = document.createElement("script");
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${GoogleAnalyticsID}`;
    document.head.appendChild(tag);

    /// attach google analytics driver
    window.dataLayer = window.dataLayer || [];
    window.gtag = function ()
    {
        window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", GoogleAnalyticsID);
}

// replace any header/footer ID's with the actual info
// helper to avoid rewriting
document.addEventListener("DOMContentLoaded", () =>
{
    // Header
    {
        const headerSlot = document.getElementById("siteHeaderSlot");
        if (headerSlot)
            headerSlot.outerHTML = HeaderMarkup();
        else
            document.body.insertAdjacentHTML("afterbegin", HeaderMarkup());
    }

    // Footer
    {
        const footerSlot = document.getElementById("siteFooterSlot");
        if (footerSlot)
            footerSlot.outerHTML = FooterMarkup();
        else
            document.body.insertAdjacentHTML("beforeend", FooterMarkup());
    }
    
    CreateTopButton();
    MountProjectIndex();
    LoadAnalytics();
});
