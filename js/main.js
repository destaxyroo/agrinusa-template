document.addEventListener('DOMContentLoaded', function() {

  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 800);

  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
        }
      }
    });
  });

  const header = document.querySelector('header');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 120) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
  });

  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.produk-card');

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterBtns.forEach(function(b) {
        b.classList.remove('active');
      });
      this.classList.add('active');
      const filter = this.dataset.filter;

      productCards.forEach(function(card) {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Mengirim...';
      btn.disabled = true;
      formStatus.innerHTML = '';
      formStatus.className = '';

      setTimeout(function() {
        formStatus.innerHTML = '✅ Pesan berhasil dikirim!';
        formStatus.className = 'success';
        btn.textContent = 'Terkirim!';
        btn.style.background = '#1a5a2a';

        setTimeout(function() {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '';
          contactForm.reset();

          setTimeout(function() {
            formStatus.innerHTML = '';
            formStatus.className = '';
          }, 3000);
        }, 2000);
      }, 1500);
    });
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.layanan-card, .produk-card, .testimoni-card, .service-card-full, .visi-card, .tim-card, .proses-card').forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

});