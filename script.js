const sparkleContainer = document.querySelector(".sparkle-container");
const cursor = document.querySelector(".custom-cursor");

/* =========================
   SPARKLES
========================= */
if (sparkleContainer) {
  for (let i = 0; i < 50; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.textContent = "✧";

    sparkle.style.top = `${Math.random() * 100}vh`;
    sparkle.style.left = `${Math.random() * 100}vw`;
    sparkle.style.animationDuration = `${Math.random() * 2 + 2}s`;
    sparkle.style.animationDelay = `${Math.random() * 2}s`;

    sparkleContainer.appendChild(sparkle);
  }
}

/* =========================
   CUSTOM CURSOR
========================= */
document.addEventListener("mousemove", (event) => {
  if (cursor) {
    cursor.style.left = `${event.clientX - 12}px`;
    cursor.style.top = `${event.clientY - 10}px`;
  }
});

/* =========================
   WINDOW SETUP
========================= */
function setupWindow({
  openButtonId,
  closeButtonId,
  windowId,
  titleBarSelector
}) {
  const openButton = document.getElementById(openButtonId);
  const closeButton = document.getElementById(closeButtonId);
  const popupWindow = document.getElementById(windowId);
  const titleBar = popupWindow?.querySelector(titleBarSelector);

  if (!openButton || !closeButton || !popupWindow || !titleBar) return;

  /* Open / close */
  openButton.addEventListener("click", (event) => {
    event.preventDefault();
    popupWindow.classList.remove("hidden");
    popupWindow.setAttribute("aria-hidden", "false");
    openButton.setAttribute("aria-expanded", "true");
  });

  closeButton.addEventListener("click", () => {
    popupWindow.classList.add("hidden");
    popupWindow.setAttribute("aria-hidden", "true");
    openButton.setAttribute("aria-expanded", "false");
  });

  /* Dragging */
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  titleBar.addEventListener("mousedown", (event) => {
    if (event.target === closeButton) return;

    isDragging = true;

    const rect = popupWindow.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;

    popupWindow.style.left = `${rect.left}px`;
    popupWindow.style.top = `${rect.top}px`;
    popupWindow.style.right = "auto";
    popupWindow.style.transform = "none";
  });

  document.addEventListener("mousemove", (event) => {
    if (!isDragging) return;

    popupWindow.style.left = `${event.clientX - offsetX}px`;
    popupWindow.style.top = `${event.clientY - offsetY}px`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}

/* =========================
   INIT WINDOWS
========================= */
setupWindow({
  openButtonId: "open-archive",
  closeButtonId: "close-archive",
  windowId: "archive-window",
  titleBarSelector: ".archive-title-bar"
});

setupWindow({
  openButtonId: "open-about",
  closeButtonId: "close-about",
  windowId: "about-window",
  titleBarSelector: ".about-title-bar"
});

setupWindow({
  openButtonId: "open-secret-folder",
  closeButtonId: "close-secret-folder",
  windowId: "secret-folder-window",
  titleBarSelector: ".secret-title-bar"
});

/* =========================
   LIGHTBOX
========================= */
const galleryImages = document.querySelectorAll(".archive-image");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");

if (galleryImages.length && lightbox && lightboxImage && lightboxClose) {
  galleryImages.forEach((image) => {
    image.addEventListener("click", () => {
      lightbox.classList.remove("hidden");
      lightbox.classList.add("active");
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt || "";
    });
  });

  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("active");
    lightbox.classList.add("hidden");
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.classList.remove("active");
      lightbox.classList.add("hidden");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      lightbox.classList.remove("active");
      lightbox.classList.add("hidden");
    }
  });
}