document.addEventListener('DOMContentLoaded', () => {
    const CHANNEL_ID = 'UCsFTeOmrtn4GOmZUHqdHUEg';
    const MAX_RESULTS = 50; // Increase the number of results to fetch more videos
    const PROXY_URL = 'https://api.allorigins.win/get?url=';
    const FETCH_INTERVAL = 300000; // Fetch every 5 minutes (in milliseconds)
    const CACHE_KEY = 'videoProjectsCache';
    const CACHE_EXPIRY_KEY = 'videoProjectsCacheExpiry';

    const fetchVideos = (forceRefresh = false) => {
        // Fetch videos from YouTube RSS feed using a proxy
        fetch(`${PROXY_URL}${encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data); // Debug log
                const parser = new DOMParser();
                const xml = parser.parseFromString(data.contents, 'text/xml');
                const items = xml.getElementsByTagName('entry');
                console.log('Parsed XML items:', items); // Debug log
                const videoProjects = Array.from(items).slice(0, MAX_RESULTS).map(item => {
                    const videoIdElement = item.getElementsByTagName('yt:videoId')[0] || item.getElementsByTagName('yt\\:videoId')[0];
                    const titleElement = item.getElementsByTagName('title')[0];
                    const thumbnailElement = item.getElementsByTagName('media:thumbnail')[0] || item.getElementsByTagName('media\\:thumbnail')[0];
                    
                    if (!videoIdElement || !titleElement || !thumbnailElement) {
                        console.error('Missing element in item:', item);
                        return null;
                    }

                    return {
                        id: videoIdElement.textContent,
                        title: titleElement.textContent,
                        thumbnail: thumbnailElement.getAttribute('url')
                    };
                }).filter(project => project !== null);
                console.log('Parsed video projects:', videoProjects); // Debug log
                const cachedVideoProjects = getCachedVideoProjects();
                if (forceRefresh || JSON.stringify(cachedVideoProjects) !== JSON.stringify(videoProjects)) {
                    console.log('Cache invalidated'); // Debug log
                    cacheVideoProjects(videoProjects);
                }
                populateVideoGrid(videoProjects);
            })
            .catch(error => console.error('Error fetching videos:', error));
    };

    const cacheVideoProjects = (videoProjects) => {
        console.log('Caching video projects:', videoProjects); // Debug log
        localStorage.setItem(CACHE_KEY, JSON.stringify(videoProjects));
        localStorage.setItem(CACHE_EXPIRY_KEY, Date.now() + FETCH_INTERVAL);
    };

    const getCachedVideoProjects = () => {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cacheExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);
        if (cachedData && cacheExpiry && Date.now() < cacheExpiry) {
            console.log('Using cached data:', cachedData); // Debug log
            return JSON.parse(cachedData);
        }
        return null;
    };

    // Populate Video Grid
    const populateVideoGrid = (videoProjects) => {
        console.log('Populating video grid with:', videoProjects); // Debug log
        const videoGrid = document.getElementById('video-grid');
        videoGrid.innerHTML = ''; // Clear existing videos
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

    // Check for cached data
    const cachedVideoProjects = getCachedVideoProjects();
    if (cachedVideoProjects) {
        console.log('Using cached data'); // Debug log
        populateVideoGrid(cachedVideoProjects);
    } else {
        // Initial fetch
        fetchVideos();
    }

    // Periodically fetch videos
    setInterval(fetchVideos, FETCH_INTERVAL);

    // Handle refresh button click
    const refreshButton = document.getElementById('refreshButton');
    refreshButton.addEventListener('click', () => {
        console.log('Refresh button clicked'); // Debug log
        fetchVideos(true); // Force refresh
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
