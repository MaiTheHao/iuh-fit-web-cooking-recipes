import { ROUTES } from '../../core/router/const.js';
import Logger from '../../utils/logger.js';
import AuthService from '../../core/services/auth.service.js';

const MENU_ITEMS = Object.values(ROUTES).filter((route) =>
  ['Home', 'Recipes', 'Blog', 'About', 'Contact'].includes(route.label),
);
const HOME_MENU_ITEM = MENU_ITEMS.find((item) => item.label.match(/^Home/i));

const SOCIAL_LINKS = [
  { icon: 'facebook', label: 'Facebook', url: 'https://www.facebook.com' },
  { icon: 'instagram', label: 'Instagram', url: 'https://www.instagram.com' },
  {
    icon: 'github',
    label: 'Github',
    url: 'https://github.com/MaiTheHao/iuh-fit-web-cooking-recipes.git',
  },
];

const ASSETS = {
  logo: '../assets/img/logo.svg',
};

const Header = () => {
  const user = AuthService.getInstance().getCurrentUser();
  const fallbackAvatar =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0RJ6oSUR7W8DB9W3TOaitZSbY8EIMLDe6Jw&s';

  return `
    <div class="header__overlay header__overlay--default"></div>
    <header class="header">
        <div class="header__container">
            <a href="${HOME_MENU_ITEM.redirectPath}" class="header__logo" title="Recipe4f Logo">
                <img src="${ASSETS.logo}" alt="Logo" />
            </a>
            <nav class="header__nav">
                <ul class="header__menu">
                    ${MENU_ITEMS.map(
                      (item) =>
                        `<li><a href="${item.redirectPath}" class="header__link fw-light">${item.label}</a></li>`,
                    ).join('')}
                </ul>
            </nav>
            <div class="header__actions">
                ${
                  user
                    ? `
                    <div class="header__user-wrapper">
                      <div class="header__user header__user--desktop" role="button">
                        <img src="${user.avatar}" alt="${user.fullName}" class="header__user-avatar" onerror="this.src='${fallbackAvatar}'"/>
                        <span class="header__user-name fw-medium">${user.fullName}</span>
                      </div>
                      <ul class="header__user-menu">
                        <li>
                          <a href="${ROUTES.PROFILE.redirectPath}" class="header__user-menu-item">
                            <i data-lucide="user" style="width: 1em; height: 1em;"></i>
                            <span>Profile</span>
                          </a>
                        </li>
                        ${
                          user.role === 'admin'
                            ? `
                          <li>
                            <a href="${ROUTES.ADMIN_USERS.redirectPath}" class="header__user-menu-item">
                              <i data-lucide="shield" style="width: 1em; height: 1em;"></i>
                              <span>Manage Users</span>
                            </a>
                          </li>
                          <li>
                            <a href="${ROUTES.ADMIN_RECIPES.redirectPath}" class="header__user-menu-item">
                              <i data-lucide="shield" style="width: 1em; height: 1em;"></i>
                              <span>Manage Recipes</span>
                            </a>
                          </li>
                          <li>
                            <a href="${ROUTES.ADMIN_BLOGS.redirectPath}" class="header__user-menu-item">
                              <i data-lucide="shield" style="width: 1em; height: 1em;"></i>
                              <span>Manage Blogs</span>
                            </a>
                          </li>
                        `
                            : ''
                        }
                        <li>
                          <button class="header__user-menu-item logout-btn">
                            <i data-lucide="log-out" style="width: 1em; height: 1em;"></i>
                            <span>Logout</span>
                          </button>
                        </li>
                      </ul>
                      <a href="${ROUTES.PROFILE.redirectPath}" class="header__user header__user--mobile" role="button">
                        <img src="${user.avatar}" alt="${user.fullName}" class="header__user-avatar" onerror="this.src='${fallbackAvatar}'"/>
                        <span class="header__user-name fw-medium">${user.fullName}</span>
                      </a>
                    </div>
                `
                    : `
                    <a href="../pages/login.html" class="btn btn-primary header__auth-btn d-flex align-items-center gap-2">
                        <i data-lucide="log-in" style="width: 1em; height: 1em;"></i> <span>Sign In</span>
                    </a>
                `
                }
                <button class="header__toggle" aria-label="Open Menu">
                    <i data-lucide="menu"></i>
                </button>
            </div>
            <aside class="header__drawer">
                <div class="header__drawer-top">
                    <h3 class="ff-serif"><span class="highlight-text">RECIPE4F</span> Menu</h3>
                    <button class="header__close-btn" aria-label="Close Menu">
                        <i data-lucide="x"></i>
                    </button>
                </div>
                <ul class="header__drawer-menu">
                    ${MENU_ITEMS.map(
                      (item) =>
                        `<li><a href="${item.redirectPath}" class="header__drawer-link fw-light">${item.label}</a></li>`,
                    ).join('')}
                </ul>
            </aside>
        </div>
    </header>
  `;
};

