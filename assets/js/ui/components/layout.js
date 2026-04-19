document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (!root) return;

  const id = localStorage.getItem('CURRENT_USER_ID');
  const user = id ? JSON.parse(localStorage.getItem('RECIPE4F_USERS') || '[]').find((u) => u.id === id) : null;
  const fallback = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0RJ6oSUR7W8DB9W3TOaitZSbY8EIMLDe6Jw&s';
  const isAdmin = user?.role === 'admin';

  root.insertAdjacentHTML(
    'afterbegin',
    `
      <div class="header__overlay header__overlay--default"></div>
      <header class="header">
        <div class="header__container">
          <a href="index.html" class="header__logo"><img src="../assets/img/logo.svg" alt="Logo" /></a>
          <nav class="header__nav">
            <ul class="header__menu">
              <li><a href="index.html" class="header__link fw-light">Home</a></li>
              <li><a href="recipes.html" class="header__link fw-light">Recipes</a></li>
              <li><a href="blogs.html" class="header__link fw-light">Blog</a></li>
              <li><a href="about.html" class="header__link fw-light">About</a></li>
              <li><a href="contact.html" class="header__link fw-light">Contact</a></li>
            </ul>
          </nav>
          <div class="header__actions">
            ${
              user
                ? `
              <div class="header__user-wrapper">
                <div class="header__user header__user--desktop" role="button">
                  <img src="${user.avatar}" alt="${user.fullName}" class="header__user-avatar" onerror="this.src='${fallback}'"/>
                  <span class="header__user-name fw-medium">${user.fullName}</span>
                </div>
                <ul class="header__user-menu">
                  <li><a href="profile.html" class="header__user-menu-item"><i data-lucide="user"></i><span>Profile</span></a></li>
                  ${
                    isAdmin
                      ? `
                    <li><a href="admin/users.html" class="header__user-menu-item"><i data-lucide="shield"></i><span>Manage Users</span></a></li>
                    <li><a href="admin/recipes.html" class="header__user-menu-item"><i data-lucide="shield"></i><span>Manage Recipes</span></a></li>
                    <li><a href="admin/blogs.html" class="header__user-menu-item"><i data-lucide="shield"></i><span>Manage Blogs</span></a></li>
                  `
                      : ''
                  }
                  <li><button class="header__user-menu-item logout-btn"><i data-lucide="log-out"></i><span>Logout</span></button></li>
                </ul>
              </div>
            `
                : `
              <a href="login.html" class="btn btn-primary header__auth-btn d-flex align-items-center gap-2">
                <i data-lucide="log-in"></i> <span>Sign In</span>
              </a>
            `
            }
            <button class="header__toggle" aria-label="Open Menu"><i data-lucide="menu"></i></button>
          </div>
          <aside class="header__drawer">
            <div class="header__drawer-top">
              <h3 class="ff-serif"><span class="highlight-text">RECIPE4F</span> Menu</h3>
              <button class="header__close-btn"><i data-lucide="x"></i></button>
            </div>
            <ul class="header__drawer-menu">
              <li><a href="index.html" class="header__drawer-link fw-light">Home</a></li>
              <li><a href="recipes.html" class="header__drawer-link fw-light">Recipes</a></li>
              <li><a href="blogs.html" class="header__drawer-link fw-light">Blog</a></li>
              <li><a href="about.html" class="header__drawer-link fw-light">About</a></li>
              <li><a href="contact.html" class="header__drawer-link fw-light">Contact</a></li>
            </ul>
          </aside>
        </div>
      </header>
    `,
  );

  root.insertAdjacentHTML(
    'beforeend',
    `
      <footer id="app-footer">
        <div class="footer__top">
          <div class="footer__top__part footer__info">
            <a href="index.html" class="footer__logo"><img src="../assets/img/logo.svg" alt="Logo" /></a>
            <p class="footer__description ff-main fw-light">
              <strong class="highlight-text">Recipe4f</strong> is your ultimate destination for recipes and cooking tips.
            </p>
          </div>
          <nav class="footer__top__part footer__nav">
            <ul>
              <li><a href="index.html" class="footer__link fw-light">Home</a></li>
              <li><a href="recipes.html" class="footer__link fw-light">Recipes</a></li>
              <li><a href="blogs.html" class="footer__link fw-light">Blog</a></li>
            </ul>
            <ul class="d-flex gap-3">
              <a href="#" class="social-icon"><i data-lucide="facebook"></i></a>
              <a href="#" class="social-icon"><i data-lucide="instagram"></i></a>
              <a href="#" class="social-icon"><i data-lucide="github"></i></a>
            </ul>
          </nav>
        </div>
        <hr class="footer__divider" />
        <div class="footer__bottom"><p class="footer__copy">&copy; 2024 Recipe4f. All rights reserved.</p></div>
      </footer>
    `,
  );

  const toggle = document.querySelector('.header__toggle');
  const drawer = document.querySelector('.header__drawer');
  const close = document.querySelector('.header__close-btn');
  const overlay = document.querySelector('.header__overlay');
  const logout = document.querySelector('.logout-btn');

  const setDrawer = (open) => {
    drawer?.classList.toggle('header__drawer--open', open);
    overlay?.classList.toggle('header__overlay--visible', open);
    overlay?.classList.toggle('header__overlay--hidden', !open);
  };

  if (toggle) toggle.onclick = () => setDrawer(true);
  if (close) close.onclick = () => setDrawer(false);
  if (overlay) overlay.onclick = () => setDrawer(false);
  if (logout)
    logout.onclick = () => {
      localStorage.removeItem('CURRENT_USER_ID');
      window.location.reload();
    };

  const path = window.location.pathname;
  root.querySelectorAll('.header__link, .header__drawer-link, .footer__link').forEach((link) => {
    if (path.endsWith(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });

  if (window.lucide) window.lucide.createIcons();
});
