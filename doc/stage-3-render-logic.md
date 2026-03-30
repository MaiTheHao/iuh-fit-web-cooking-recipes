# Giai đoạn 3: Logic Rendering & Tái sử dụng Component

Đây là phần quan trọng nhất: Lấy dữ liệu từ Service và hiển thị lên màn hình bằng Component.

## 1. Phương thức loadFavorites

Thêm phương thức này vào class `ProfileController`:

```javascript
  loadFavorites() {
    if (!this.favoriteListContainer) return;

    // 1. Lấy thông tin User hiện tại
    const user = this.authService.getCurrentUser();
    if (!user || !user.favoriteRecipes) return;

    // 2. Lấy danh sách chi tiết các công thức từ Service
    const favoriteIds = user.favoriteRecipes;
    const favorites = this.recipeService.getFavorites(favoriteIds);

    // 3. Cập nhật số lượng trên Badge
    if (this.favoriteCountBadge) {
      this.favoriteCountBadge.textContent = `${favorites.length} món`;
    }

    // 4. Xử lý trường hợp danh sách trống
    if (favorites.length === 0) {
      this.renderEmptyState();
      return;
    }

    // 5. Render danh sách bằng InfoCard
    this.renderFavoriteList(favorites);
  }
```

## 2. Render danh sách bằng InfoCard

Chúng ta sẽ sử dụng class `InfoCard` để tạo ra các thẻ HTML một cách sạch sẽ:

```javascript
  renderFavoriteList(favorites) {
    this.favoriteListContainer.innerHTML = favorites
      .map((recipe) => {
        const card = new InfoCard({
          image: recipe.image,
          title: recipe.name,
          description: recipe.description.substring(0, 80) + '...',
          href: `recipe-detail.html?code=${recipe.code}`,
          imageAlt: recipe.name,
          footerHtml: `
            <div class="d-flex justify-content-between align-items-center">
              <span class="text-warning d-flex align-items-center gap-1">
                <i data-lucide="star" style="width: 14px; height: 14px; fill: currentColor;"></i>
                ${recipe.stars}
              </span>
              <button class="unfavorite-btn" data-id="${recipe.id}">
                <i data-lucide="heart-off" style="width: 14px; height: 14px;"></i> Bỏ thích
              </button>
            </div>
          `,
        });
        return `<div class="col-md-6 col-lg-4">${card.render()}</div>`;
      })
      .join('');

    // Khởi tạo lại icons cho các phần tử vừa mới render
    if (window.lucide) window.lucide.createIcons();
  }
```

**Điểm nhấn công nghệ:**
- **`InfoCard` Component**: Giúp tách biệt logic hiển thị khỏi logic xử lý dữ liệu.
- **Template String & Map**: Thay vì dùng vòng lặp `for`, chúng ta dùng `map` để tạo chuỗi HTML cực kỳ ngắn gọn và dễ hiểu.
