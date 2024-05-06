// Slideshow functionality
const slideshowImages = ['image1.jpg', 'image2.jpg', 'image3.jpg']; // Replace with your image filenames
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

// Contact form submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Replace this with your desired form submission logic (e.g., AJAX request)
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Subject:', subject);
    console.log('Message:', message);

    // Reset form fields
    contactForm.reset();
});

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
