document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
  });

  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      portfolioCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      const checkboxes = contactForm.querySelectorAll('input[type="checkbox"]:checked');
      data.services = Array.from(checkboxes).map(cb => cb.value);

      const message = encodeURIComponent(
        `Bonjour CraftStand.ma!\n\n` +
        `Nom: ${data.name || 'Non spécifié'}\n` +
        `Tél: ${data.phone || 'Non spécifié'}\n` +
        `Email: ${data.email || 'Non spécifié'}\n` +
        `Type de projet: ${data.projectType || 'Non spécifié'}\n` +
        `Ville: ${data.city || 'Non spécifié'}\n` +
        `Date souhaitée: ${data.date || 'Non spécifié'}\n` +
        `Heure: ${data.time || 'Non spécifié'}\n` +
        `Services: ${data.services.join(', ') || 'Aucun'}\n` +
        `Message: ${data.message || 'Aucun message'}`
      );

      window.open(`https://wa.me/212663558868?text=${message}`, '_blank');
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const service = urlParams.get('service');
  if (service) {
    const select = document.querySelector('select[name="projectType"]');
    if (select) {
      select.value = service;
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
