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
  mobileOpenButtonId,
  closeButtonId,
  windowId,
  titleBarSelector
}) {
  const openButton = document.getElementById(openButtonId);
  const mobileOpenButton = document.getElementById(mobileOpenButtonId);
  const closeButton = document.getElementById(closeButtonId);
  const popupWindow = document.getElementById(windowId);
  const titleBar = popupWindow?.querySelector(titleBarSelector);

  if (!closeButton || !popupWindow || !titleBar) return;

  function openWindow(event, button) {
    event?.preventDefault();
    popupWindow.classList.remove("hidden");
    popupWindow.setAttribute("aria-hidden", "false");
    button?.setAttribute("aria-expanded", "true");
  }

  function closeWindow() {
    popupWindow.classList.add("hidden");
    popupWindow.setAttribute("aria-hidden", "true");
    openButton?.setAttribute("aria-expanded", "false");
    mobileOpenButton?.setAttribute("aria-expanded", "false");
  }

  openButton?.addEventListener("click", (event) => {
    openWindow(event, openButton);
  });

  mobileOpenButton?.addEventListener("click", (event) => {
    openWindow(event, mobileOpenButton);
  });

  closeButton.addEventListener("click", closeWindow);

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
  mobileOpenButtonId: "open-archive-mobile",
  closeButtonId: "close-archive",
  windowId: "archive-window",
  titleBarSelector: ".archive-title-bar"
});

setupWindow({
  openButtonId: "open-about",
  mobileOpenButtonId: "open-about-mobile",
  closeButtonId: "close-about",
  windowId: "about-window",
  titleBarSelector: ".about-title-bar"
});

setupWindow({
  openButtonId: "open-video",
  mobileOpenButtonId: "open-video-mobile",
  closeButtonId: "close-video",
  windowId: "video-window",
  titleBarSelector: ".archive-title-bar"
});

setupWindow({
  openButtonId: "open-secret-folder",
  closeButtonId: "close-secret-folder",
  windowId: "secret-folder-window",
  titleBarSelector: ".secret-title-bar"
});

/* =========================
   IMAGE LIGHTBOX
========================= */
const galleryImages = document.querySelectorAll(".archive-image");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");

function closeImageLightbox() {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove("active");
  lightbox.classList.add("hidden");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxImage.alt = "";
}

if (galleryImages.length && lightbox && lightboxImage && lightboxClose) {
  galleryImages.forEach((image) => {
    image.addEventListener("click", () => {
      lightbox.classList.remove("hidden");
      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt || "";
    });
  });

  lightboxClose.addEventListener("click", closeImageLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeImageLightbox();
    }
  });
}

/* =========================
   VIDEO LIGHTBOX
========================= */
const videoThumbs = document.querySelectorAll(".video-thumb");
const videoLightbox = document.getElementById("video-lightbox");
const videoIframe = document.getElementById("video-iframe");
const videoLightboxClose = document.getElementById("video-lightbox-close");

function closeVideoLightbox() {
  if (!videoLightbox || !videoIframe) return;

  videoLightbox.classList.remove("active");
  videoLightbox.classList.add("hidden");
  videoLightbox.setAttribute("aria-hidden", "true");

  /* Clears the iframe so the YouTube video stops playing */
  videoIframe.src = "";
}

if (videoThumbs.length && videoLightbox && videoIframe && videoLightboxClose) {
  videoThumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const videoURL = thumb.dataset.video;

      if (!videoURL) return;

      videoIframe.src = `${videoURL}?autoplay=1&rel=0`;
      videoLightbox.classList.remove("hidden");
      videoLightbox.classList.add("active");
      videoLightbox.setAttribute("aria-hidden", "false");
    });
  });

  videoLightboxClose.addEventListener("click", closeVideoLightbox);

  videoLightbox.addEventListener("click", (event) => {
    if (event.target === videoLightbox) {
      closeVideoLightbox();
    }
  });
}

/* =========================
   ESCAPE KEY CLOSES LIGHTBOXES
========================= */
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeImageLightbox();
    closeVideoLightbox();
  }
});
