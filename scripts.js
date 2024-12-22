document.addEventListener('DOMContentLoaded', () => {
    // Configuration for video projects
    const videoProjects = [
        {
            id: 'dQw4w9WgXcQ',
            title: 'Cinematic Weddidng Film',
            thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`
        },
        {
            id: '9bZkp7q19f0',
            title: 'Commercial Advertisement',
            thumbnail: `https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg`
        },
        {
            id: 'JGwWNGJdvx8',
            title: 'Music Video',
            thumbnail: `https://img.youtube.com/vi/JGwWNGJdvx8/maxresdefault.jpg`
        },
{
            id: 'uLzdLHlta9E',
            title: 'Music Video',
            thumbnail: `https://img.youtube.com/vi/JGwWNGJdvx8/maxresdefault.jpg`
        }
        
    ];

    // Video Grid Population
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

    // Video Modal Functionality
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

    // Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) { e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