const Footer = () => `
    <footer id="app-footer">
        <div class="footer__top">
            <div class="footer__top__part footer__info">
                <a href="${HOME_MENU_ITEM.redirectPath}" class="footer__logo" title="Recipe4f Logo">
                    <img src="${ASSETS.logo}" alt="Logo" />
                </a>
                <p class="footer__description ff-main fw-light">
                    <strong class="highlight-text">Recipe4f</strong> is your ultimate destination for <strong class="fw-bold">delicious recipes</strong>, cooking tips, and culinary inspiration. Join our community of <span class="fw-medium">food enthusiasts</span> and elevate your cooking skills today!
                </p>
            </div>
            <nav class="footer__top__part footer__nav">
                <ul>
                    ${MENU_ITEMS.map(
                      (item) =>
                        `<li><a href="${item.redirectPath}" class="footer__link fw-light">${item.label}</a></li>`,
                    ).join('')}
                </ul>
                <ul>
                    ${SOCIAL_LINKS.map(
                      (link) => `
                        <a href="${link.url}" target="_blank" title="${link.label}" class="social-icon" aria-label="${link.label}">
                            <i data-lucide="${link.icon}"></i>
                        </a>
                      `,
                    ).join('')}
                </ul>
            </nav>
        </div>
        <hr class="footer__divider" />
        <div class="footer__bottom">
            <p class="footer__copy">&copy; 2024 Recipe4f. All rights reserved.</p>
        </div>
    </footer>
`;

export class Layout {
  constructor() {
    this.root = document.getElementById('root');
    if (!this.root) throw new Error('Root element not found');
  }

  init() {
    this.root.insertAdjacentHTML('afterbegin', Header());
    this.root.insertAdjacentHTML('beforeend', Footer());

    this.#activeNavLink();
    this.#bindEvents();
    Logger.info('Layout initialized');
  }

  #activeNavLink() {
    const currentPath = window.location.pathname;
    this.root
      .querySelectorAll('.header__link, .header__drawer-link, .footer__link')
      .forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === currentPath);
      });
  }

  #bindEvents() {
    if (window.lucide) window.lucide.createIcons();

    const elements = {
      toggle: document.querySelector('.header__toggle'),
      drawer: document.querySelector('.header__drawer'),
      close: document.querySelector('.header__close-btn'),
      overlay: document.querySelector('.header__overlay'),
      logout: document.querySelector('.logout-btn'),
    };

    if (elements.toggle && elements.drawer && elements.overlay) {
      const toggleDrawer = (isOpen) => {
        elements.drawer.classList.toggle('header__drawer--open', isOpen);
        elements.overlay.classList.toggle('header__overlay--visible', isOpen);
        elements.overlay.classList.toggle('header__overlay--hidden', !isOpen);
      };

      elements.toggle.onclick = () => toggleDrawer(true);
      if (elements.close) elements.close.onclick = () => toggleDrawer(false);
      elements.overlay.onclick = () => toggleDrawer(false);
    }

    if (elements.logout) {
      elements.logout.onclick = () => {
        AuthService.getInstance().signout();
        window.location.reload();
      };
    }
  }
}
