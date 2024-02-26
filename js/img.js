const videoContainer = document.getElementById('video-container');
const imageContainer = document.getElementById('image-container');
const images = imageContainer.getElementsByTagName('img');

for (let i = 0; i < images.length; i++) {
    images[i].addEventListener('click', function() {
        const img = document.createElement('img');
        img.src = this.src;
        img.alt = this.alt;
        img.setAttribute('width', '1000');
        img.setAttribute('height', '560');
        videoContainer.innerHTML = '';
        videoContainer.appendChild(img);
    });
}
