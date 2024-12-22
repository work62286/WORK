document.addEventListener('DOMContentLoaded', () => {
    // Configuration for video projects
    const videoProjects = [
        {
            id: 'dPS1Bd-RgE4',
            title: 'Cinematic Film Clip',
            thumbnail: 'https://i.ytimg.com/an_webp/dPS1Bd-RgE4/mqdefault_6s.webp?du=3000&sqp=CMSTn7sG&rs=AOn4CLDr8g7K3cgghmWv2rilpXxnHoekpg'
        },
        {
            id: '9PE7qN2gqEo',
            title: 'Clip',
            thumbnail: 'https://i.ytimg.com/vi/9PE7qN2gqEo/oar2.jpg?sqp=-oaymwEkCJEDENAFSFqQAgHyq4qpAxMIARUAAAAAJQAAyEI9AICiQ3gB&rs=AOn4CLAl9Mt-KrXIH2plrwjq3rSppNB_eA'
        },
        {
            id: 'uLzdLHlta9E',
            title: 'Slide Clip Example',
            thumbnail: 'https://i.ytimg.com/vi/uLzdLHlta9E/oar2.jpg?sqp=-oaymwEkCJUDENAFSFqQAgHyq4qpAxMIARUAAAAAJQAAyEI9AICiQ3gB&rs=AOn4CLDB8ErwT3G6wqMqfQ-bwO4cAsKa9Q'
        },
        {
            id: 'DRRPul-CeqE',
            title: 'Music Video',
            thumbnail: `https://i.ytimg.com/vi/DRRPul-CeqE/oar2.jpg?sqp=-oaymwEkCJUDENAFSFqQAgHyq4qpAxMIARUAAAAAJQAAyEI9AICiQ3gB&rs=AOn4CLASAio530BLWEsJgcYrs-SwhCPPFg`
        }
    ];

    // Video Grid Population
    const videoGrid = document.getElementById('video-grid');
    videoProjects.forEach(project => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');
        videoItem.dataset.video = project.id; // Set data attribute for video ID
        
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

    // Close Modal Functionality
    const closeModal = () => {
        videoModal.style.display = 'none';
        videoFrame.src = ''; // Stop video when modal is closed
    };

    closeButton.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeModal();
        }
    });

    // Navigation Toggle for Mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Navigation scroll effect
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile navigation toggle
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
