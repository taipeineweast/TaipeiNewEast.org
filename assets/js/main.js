/* ======================================
   台北新東扶輪社 — Main JavaScript
   ====================================== */

document.addEventListener('DOMContentLoaded', function () {

  // ---- Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
  }

  // ---- Mobile menu toggle ----
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
      const icon = menuBtn.querySelector('svg');
      if (mobileMenu.classList.contains('open')) {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
      } else {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
      }
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        const icon = menuBtn.querySelector('svg');
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
      });
    });
  }

  // ---- Scroll reveal ----
  const reveals = document.querySelectorAll('.reveal');
  function checkReveal() {
    reveals.forEach(function (el) {
      const top = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (top < windowHeight - 80) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', checkReveal);
  checkReveal(); // Check on load

  // ---- Load news from JSON ----
  const newsContainer = document.getElementById('news-container');
  if (newsContainer) {
    fetch('../data/news.json')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        // Determine current language from URL path
        const path = window.location.pathname;
        let lang = 'zh';
        if (path.includes('/en/')) lang = 'en';
        else if (path.includes('/ja/')) lang = 'ja';

        const items = data.news || [];
        if (items.length === 0) {
          newsContainer.innerHTML = '<p class="text-gray-500 text-center">暫無最新消息</p>';
          return;
        }

        let html = '';
        items.slice(0, 3).forEach(function (item) {
          const title = item['title_' + lang] || item.title_zh;
          const summary = item['summary_' + lang] || item.summary_zh;
          html += '<div class="news-card bg-white rounded-xl p-6 shadow-sm border border-gray-100">' +
            '<div class="text-sm text-rotary-sky font-semibold mb-2">' + item.date + '</div>' +
            '<h3 class="text-lg font-bold text-rotary-blue mb-2">' + title + '</h3>' +
            '<p class="text-gray-600 text-sm leading-relaxed">' + summary + '</p>' +
            '</div>';
        });
        newsContainer.innerHTML = html;
      })
      .catch(function () {
        // Silently fail — news section shows static fallback
      });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const y = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

});
