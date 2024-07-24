
import './css/styles.css'; 
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
// Opisany w dokumentacji
import SimpleLightbox from "simplelightbox";
// Opcjonalny import stylów
import "simplelightbox/dist/simple-lightbox.min.css";

document.getElementById('search-form').addEventListener('submit', event => {
    event.preventDefault();
    const query = document.getElementById('search-query').value;
    fetchImages(query);
});

function fetchImages(query) {
    const loader = document.querySelector('.loader');
     loader.classList.remove('hidden');
    loader.style.display = 'block'; //
    const apiKey = '44974018-ca766bb5bf44f97c206908e6f'; 
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            loader.classList.add('hidden');
            loader.style.display = 'none';
            if (data.hits.length === 0) {
                iziToast.error({
                    title: 'Error',
                    message: 'Przepraszamy, nie ma obrazów zgodnych z wyszukiwaniem. Spróbuj ponownie!'
                });
            } else {
                displayImages(data.hits);
            }
        })
        .catch(error => {
            loader.classList.add('hidden');
            loader.style.display = 'none'; 
            
            iziToast.error({
                title: 'Error',
                message: `There was a problem with the fetch operation: ${error}`
                
            });
            console.log(error);
        });
}
 function displayImages(images) {
        const gallery = document.querySelector('.gallery');
        gallery.innerHTML = '';

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
            <div class = "info"><span>Likes</span> ${image.likes}</div>
            <div class = "info"><span>Views</span> ${image.views}</div>
            <div class = "info"><span>Comments</span> ${image.comments}</div>
            <div class = "info"><span>Downloads</span> ${image.downloads}</div>
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
}