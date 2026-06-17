"use strict";

/* =========================================================
PAVAN DIGITAL — MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
const body = document.body;
const header = document.getElementById("site-header");
const menuToggle = document.getElementById("menu-toggle");
const navigation = document.getElementById("main-navigation");
const navLinks = document.querySelectorAll(".nav-link");
const faqItems = document.querySelectorAll(".faq-item");
const backToTopButton = document.getElementById("back-to-top");
const exitPopup = document.getElementById("exit-popup");
const popupCloseButton = document.getElementById("popup-close");
const popupCloseElements = document.querySelectorAll("[data-popup-close]");

/* ---------------------------------------------------------
Sticky Header
--------------------------------------------------------- */

function updateHeader() {
if (!header) {
return;
}

```
if (window.scrollY > 50) {
  header.classList.add("scrolled");
} else {
  header.classList.remove("scrolled");
}
```

}

updateHeader();

window.addEventListener("scroll", updateHeader, {
passive: true
});

/* ---------------------------------------------------------
Mobile Navigation
--------------------------------------------------------- */

function openMenu() {
if (!menuToggle || !navigation) {
return;
}

```
menuToggle.classList.add("active");
navigation.classList.add("open");
menuToggle.setAttribute("aria-expanded", "true");
body.classList.add("menu-open");
```

}

function closeMenu() {
if (!menuToggle || !navigation) {
return;
}

```
menuToggle.classList.remove("active");
navigation.classList.remove("open");
menuToggle.setAttribute("aria-expanded", "false");
body.classList.remove("menu-open");
```

}

function toggleMenu() {
if (!navigation) {
return;
}

```
if (navigation.classList.contains("open")) {
  closeMenu();
} else {
  openMenu();
}
```

}

if (menuToggle) {
menuToggle.addEventListener("click", toggleMenu);
}

navLinks.forEach(function (link) {
link.addEventListener("click", function () {
closeMenu();
});
});

window.addEventListener("resize", function () {
if (window.innerWidth > 900) {
closeMenu();
}
});

/* ---------------------------------------------------------
Active Navigation Link on Scroll
--------------------------------------------------------- */

const sections = document.querySelectorAll("main section[id]");

function updateActiveNavigation() {
let currentSectionId = "home";
const scrollPosition = window.scrollY + 160;

```
sections.forEach(function (section) {
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;

  if (
    scrollPosition >= sectionTop &&
    scrollPosition < sectionTop + sectionHeight
  ) {
    currentSectionId = section.getAttribute("id");
  }
});

navLinks.forEach(function (link) {
  link.classList.remove("active");

  const linkTarget = link.getAttribute("href");

  if (linkTarget === "#" + currentSectionId) {
    link.classList.add("active");
  }
});
```

}

updateActiveNavigation();

window.addEventListener("scroll", updateActiveNavigation, {
passive: true
});

/* ---------------------------------------------------------
FAQ Accordion
--------------------------------------------------------- */

faqItems.forEach(function (item) {
const questionButton = item.querySelector(".faq-question");

```
if (!questionButton) {
  return;
}

questionButton.addEventListener("click", function () {
  const isCurrentlyOpen = item.classList.contains("active");

  faqItems.forEach(function (faqItem) {
    faqItem.classList.remove("active");
  });

  if (!isCurrentlyOpen) {
    item.classList.add("active");
  }
});
```

});

/* ---------------------------------------------------------
Back-to-Top Button
--------------------------------------------------------- */

function updateBackToTopButton() {
if (!backToTopButton) {
return;
}

```
if (window.scrollY > 550) {
  backToTopButton.classList.add("visible");
} else {
  backToTopButton.classList.remove("visible");
}
```

}

updateBackToTopButton();

window.addEventListener("scroll", updateBackToTopButton, {
passive: true
});

if (backToTopButton) {
backToTopButton.addEventListener("click", function () {
window.scrollTo({
top: 0,
behavior: "smooth"
});
});
}

/* ---------------------------------------------------------
Exit-Intent Popup
--------------------------------------------------------- */

let popupAlreadyShown = false;

try {
popupAlreadyShown =
sessionStorage.getItem("pavanDigitalPopupShown") === "true";
} catch (error) {
popupAlreadyShown = false;
}

function openExitPopup() {
if (!exitPopup || popupAlreadyShown) {
return;
}

```
exitPopup.classList.add("active");
exitPopup.setAttribute("aria-hidden", "false");
body.classList.add("popup-open");

popupAlreadyShown = true;

try {
  sessionStorage.setItem("pavanDigitalPopupShown", "true");
} catch (error) {
  /* Continue even when session storage is unavailable. */
}
```

}

function closeExitPopup() {
if (!exitPopup) {
return;
}

```
exitPopup.classList.remove("active");
exitPopup.setAttribute("aria-hidden", "true");
body.classList.remove("popup-open");
```

}

/*
Desktop exit intent:
Popup appears when the visitor moves the mouse toward
the top of the browser after spending some time on the page.
*/

setTimeout(function () {
document.addEventListener("mouseout", function (event) {
const leavingFromTop =
event.clientY <= 8 &&
!event.relatedTarget &&
!event.toElement;

```
  if (leavingFromTop) {
    openExitPopup();
  }
});
```

}, 8000);

/*
Mobile/tablet fallback:
Exit intent cannot be detected reliably on touch devices.
Show the popup once after 35 seconds.
*/

if (window.matchMedia("(max-width: 900px)").matches) {
setTimeout(function () {
openExitPopup();
}, 35000);
}

if (popupCloseButton) {
popupCloseButton.addEventListener("click", closeExitPopup);
}

popupCloseElements.forEach(function (element) {
element.addEventListener("click", closeExitPopup);
});

/* ---------------------------------------------------------
Keyboard Accessibility
--------------------------------------------------------- */

document.addEventListener("keydown", function (event) {
if (event.key === "Escape") {
closeMenu();
closeExitPopup();
}
});

/* ---------------------------------------------------------
Smooth Scroll Adjustment for Header
--------------------------------------------------------- */

const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach(function (link) {
link.addEventListener("click", function (event) {
const targetId = link.getAttribute("href");

```
  if (!targetId || targetId === "#") {
    return;
  }

  const targetElement = document.querySelector(targetId);

  if (!targetElement) {
    return;
  }

  event.preventDefault();

  const headerHeight = header ? header.offsetHeight : 0;
  const targetPosition =
    targetElement.getBoundingClientRect().top +
    window.scrollY -
    headerHeight;

  window.scrollTo({
    top: targetPosition,
    behavior: "smooth"
  });
});
```

});
});
