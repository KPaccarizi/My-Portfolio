'use strict';



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }


}



function toggle_light_mode() {
  const body = document.body;
  body.classList.toggle('dark-mode');

  // Save the mode to localStorage
  if(body.classList.contains('dark-mode')) {
      localStorage.setItem('dark-mode', 'true');
  } else {
      localStorage.setItem('dark-mode', 'false');
  }
}

// Check saved mode on page load
window.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('dark-mode') === 'true') {
      document.body.classList.add('dark-mode');
      document.getElementById('dark_toggler').checked = true;
  } else {
      document.body.classList.remove('dark-mode');
      document.getElementById('dark_toggler').checked = false;
  }
});



/**
 * NAVBAR TOGGLE FOR MOBILE
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER
 * active header when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});



/**
 * SCROLL REVEAL
 */

const revealElements = document.querySelectorAll("[data-reveal]");
const revealDelayElements = document.querySelectorAll("[data-reveal-delay]");

const reveal = function () {
  for (let i = 0, len = revealElements.length; i < len; i++) {
    if (revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.2) {
      revealElements[i].classList.add("revealed");
    }
  }
}

for (let i = 0, len = revealDelayElements.length; i < len; i++) {
  revealDelayElements[i].style.transitionDelay = revealDelayElements[i].dataset.revealDelay;
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);


document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  const form = this;
  const formData = new FormData(form);

  // Initialize EmailJS with your user ID
  emailjs.init('52jlHWUaDr76JBPHc'); // Replace 'YOUR_USER_ID' with your EmailJS user ID


  emailjs.sendForm('service_gg5f5ta', 'template_xfjfskc', formData)
    .then(response => {
      console.log('Success:', response);
      alert('Thank you for your message! I will get back to you as soon as possible.');
      form.reset(); // Reset the form after successful submission
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Oops! Something went wrong. Please try again.');
    });
});

