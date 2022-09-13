const count = 10;
const apiKey = "5IVeocv15NCEot0eLvTMCMQ0gFxWohteSi846svupxk";
const API_URL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let photosArray = null;

let isReady = false;
let imagesLoaded = 0;
let totalImages = 0;

// Get Photos From Unsplash API
async function fetchPhotos(){
    try{
        const response = await fetch(API_URL);
        const data = await response.json();
        photosArray = data;
        displayPhotos();
    } catch(err){
        alert(err.message);
    }
}
fetchPhotos();

const imageContainer = document.querySelector('.image-container');
const loader = document.querySelector('.loader');

// Create Elements and Add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach(photo => {
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // Create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a> element then put inside image Container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Check If All Images are loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        loader.hidden = true;
        isReady = true;
    }
}

// For Infinite Scrolling Effect
window.addEventListener('scroll', () => {
     if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && isReady)
    {
        isReady = false;
        fetchPhotos();
    }
});