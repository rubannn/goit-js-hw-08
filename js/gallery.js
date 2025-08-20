import { images } from './gallery-items.js';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

const galeryList = document.querySelector('.gallery');

const galleryItems = images.map(
    image =>
        `<li class="gallery-item">
            <a class="gallery-link" href="${image.original}">
            <img class="gallery-image"
                src="${image.preview}"
                data-source="${image.original}"
                alt="${image.description}" />
            </a>
        </li>`
);

galeryList.insertAdjacentHTML('beforeend', galleryItems.join(''));

galeryList.addEventListener('click', event => {
    event.preventDefault();

    const clickedImage = event.target;
    console.log(clickedImage.nodeName);

    if (clickedImage.nodeName !== 'IMG') {
        return;
    }

    const imgURL = clickedImage.dataset.source;
    const innerHTML = `<div class="modal-view"><img src="${imgURL}"></div>`;
    const lightBox = basicLightbox.create(innerHTML);

    lightBox.show();
});
