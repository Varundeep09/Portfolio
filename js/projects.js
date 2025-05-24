
/**
 * Projects JavaScript file for the portfolio website
 * Handles all projects-related functionality:
 * - Project filtering
 * - Project modal details
 * - Project interactions
 */

// DOM Elements
const projectFilters = document.querySelectorAll('#projects-filters li');
const projectItems = document.querySelectorAll('.projects-item');
const projectDetailsLinks = document.querySelectorAll('.projects-details-link');
const projectModal = document.getElementById('projectDetailsModal');
const projectModalTitle = document.querySelector('.project-modal-title');
const projectModalCategory = document.querySelector('.project-modal-category');
const projectModalDescription = document.querySelector('.project-modal-description');
const projectModalImg = document.querySelector('.project-modal-img');

// Project details data - in a real scenario, this could be loaded from an API or JSON file
const projectsData = [
  {
    id: 1,
    title: "E-commerce Website",
    category: "Web Development",
    description: "A fully responsive e-commerce platform built with modern web technologies. Features include user authentication, product catalog, shopping cart, payment integration, and admin dashboard for managing products and orders.",
    technologies: "HTML, CSS, JavaScript, React, Node.js, MongoDB",
    client: "RetailCorp Inc.",
    date: "January 2023",
    url: "https://example.com/ecommerce",
    imageUrl: "https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 2,
    title: "Task Management App",
    category: "App Development",
    description: "A task management application that helps users organize their projects and tasks. It includes features like task creation, due dates, priority levels, progress tracking, and team collaboration.",
    technologies: "React, Redux, Firebase, Material UI",
    client: "ProductivityTech",
    date: "March 2023",
    url: "https://example.com/taskapp",
    imageUrl: "https://images.pexels.com/photos/6456139/pexels-photo-6456139.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 3,
    title: "Brand Identity Design",
    category: "UI/UX Design",
    description: "Complete brand identity design for a tech startup. The project included logo design, color palette selection, typography guidelines, business cards, and social media templates.",
    technologies: "Figma, Adobe Illustrator, Adobe Photoshop",
    client: "TechStart Solutions",
    date: "June 2023",
    url: "https://example.com/brandidentity",
    imageUrl: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 4,
    title: "Blog Platform",
    category: "Web Development",
    description: "A modern blog platform with a focus on performance and user experience. Features include content management system, user comments, categories and tags, search functionality, and responsive design.",
    technologies: "HTML, CSS, JavaScript, Node.js, MongoDB",
    client: "ContentCreators Inc.",
    date: "August 2023",
    url: "https://example.com/blogplatform",
    imageUrl: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 5,
    title: "Weather App",
    category: "App Development",
    description: "A weather application that provides real-time weather data and forecasts. It features location-based weather updates, hourly and weekly forecasts, weather maps, and notifications for weather alerts.",
    technologies: "React Native, OpenWeatherMap API, Redux",
    client: "WeatherNow",
    date: "October 2023",
    url: "https://example.com/weatherapp",
    imageUrl: "https://images.pexels.com/photos/6633920/pexels-photo-6633920.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 6,
    title: "Mobile App UI",
    category: "UI/UX Design",
    description: "UI/UX design for a health and fitness tracking mobile application. The design focuses on user-friendly interface, intuitive navigation, and visual representation of fitness data.",
    technologies: "Figma, Adobe XD, Sketch",
    client: "FitLife Health",
    date: "December 2023",
    url: "https://example.com/appui",
    imageUrl: "https://images.pexels.com/photos/6804590/pexels-photo-6804590.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize project filtering
  initializeProjectFilters();
  
  // Initialize project details modal
  initializeProjectDetails();
  
  // Add isotope.js or similar functionality for filtering (simulated here with basic JS)
  // In a real project, you might want to use a library like Isotope.js for better animations
});

/**
 * Initialize project filtering functionality
 */
function initializeProjectFilters() {
  // Add click event for filters
  projectFilters.forEach(filter => {
    filter.addEventListener('click', function() {
      // Remove active class from all filters
      projectFilters.forEach(item => {
        item.classList.remove('filter-active');
      });
      
      // Add active class to clicked filter
      this.classList.add('filter-active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Filter projects
      filterProjects(filterValue);
    });
  });
}

/**
 * Filter projects based on selected category
 * @param {string} filter - The category to filter by
 */
function filterProjects(filter) {
  projectItems.forEach(item => {
    if (filter === '*') {
      item.style.display = 'block';
    } else if (item.classList.contains(filter)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

/**
 * Initialize project details modal functionality
 */
function initializeProjectDetails() {
  // Add click event for project detail links
  projectDetailsLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get project item
      const projectItem = this.closest('.projects-item');
      
      // Find project info
      const projectImage = projectItem.querySelector('img').src;
      const projectTitle = projectItem.querySelector('h4').textContent;
      const projectCategory = projectItem.querySelector('p').textContent;
      
      // Find project data from our dataset based on title
      const projectData = projectsData.find(project => project.title === projectTitle);
      
      if (projectData) {
        // Update modal content
        projectModalTitle.textContent = projectData.title;
        projectModalCategory.textContent = projectData.category;
        projectModalDescription.textContent = projectData.description;
        projectModalImg.src = projectData.imageUrl;
        
        // Update project info in modal
        const projectModalInfo = document.querySelector('.project-modal-info ul');
        projectModalInfo.innerHTML = `
          <li><strong>Client</strong>: ${projectData.client}</li>
          <li><strong>Date</strong>: ${projectData.date}</li>
          <li><strong>Technologies</strong>: ${projectData.technologies}</li>
          <li><strong>Website</strong>: <a href="${projectData.url}" target="_blank">${projectData.url}</a></li>
        `;
        
        // Open modal
        const modal = new bootstrap.Modal(projectModal);
        modal.show();
      }
    });
  });
}

/**
 * Animate project items on scroll into view
 */
function animateProjectItems() {
  projectItems.forEach((item, index) => {
    // Add staggered animation delay
    item.style.animationDelay = `${index * 0.1}s`;
    
    // Check if item is in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__fadeIn');
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(item);
  });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateProjectItems);