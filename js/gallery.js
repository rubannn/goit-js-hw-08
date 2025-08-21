import { images } from './gallery-items.js';

const galleryList = document.querySelector('.gallery');

const galleryItems = images
    .map(
        (image, index) => `
            <li class="gallery-item">
            <a class="gallery-link" href="${image.original}">
                <img class="gallery-image"
                    src="${image.preview}"
                    data-source="${image.original}"
                    data-index="${index}"
                    alt="${image.description}" />
            </a>
            </li>`
    )
    .join('');

galleryList.insertAdjacentHTML('beforeend', galleryItems);

let currentLightbox = null;
let currentIndex = null;
let keyHandler = null;
let overlayHandler = null;

galleryList.addEventListener('click', event => {
    event.preventDefault();
    const clickedImage = event.target;
    if (clickedImage.nodeName !== 'IMG') return;

    currentIndex = Number(clickedImage.dataset.index);
    openLightbox(currentIndex);
});

function openLightbox(index) {
    const innerHTML = `
    <div class="modal-view">
        <button class="close-btn" aria-label="Close">×</button>
        <div class="image-wrapper">
            <button class="nav-btn prev" aria-label="Previous">⟨</button>
            <img class="modal-image" src="${images[index].original}" alt="">
            <button class="nav-btn next" aria-label="Next">⟩</button>
            <div class="counter">${index + 1} / ${images.length}</div>
        </div>
    </div>
    `;

    const instance = basicLightbox.create(innerHTML, {
        onShow: inst => {
            currentLightbox = inst;

            const root = inst.element();
            const imgEl = root.querySelector('.modal-image');
            const prevBtn = root.querySelector('.prev');
            const nextBtn = root.querySelector('.next');
            const closeBtn = root.querySelector('.close-btn');
            const counterEl = root.querySelector('.counter');

            const updateImage = () => {
                imgEl.src = images[currentIndex].original;
                counterEl.textContent = `${currentIndex + 1} / ${
                    images.length
                }`;
            };

            prevBtn.addEventListener('click', e => {
                e.stopPropagation();
                currentIndex =
                    (currentIndex - 1 + images.length) % images.length;
                updateImage();
            });

            nextBtn.addEventListener('click', e => {
                e.stopPropagation();
                currentIndex = (currentIndex + 1) % images.length;
                updateImage();
            });

            closeBtn.addEventListener('click', e => {
                e.stopPropagation();
                inst.close();
            });

            keyHandler = e => {
                if (e.key === 'Escape') inst.close();
                else if (e.key === 'ArrowLeft') prevBtn.click();
                else if (e.key === 'ArrowRight') nextBtn.click();
            };
            document.addEventListener('keydown', keyHandler);

            overlayHandler = e => {
                if (e.target === e.currentTarget) inst.close();
            };
            root.addEventListener('click', overlayHandler);
        },
        onClose: inst => {
            if (keyHandler) document.removeEventListener('keydown', keyHandler);
            if (overlayHandler)
                inst.element().removeEventListener('click', overlayHandler);
            keyHandler = null;
            overlayHandler = null;
            currentLightbox = null;
        },
    });

    instance.show();
}
