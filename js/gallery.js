import { images } from './gallery-items.js';

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

