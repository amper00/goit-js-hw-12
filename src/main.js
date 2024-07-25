import './css/styles.css'; 
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';

let page = 1;
const perPage = 40;
let currentQuery = '';
let totalHits = 0;
let totalPages = 0;

document.getElementById('search-form').addEventListener('submit', async event => {
    event.preventDefault();
    const query = document.getElementById('search-query').value;
    if (query !== currentQuery) {
        currentQuery = query;
        page = 1;
        totalHits = 0;
        totalPages = 0;
        document.querySelector('.gallery').innerHTML = ''; 
        hideLoadMoreButton(); 
    }
    await fetchImages(query);
});

document.getElementById('load-more').addEventListener('click', async () => {
    await fetchImages(currentQuery);
});

async function fetchImages(query) {
    const loader = document.querySelector('.loader');
    const loadMoreButton = document.getElementById('load-more');
    
    loader.classList.remove('hidden');
    loader.style.display = 'block';
    loadMoreButton.classList.add('hidden');

    const apiKey = '44974018-ca766bb5bf44f97c206908e6f'; 
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

    try {
        const response = await axios.get(url);
        loader.classList.add('hidden');
        loader.style.display = 'none';

        totalHits = response.data.totalHits;
        totalPages = Math.ceil(totalHits / perPage);

        if (response.data.hits.length === 0 && page === 1) {
            iziToast.error({
                title: 'Error',
                message: 'Przepraszamy, nie ma obrazów zgodnych z wyszukiwaniem. Spróbuj ponownie!'
            });
        } else {
            displayImages(response.data.hits);
            page++; 
            if (page > totalPages) {
                iziToast.error({
                    position: "topRight",
                    message: "We're sorry, there are no more posts to load"
                });
                hideLoadMoreButton();
            } else {
              
                showLoadMoreButton(); 
                   scrollPage();
                

            }
        }
    } catch (error) {
        loader.classList.add('hidden');
        loader.style.display = 'none';
        iziToast.error({
            title: 'Error',
            message: `There was a problem with the fetch operation: ${error}`
        });
        console.log(error);
    }
}

function displayImages(images) {
    const gallery = document.querySelector('.gallery');

    const items = images.map(image => {
        const li = document.createElement("li");
        li.classList.add("gallery-item");

        const a = document.createElement("a");
        a.classList.add("gallery-link");
        a.href = image.largeImageURL;
        a.setAttribute('data-lightbox', 'gallery');
        a.setAttribute('data-title', `❤️ ${image.likes} 👁️ ${image.views} 💬 ${image.comments} ⬇️ ${image.downloads}`);

        const img = document.createElement("img");
        img.classList.add("gallery-image");
        img.src = image.webformatURL;
        img.alt = image.tags;

        const underDiv = document.createElement("div");
        underDiv.classList.add("image-info");
        underDiv.innerHTML = `
            <div class="info"><span>Likes</span> ${image.likes}</div>
            <div class="info"><span>Views</span> ${image.views}</div>
            <div class="info"><span>Comments</span> ${image.comments}</div>
            <div class="info"><span>Downloads</span> ${image.downloads}</div>
        `;

        a.appendChild(img);
        li.appendChild(a);
        li.appendChild(underDiv);

        return li;
    });

    items.forEach(item => gallery.appendChild(item));

    // Initialize SimpleLightbox
    const lightbox = new SimpleLightbox('.gallery a', {
        captionType: 'attr',
        captionsData: 'alt',
        captionDelay: 250
    });

    if (items.length > 0) {
        showLoadMoreButton();
    }
}

function showLoadMoreButton() {
    const loadMoreButton = document.getElementById('load-more');
    loadMoreButton.classList.remove('hidden');
}

function hideLoadMoreButton() {
    const loadMoreButton = document.getElementById('load-more');
    loadMoreButton.classList.add('hidden');
}
function scrollPage() {
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        const firstItemHeight = galleryItems[0].getBoundingClientRect().height;
     
        window.scrollBy({
            top: 2 * firstItemHeight,
            behavior: 'smooth'
        });
    }
}