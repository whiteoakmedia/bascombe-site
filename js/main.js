/* Bascombe Landscaping — Main JS */
(function() {
  'use strict';

  /* --- Nav scroll effect --- */
  var nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  /* --- Mobile menu --- */
  var menuBar = document.querySelector('.menu-bar');
  var mobileMenu = document.querySelector('.mobile-menu');
  if (menuBar && mobileMenu) {
    menuBar.addEventListener('click', function() {
      menuBar.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        menuBar.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Mobile dropdown --- */
  document.querySelectorAll('.nav-dropdown').forEach(function(dd) {
    var trigger = dd.querySelector('.nav-link');
    if (trigger) {
      trigger.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dd.classList.toggle('open');
        }
      });
    }
  });

  /* --- Scroll reveal --- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function(el) { observer.observe(el); });
  }

  /* --- Contact form via Formspree --- */
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var data = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function(response) {
        if (response.ok) {
          form.style.display = 'none';
          var success = document.querySelector('.form-success');
          if (success) success.style.display = 'block';
        }
      });
    });
  }

})();
