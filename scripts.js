document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = 'YOUR_YOUTUBE_API_KEY';
    const CHANNEL_ID = 'YOUR_CHANNEL_ID';
    const MAX_RESULTS = 4;

    // Fetch videos from YouTube API
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`)
        .then(response => response.json())
        .then(data => {
            const videoProjects = data.items.map(item => ({
                id: item.id.videoId,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.high.url
            }));
            populateVideoGrid(videoProjects);
        })
        .catch(error => console.error('Error fetching videos:', error));

    // Populate Video Grid
    const populateVideoGrid = (videoProjects) => {
        const videoGrid = document.getElementById('video-grid');
        videoProjects.forEach(project => {
            const videoItem = document.createElement('div');
            videoItem.classList.add('video-item');
            videoItem.dataset.video = project.id;

            videoItem.innerHTML = `
                <div class="video-thumbnail">
                    <img src="${project.thumbnail}" alt="${project.title}">
                    <div class="play-button">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <h3>${project.title}</h3>
            `;

            videoGrid.appendChild(videoItem);
        });

        // Add event listeners for video items
        const videoItems = document.querySelectorAll('.video-item');
        const videoModal = document.getElementById('videoModal');
        const videoFrame = document.getElementById('videoFrame');
        const closeButton = document.querySelector('.close-button');

        videoItems.forEach(item => {
            item.addEventListener('click', () => {
                const videoId = item.dataset.video;
                videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;
                videoModal.style.display = 'flex';
            });
        });

        // Close Modal
        const closeModal = () => {
            videoModal.style.display = 'none';
            videoFrame.src = '';
        };

        closeButton.addEventListener('click', closeModal);

        // Close modal when clicking outside
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeModal();
            }
        });
    };

    // Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
