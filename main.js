// Form Validation and Submission
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = contactForm.querySelector('input[type="text"]').value.trim();
    const email = contactForm.querySelector('input[type="email"]').value.trim();
    const message = contactForm.querySelector('textarea').value.trim();
    const responseMessage = document.getElementById('responseMessage'); // For feedback

    if (!name || !email || !message) {
      alert("Please fill out all the fields.");
    } else if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
    } else {
      try {
        const response = await fetch('https://portfolio-1j5x.onrender.com/contact', {  // <-- UPDATE THIS LINE
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, message }),
        });

        const result = await response.json();

        if (response.ok) {
          responseMessage.textContent = result.message || 'Message sent!';
          responseMessage.style.color = 'green';
          contactForm.reset();
        } else {
          responseMessage.textContent = result.message || 'Failed to send the message.';
          responseMessage.style.color = 'red';
        }
      } catch (error) {
        responseMessage.textContent = 'An error occurred. Please try again later.';
        responseMessage.style.color = 'red';
      }
    }
  });
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Smooth Scrolling for Navigation Links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// Scroll-to-Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.textContent = '↑';
scrollToTopBtn.id = 'scrollToTop';
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.style.position = 'fixed';
scrollToTopBtn.style.bottom = '20px';
scrollToTopBtn.style.right = '20px';
scrollToTopBtn.style.display = 'none';
scrollToTopBtn.style.padding = '12px';
scrollToTopBtn.style.borderRadius = '5px';
scrollToTopBtn.style.background = 'linear-gradient(240deg, #000428, #004e92)';
scrollToTopBtn.style.color = '#fff';
scrollToTopBtn.style.border = 'none';
scrollToTopBtn.style.cursor = 'pointer';
scrollToTopBtn.style.backdropFilter = "blur(100px) ";

window.addEventListener('scroll', function() {
  scrollToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

scrollToTopBtn.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Social Media Links Hover Effect
const socialIcons = document.querySelectorAll('#social-media a');
socialIcons.forEach(icon => {
  icon.addEventListener('mouseover', () => {
    icon.style.color = '#ffcc00';
  });
  icon.addEventListener('mouseout', () => {
    icon.style.color = '';
  });
});

// Filter projects by category
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');
    projectCards.forEach(card => {
      card.style.display = (category === 'all' || card.classList.contains(category)) ? 'block' : 'none';
    });
  });
});
