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

const renderMenuItems = (className) =>
  MENU_ITEMS.map(
    (item) => `<li><a href="${item.redirectPath}" class="${className}">${item.label}</a></li>`,
  ).join('');

const renderSocialIcons = (isNav = false) =>
  SOCIAL_LINKS.map(
    (link) =>
      `<${isNav ? 'a' : 'li'}${isNav ? ` href="${link.url}" target="_blank" title="${link.label}"` : ''} class="social-icon" aria-label="${link.label}">
				<i data-lucide="${link.icon}"></i>
			</${isNav ? 'a' : 'li'}>`,
  ).join('');

const renderAuthSection = () => {
  const user = AuthService.getInstance().getCurrentUser();

  if (user) {
    return `
        <div class="header__user-wrapper">
          <div class="header__user header__user--desktop" role="button">
            <img src="${user.avatar}" alt="${user.fullName}" class="header__user-avatar" />
            <span class="header__user-name fw-medium">${user.fullName}</span>
          </div>
          <ul class="header__user-menu">
            <li>
              <a href="../pages/profile.html" class="header__user-menu-item">
                <i data-lucide="user" style="width: 1em; height: 1em;"></i>
                <span>Profile</span>
              </a>
            </li>
            <li>
              <button class="header__user-menu-item logout-btn">
                <i data-lucide="log-out" style="width: 1em; height: 1em;"></i>
                <span>Logout</span>
              </button>
            </li>
          </ul>
          <a href="../pages/profile.html" class="header__user header__user--mobile" role="button">
            <img src="${user.avatar}" alt="${user.fullName}" class="header__user-avatar" />
            <span class="header__user-name fw-medium">${user.fullName}</span>
          </a>
        </div>
      `;
  }

  return `
        <a href="../pages/login.html" class="btn btn-primary header__auth-btn d-flex align-items-center gap-2">
            <i data-lucide="log-in" style="width: 1em; height: 1em;"></i> <span>Sign In</span>
        </a>
    `;
};

const Header = () => `
    <div class="header__overlay header__overlay--default"></div>
    <header class="header">
        <div class="header__container">
            <a href="${HOME_MENU_ITEM.redirectPath}" class="header__logo" title="Recipe4f Logo">
                <img src="${ASSETS.logo}" alt="Logo" />
            </a>
            <nav class="header__nav">
                <ul class="header__menu">
                    ${renderMenuItems('header__link fw-light')}
                </ul>
            </nav>
            <div class="header__actions">
                ${renderAuthSection()}
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
                    ${renderMenuItems('header__drawer-link fw-light')}
                </ul>
            </aside>
        </div>
    </header>
`;

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
                    ${renderMenuItems('footer__link fw-light')}
                </ul>
                <ul>
                    ${renderSocialIcons(true)}
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
    const root = document.getElementById('root');
    if (!root || !(root instanceof HTMLElement))
      throw new Error('Root element is required for Layout initialization.');
    if (typeof window === 'undefined') throw new Error('Window object is not available.');
    this.root = root;
  }

  init() {
    this.#renderHeader();
    this.#renderFooter();
    this.#activeNavLink();
    this.#bindEvents();
    Logger.info('Layout rendered');
  }

  #renderHeader() {
    this.root.insertAdjacentHTML('afterbegin', Header());
  }

  #renderFooter() {
    this.root.insertAdjacentHTML('beforeend', Footer());
  }

  #activeNavLink() {
    const currentPath = window.location.pathname;
    const selectors = ['.header__link', '.header__drawer-link', '.footer__link'];

    selectors.forEach((selector) => {
      this.root.querySelectorAll(selector).forEach((link) => {
        const isActive = link.getAttribute('href') === currentPath;
        link.classList.toggle('active', isActive);
      });
    });
  }

  #bindEvents() {
    if (window.lucide) window.lucide.createIcons();

    const toggleBtn = document.querySelector('.header__toggle');
    const drawer = document.querySelector('.header__drawer');
    const closeBtn = document.querySelector('.header__close-btn');
    const overlay = document.querySelector('.header__overlay');

    if (toggleBtn && drawer && closeBtn && overlay) {
      const openDrawer = () => {
        drawer.classList.add('header__drawer--open');
        overlay.classList.add('header__overlay--visible');
        overlay.classList.remove('header__overlay--hidden', 'header__overlay--default');
      };

      const closeDrawer = () => {
        drawer.classList.remove('header__drawer--open');
        overlay.classList.add('header__overlay--hidden');
        overlay.classList.remove('header__overlay--visible');
      };

      toggleBtn.addEventListener('click', openDrawer);
      closeBtn.addEventListener('click', closeDrawer);
      overlay.addEventListener('click', closeDrawer);
    }

    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        AuthService.getInstance().signout();
      });
    }
  }
}
