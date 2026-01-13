document.addEventListener("DOMContentLoaded", init);

const TOP_COUNT = 6;

const IMAGES = [
  { src: "pictures/airport.jpg", alt: "Airport" },
  { src: "pictures/animal.jpg", alt: "Animal" },
  { src: "pictures/camera.jpg", alt: "Camera" },
  { src: "pictures/city.jpg", alt: "City" },
  { src: "pictures/lake.jpg", alt: "Lake" },
  { src: "pictures/mountain.jpg", alt: "Mountain" },
  { src: "pictures/nature.jpg", alt: "Nature" },
  { src: "pictures/nature_2.jpg", alt: "Nature 2" },
  { src: "pictures/palace.jpg", alt: "Palace" },
  { src: "pictures/plane.jpg", alt: "Plane" },
  { src: "pictures/street.jpg", alt: "Street" },
  { src: "pictures/train.jpg", alt: "Train" },
];

let currentIndex = 0;

let topGallery;
let bottomGallery;
let dialog;
let dialogImg;
let closeBtn;
let prevBtn;
let nextBtn;

/** Startet die Seite: rendert die Galerie und setzt Events. */
function init() {
  cacheElements();
  renderGallery();
  bindEvents();
}

function cacheElements() {
  topGallery = document.getElementById("galleryTop");
  bottomGallery = document.getElementById("galleryBottom");
  dialog = document.getElementById("imgDialog");
  dialogImg = document.getElementById("dialogImg");
  closeBtn = document.getElementById("closeDialog");
  prevBtn = document.getElementById("prevBtn");
  nextBtn = document.getElementById("nextBtn");
}

/** Rendert alle Thumbnail-Bilder in die zwei Container. */
function renderGallery() {
  IMAGES.forEach((image, index) => {
    const img = createThumbnail(image, index);
    appendToGallery(img, index);
  });
}

function createThumbnail(image, index) {
  const img = document.createElement("img");
  img.src = image.src;
  img.alt = image.alt;
  img.className = "pictures";
  img.dataset.index = String(index);
  return img;
}

function appendToGallery(img, index) {
  if (index < TOP_COUNT) {
    topGallery.appendChild(img);
    return;
  }
  bottomGallery.appendChild(img);
}

function bindEvents() {
  document.addEventListener("click", handleThumbClick);
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);
  closeBtn.addEventListener("click", closeDialog);
  dialog.addEventListener("click", handleBackdropClick);
  document.addEventListener("keydown", handleKeydown);
}

function handleThumbClick(e) {
  if (!e.target.classList.contains("pictures")) return;
  openDialog(Number(e.target.dataset.index));
}

/** Öffnet den Dialog mit dem Bild am Index. */
function openDialog(index) {
  currentIndex = index;
  setDialogImage();
  dialog.showModal();
}

function showNext() {
  currentIndex = (currentIndex + 1) % IMAGES.length;
  setDialogImage();
}

function showPrev() {
  currentIndex = (currentIndex - 1 + IMAGES.length) % IMAGES.length;
  setDialogImage();
}

function setDialogImage() {
  dialogImg.src = IMAGES[currentIndex].src;
  dialogImg.alt = IMAGES[currentIndex].alt;
}

function closeDialog() {
  dialog.close();
}

function handleBackdropClick(e) {
  if (e.target !== dialog) return;
  closeDialog();
}

function handleKeydown(e) {
  if (!dialog.open) return;
  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft") showPrev();
  if (e.key === "Escape") closeDialog();
}
