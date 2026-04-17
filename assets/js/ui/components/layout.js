const Header = () => {
  const user = AuthService.getInstance().getCurrentUser();
  const fallbackAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0RJ6oSUR7W8DB9W3TOaitZSbY8EIMLDe6Jw&s';
  const pathPrefix = window.location.pathname.includes('/admin/') ? '../' : '';

  return `
    <div class="header__overlay header__overlay--default"></div>
    <header class="header">
        <div class="header__container">
            <a href="${pathPrefix}index.html" class="header__logo" title="Recipe4f Logo">
                <img src="${pathPrefix}../assets/img/logo.svg" alt="Logo" />
            </a>
            <nav class="header__nav">
                <ul class="header__menu">
                    <li><a href="${pathPrefix}index.html" class="header__link fw-light">Home</a></li>
                    <li><a href="${pathPrefix}recipes.html" class="header__link fw-light">Recipes</a></li>
                    <li><a href="${pathPrefix}blogs.html" class="header__link fw-light">Blog</a></li>
                    <li><a href="${pathPrefix}about.html" class="header__link fw-light">About</a></li>
                    <li><a href="${pathPrefix}contact.html" class="header__link fw-light">Contact</a></li>
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
                          <a href="${pathPrefix}profile.html" class="header__user-menu-item">
                            <i data-lucide="user" style="width: 1em; height: 1em;"></i>
                            <span>Profile</span>
                          </a>
                        </li>
                        ${
                          user.role === 'admin'
                            ? `
                          <li>
                            <a href="${pathPrefix}admin/users.html" class="header__user-menu-item">
                              <i data-lucide="shield" style="width: 1em; height: 1em;"></i>
                              <span>Manage Users</span>
                            </a>
                          </li>
                          <li>
                            <a href="${pathPrefix}admin/recipes.html" class="header__user-menu-item">
                              <i data-lucide="shield" style="width: 1em; height: 1em;"></i>
                              <span>Manage Recipes</span>
                            </a>
                          </li>
                          <li>
                            <a href="${pathPrefix}admin/blogs.html" class="header__user-menu-item">
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
                      <a href="${pathPrefix}profile.html" class="header__user header__user--mobile" role="button">
                        <img src="${user.avatar}" alt="${user.fullName}" class="header__user-avatar" onerror="this.src='${fallbackAvatar}'"/>
                        <span class="header__user-name fw-medium">${user.fullName}</span>
                      </a>
                    </div>
                `
                    : `
                    <a href="${pathPrefix}login.html" class="btn btn-primary header__auth-btn d-flex align-items-center gap-2">
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
                    <li><a href="${pathPrefix}index.html" class="header__drawer-link fw-light">Home</a></li>
                    <li><a href="${pathPrefix}recipes.html" class="header__drawer-link fw-light">Recipes</a></li>
                    <li><a href="${pathPrefix}blogs.html" class="header__drawer-link fw-light">Blog</a></li>
                    <li><a href="${pathPrefix}about.html" class="header__drawer-link fw-light">About</a></li>
                    <li><a href="${pathPrefix}contact.html" class="header__drawer-link fw-light">Contact</a></li>
                </ul>
            </aside>
        </div>
    </header>
  `;
};

const Footer = () => {
  const pathPrefix = window.location.pathname.includes('/admin/') ? '../' : '';
  return `
    <footer id="app-footer">
        <div class="footer__top">
            <div class="footer__top__part footer__info">
                <a href="${pathPrefix}index.html" class="footer__logo" title="Recipe4f Logo">
                    <img src="${pathPrefix}../assets/img/logo.svg" alt="Logo" />
                </a>
                <p class="footer__description ff-main fw-light">
                    <strong class="highlight-text">Recipe4f</strong> is your ultimate destination for <strong class="fw-bold">delicious recipes</strong>, cooking tips, and culinary inspiration. Join our community of <span class="fw-medium">food enthusiasts</span> and elevate your cooking skills today!
                </p>
            </div>
            <nav class="footer__top__part footer__nav">
                <ul>
                    <li><a href="${pathPrefix}index.html" class="footer__link fw-light">Home</a></li>
                    <li><a href="${pathPrefix}recipes.html" class="footer__link fw-light">Recipes</a></li>
                    <li><a href="${pathPrefix}blogs.html" class="footer__link fw-light">Blog</a></li>
                    <li><a href="${pathPrefix}about.html" class="footer__link fw-light">About</a></li>
                    <li><a href="${pathPrefix}contact.html" class="footer__link fw-light">Contact</a></li>
                </ul>
                <ul>
                    <a href="https://www.facebook.com" target="_blank" title="Facebook" class="social-icon" aria-label="Facebook">
                        <i data-lucide="facebook"></i>
                    </a>
                    <a href="https://www.instagram.com" target="_blank" title="Instagram" class="social-icon" aria-label="Instagram">
                        <i data-lucide="instagram"></i>
                    </a>
                    <a href="https://github.com/MaiTheHao/iuh-fit-web-cooking-recipes.git" target="_blank" title="Github" class="social-icon" aria-label="Github">
                        <i data-lucide="github"></i>
                    </a>
                </ul>
            </nav>
        </div>
        <hr class="footer__divider" />
        <div class="footer__bottom">
            <p class="footer__copy">&copy; 2024 Recipe4f. All rights reserved.</p>
        </div>
    </footer>
  `;
};

document.addEventListener('DOMContentLoaded', () => {
  try {
    // Kiểm tra phần tử gốc (root) nơi sẽ chèn giao diện
    const root = document.getElementById('root');
    if (!root) throw new Error('Không tìm thấy phần tử root');

    // Chèn nội dung Header vào đầu và Footer vào cuối phần tử root
    root.insertAdjacentHTML('afterbegin', Header());
    root.insertAdjacentHTML('beforeend', Footer());

    const currentPath = window.location.pathname;
    root.querySelectorAll('.header__link, .header__drawer-link, .footer__link').forEach((link) => {
      const href = link.getAttribute('href');
      if (currentPath.endsWith(href)) {
        link.classList.add('active');
      }
    });

    // Khởi tạo các icon từ thư viện Lucide
    if (window.lucide) window.lucide.createIcons();

    // Thiết lập các sự kiện tương tác cho giao diện
    const elements = {
      toggle: document.querySelector('.header__toggle'), // Nút mở menu mobile
      drawer: document.querySelector('.header__drawer'), // Thanh menu mobile
      close: document.querySelector('.header__close-btn'), // Nút đóng menu mobile
      overlay: document.querySelector('.header__overlay'), // Lớp phủ mờ khi mở menu
      logout: document.querySelector('.logout-btn'), // Nút đăng xuất
    };

    // Xử lý đóng/mở menu mobile
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

    // Xử lý sự kiện đăng xuất
    if (elements.logout) {
      elements.logout.onclick = () => {
        AuthService.getInstance().signout(); // Gọi service xóa session/token
        window.location.reload(); // Tải lại trang để cập nhật trạng thái
      };
    }
  } catch (e) {
    console.error('Lỗi khi khởi tạo Layout:', e.message);
  }
});
