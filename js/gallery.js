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

let currentLightbox = null;

galeryList.addEventListener('click', event => {
    event.preventDefault();

    const clickedImage = event.target;

    if (clickedImage.nodeName !== 'IMG') {
        return;
    }

    if (currentLightbox && currentLightbox.visible()) {
        currentLightbox.close();
        currentLightbox = null;
        return;
    }

    const imgURL = clickedImage.dataset.source;
    const innerHTML = `<div class="modal-view"><img src="${imgURL}"></div>`;
    const lightBox = basicLightbox.create(innerHTML, {
        onShow: instance => {
            currentLightbox = instance;
            instance
                .element()
                .querySelector('img')
                .addEventListener('click', () => {
                    instance.close();
                });
        },
        onClose: instance => {
            currentLightbox = null;
        },
    });

    lightBox.show();
});
