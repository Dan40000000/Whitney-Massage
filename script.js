// Responsive Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Smooth scroll for anchor links
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
      navLinks.classList.remove('active');
    }
  });
});

// Booking Modal
const bookBtn = document.getElementById('bookBtn');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('closeModal');
const bookingForm = document.getElementById('bookingForm');

bookBtn.addEventListener('click', () => modal.classList.remove('hidden'));
closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

bookingForm.addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you! Your booking request has been received.');
  modal.classList.add('hidden');
  bookingForm.reset();
});
