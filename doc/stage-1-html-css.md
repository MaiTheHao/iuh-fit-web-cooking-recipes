# Giai đoạn 1: Xây dựng giao diện (HTML & CSS)

Trong giai đoạn này, chúng ta sẽ chuẩn bị "khung xương" cho tính năng mới.

## 1. Cấu trúc HTML

Mở file `pages/profile.html`, tìm đến trước phần `<div class="danger-zone">` và thêm đoạn code sau:

```html
<div class="favorite-section mt-5" id="favorite-recipes-section">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h3 class="font-serif mb-0">Món ăn yêu thích của tôi</h3>
    <span id="favorite-count" class="badge bg-primary rounded-pill">0 món</span>
  </div>
  <div id="favorite-list" class="row g-4">
    <!-- Danh sách sẽ được render tự động bằng JavaScript -->
    <div class="col-12 text-center py-5">
      <div class="text-muted">
        <i data-lucide="heart" class="mb-2" style="width: 48px; height: 48px; opacity: 0.2;"></i>
        <p>Bạn chưa lưu công thức nào.</p>
        <a href="recipes.html" class="btn btn-outline-primary btn-sm mt-2">Khám phá ngay</a>
      </div>
    </div>
  </div>
</div>
```

**Giải thích:**
- `favorite-list`: Là container nơi chúng ta sẽ inject code HTML từ Controller.
- `favorite-count`: Hiển thị tổng số lượng công thức yêu thích.
- `data-lucide`: Sử dụng thư viện Lucide để hiển thị icon.

---

## 2. Định dạng CSS

Mở file `assets/css/pages/profile.css` và thêm các style để trang trí:

```css
/* Favorite Section */
.favorite-section {
  padding-top: 3rem;
  border-top: 1px solid var(--color-border);
  margin-bottom: 3rem;
}

.favorite-section h3 {
  color: var(--color-text-primary);
  font-size: 1.5rem;
}

#favorite-list .info-card {
  transition: transform 0.2s ease-in-out;
}

#favorite-list .info-card:hover {
  transform: translateY(-5px);
}

.unfavorite-btn {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  color: var(--color-error);
  padding: 0.4rem 0.8rem;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.unfavorite-btn:hover {
  background: var(--color-error-bg);
  color: var(--color-error);
  border-color: var(--color-error-border);
}
```

**Lưu ý:** Chúng ta sử dụng các biến CSS (`var(--color-...)`) đã được định nghĩa sẵn trong hệ thống để đảm bảo tính nhất quán về màu sắc.
