// initialization

const RESPONSIVE_WIDTH = 1024

let headerWhiteBg = false
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH
const collapseBtn = document.getElementById("collapse-btn")
const collapseHeaderItems = document.getElementById("collapsed-header-items")



function onHeaderClickOutside(e) {

    if (!collapseHeaderItems.contains(e.target)) {
        toggleHeader()
    }

}


function toggleHeader() {
    if (isHeaderCollapsed) {
        // collapseHeaderItems.classList.remove("max-md:tw-opacity-0")
        collapseHeaderItems.classList.add("opacity-100",)
        collapseHeaderItems.style.width = "60vw"
        collapseBtn.classList.remove("bi-list")
        collapseBtn.classList.add("bi-x", "max-lg:tw-fixed")
        isHeaderCollapsed = false

        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 1)

    } else {
        collapseHeaderItems.classList.remove("opacity-100")
        collapseHeaderItems.style.width = "0vw"
        collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed")
        collapseBtn.classList.add("bi-list")
        isHeaderCollapsed = true
        window.removeEventListener("click", onHeaderClickOutside)

    }
}

function responsive() {
    if (window.innerWidth > RESPONSIVE_WIDTH) {
        collapseHeaderItems.style.width = ""

    } else {
        isHeaderCollapsed = true
    }
}

window.addEventListener("resize", responsive)


/**
 * Animations
 */

gsap.registerPlugin(ScrollTrigger)


const numberTimeline = gsap.timeline({paused: true, scrollTrigger: {
    trigger: "#numbers",
    start: "100% 100%", // when the top of the trigger hits the top of the viewport
    end: "100% 90%", // when bottom trigger hits bottom of the viewport
    // markers: true,
}
})

numberTimeline.fromTo("#numbers-container", {
    scale: 0.8,
}, {

    scale: 1,
    duration: 3
}).to("#installs", {
    innerText: 300,
    duration: 3,
    snap: {
        innerText: 1
    },
}, "<").to("#hours", {
    innerText: 500,
    duration: 3,
    snap: {
        innerText: 1
    }
}, "<")


/**
 * Screenshots lightbox
 */

const screenshotImgs = Array.from(document.querySelectorAll("#screenshots-gallery img"))
const lightbox = document.getElementById("lightbox")
const lightboxImg = document.getElementById("lightbox-img")
let currentScreenshotIndex = 0

function openLightbox(index) {
    currentScreenshotIndex = index
    lightboxImg.src = screenshotImgs[index].src
    lightbox.hidden = false
    document.body.style.overflow = "hidden"
}

function closeLightbox() {
    lightbox.hidden = true
    document.body.style.overflow = ""
}

function navigateLightbox(direction) {
    currentScreenshotIndex = (currentScreenshotIndex + direction + screenshotImgs.length) % screenshotImgs.length
    lightboxImg.src = screenshotImgs[currentScreenshotIndex].src
}

screenshotImgs.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index))
})

document.getElementById("lightbox-close").addEventListener("click", closeLightbox)
document.getElementById("lightbox-prev").addEventListener("click", () => navigateLightbox(-1))
document.getElementById("lightbox-next").addEventListener("click", () => navigateLightbox(1))

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox()
})

window.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return
    if (e.key === "Escape") closeLightbox()
    if (e.key === "ArrowLeft") navigateLightbox(-1)
    if (e.key === "ArrowRight") navigateLightbox(1)
})