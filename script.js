// Slideshow functionality
const slideshowImages = ['IMG_1908.jpeg', 'image2.jpeg', 'image3.jpg']; // Replace with your image filenames
let currentImageIndex = 0;
const slideshowContainer = document.getElementById('slideshow');

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
    slideshowContainer.style.backgroundImage = `url(${slideshowImages[currentImageIndex]})`;
}

setInterval(showNextImage, 5000); // Change image every 5 seconds

// Portfolio gallery
const landscapeGallery = document.getElementById('landscape-gallery');
const portraitGallery = document.getElementById('portrait-gallery');

// Function to populate gallery with thumbnails
function populateGallery(gallery, images) {
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        gallery.appendChild(imgElement);
    });
}

// Replace the below arrays with your landscape and portrait image filenames
const landscapeImages = ['landscape1.jpg', 'landscape2.jpg', 'landscape3.jpg'];
const portraitImages = ['portrait1.jpg', 'portrait2.jpg', 'portrait3.jpg'];

populateGallery(landscapeGallery, landscapeImages);
populateGallery(portraitGallery, portraitImages);


// Instagram feed
const instagramFeed = document.getElementById('instagram-feed');

fetch('https://www.instagram.com/fascinationphoto/?__a=1')
    .then(response => response.json())
    .then(data => {
        const latestPosts = data.graphql.user.edge_owner_to_timeline_media.edges;
        latestPosts.forEach(post => {
            const imgUrl = post.node.thumbnail_src; // Accessing the thumbnail image URL
            const imgElement = document.createElement('img');
            imgElement.src = imgUrl;
            instagramFeed.appendChild(imgElement);
        });
    })
    .catch(error => console.error('Error fetching Instagram feed:', error));
