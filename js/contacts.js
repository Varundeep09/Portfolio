/**
 * Contact form JavaScript file for the portfolio website
 * Handles contact form validation and submission
 */

// DOM Elements
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const loadingDiv = document.querySelector('.loading');
const sentMessageDiv = document.querySelector('.sent-message');
const errorMessageDiv = document.querySelector('.error-message');

// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize contact form validation and submission
  if (contactForm) {
    initializeContactForm();
  }
});

/**
 * Initialize contact form event listeners and validation
 */
function initializeContactForm() {
  // Add form submission event listener
  contactForm.addEventListener('submit', handleFormSubmit);
  
  // Add input validation event listeners
  nameInput.addEventListener('blur', () => validateField(nameInput, 'Please enter your name'));
  emailInput.addEventListener('blur', () => validateEmail(emailInput));
  subjectInput.addEventListener('blur', () => validateField(subjectInput, 'Please enter a subject'));
  messageInput.addEventListener('blur', () => validateField(messageInput, 'Please enter your message'));
}

/**
 * Handle form submission
 * @param {Event} e - The form submission event
 */
function handleFormSubmit(e) {
  e.preventDefault();
  
  // Hide previous messages
  resetMessages();
  
  // Validate all fields
  const isNameValid = validateField(nameInput, 'Please enter your name');
  const isEmailValid = validateEmail(emailInput);
  const isSubjectValid = validateField(subjectInput, 'Please enter a subject');
  const isMessageValid = validateField(messageInput, 'Please enter your message');
  
  // If all fields are valid, submit the form
  if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
    submitForm();
  }
}

/**
 * Validate a form field
 * @param {HTMLElement} field - The field to validate
 * @param {string} errorMessage - The error message to display if validation fails
 * @returns {boolean} - Whether the field is valid
 */
function validateField(field, errorMessage) {
  if (field.value.trim() === '') {
    field.classList.add('is-invalid');
    field.nextElementSibling?.remove(); // Remove any existing error message
    
    // Create and append error message
    const error = document.createElement('div');
    error.classList.add('invalid-feedback');
    error.textContent = errorMessage;
    field.parentNode.appendChild(error);
    
    return false;
  } else {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    field.nextElementSibling?.remove(); // Remove any existing error message
    
    return true;
  }
}

/**
 * Validate email field
 * @param {HTMLElement} field - The email field to validate
 * @returns {boolean} - Whether the email is valid
 */
function validateEmail(field) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (field.value.trim() === '') {
    field.classList.add('is-invalid');
    field.nextElementSibling?.remove(); // Remove any existing error message
    
    // Create and append error message
    const error = document.createElement('div');
    error.classList.add('invalid-feedback');
    error.textContent = 'Please enter your email';
    field.parentNode.appendChild(error);
    
    return false;
  } else if (!emailRegex.test(field.value.trim())) {
    field.classList.add('is-invalid');
    field.nextElementSibling?.remove(); // Remove any existing error message
    
    // Create and append error message
    const error = document.createElement('div');
    error.classList.add('invalid-feedback');
    error.textContent = 'Please enter a valid email address';
    field.parentNode.appendChild(error);
    
    return false;
  } else {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    field.nextElementSibling?.remove(); // Remove any existing error message
    
    return true;
  }
}

/**
 * Reset form messages
 */
function resetMessages() {
  loadingDiv.style.display = 'none';
  sentMessageDiv.style.display = 'none';
  errorMessageDiv.style.display = 'none';
}

/**
 * Submit the contact form
 * In a real scenario, this would send data to a server
 * Here we're simulating a successful submission
 */
function submitForm() {
  // Show loading message
  loadingDiv.style.display = 'block';
  
  // Simulate form submission with a timeout
  setTimeout(() => {
    // Hide loading message
    loadingDiv.style.display = 'none';
    
    // Show success message
    sentMessageDiv.style.display = 'block';
    
    // Reset form fields
    contactForm.reset();
    
    // Remove validation classes
    const formInputs = contactForm.querySelectorAll('.form-control');
    formInputs.forEach(input => {
      input.classList.remove('is-valid');
    });
    
    // Reset form after 5 seconds
    setTimeout(() => {
      sentMessageDiv.style.display = 'none';
    }, 5000);
  }, 2000);
  
  // In a real application, you would use fetch or axios to send the form data to a server
  // Example:
  /*
  fetch('https://api.example.com/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: nameInput.value,
      email: emailInput.value,
      subject: subjectInput.value,
      message: messageInput.value,
    }),
  })
    .then(response => response.json())
    .then(data => {
      loadingDiv.style.display = 'none';
      
      if (data.success) {
        sentMessageDiv.style.display = 'block';
        contactForm.reset();
      } else {
        errorMessageDiv.textContent = data.message || 'An error occurred. Please try again.';
        errorMessageDiv.style.display = 'block';
      }
    })
    .catch(error => {
      loadingDiv.style.display = 'none';
      errorMessageDiv.textContent = 'An error occurred. Please try again.';
      errorMessageDiv.style.display = 'block';
    });
  */
}

/**
 * Display custom error message
 * @param {string} message - The error message to display
 */
function showError(message) {
  errorMessageDiv.textContent = message;
  errorMessageDiv.style.display = 'block';
  
  // Hide error after 5 seconds
  setTimeout(() => {
    errorMessageDiv.style.display = 'none';
  }, 5000);
}

/**
 * Add special effects to the contact form
 */
function addContactFormEffects() {
  const formGroups = document.querySelectorAll('.form-group');
  
  formGroups.forEach(group => {
    const input = group.querySelector('.form-control');
    const label = group.querySelector('label');
    
    if (input && label) {
      // Add focus effect
      input.addEventListener('focus', () => {
        label.classList.add('active');
      });
      
      // Remove focus effect if input is empty
      input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
          label.classList.remove('active');
        }
      });
      
      // Check if input has value on page load
      if (input.value.trim() !== '') {
        label.classList.add('active');
      }
    }
  });
}

// Initialize form effects when DOM is loaded
document.addEventListener('DOMContentLoaded', addContactFormEffects);