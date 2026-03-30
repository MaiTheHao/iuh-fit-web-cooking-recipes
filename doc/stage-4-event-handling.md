# Giai đoạn 4: Xử lý sự kiện & Tương tác dữ liệu

Bước cuối cùng là cho phép người dùng tương tác với danh sách: Bỏ thích món ăn ngay tại chỗ.

## 1. Lắng nghe sự kiện (Event Delegation)

Trong `bindEvents`, chúng ta thêm logic lắng nghe sự kiện click vào các nút "Bỏ thích". Lưu ý: Chúng ta dùng kỹ thuật **Event Delegation** để lắng nghe trên container cha thay vì gắn vào từng nút con.

```javascript
  bindEvents() {
    // ... code cũ ...

    // Lắng nghe click trên container của danh sách yêu thích
    if (this.favoriteListContainer) {
      this.favoriteListContainer.addEventListener('click', (e) => {
        const unfavoriteBtn = e.target.closest('.unfavorite-btn');
        if (unfavoriteBtn) {
          e.preventDefault();
          e.stopPropagation();
          const recipeId = unfavoriteBtn.dataset.id;
          this.handleRemoveFavorite(recipeId);
        }
      });
    }
  }
```

## 2. Xử lý logic Unfavorite

Viết phương thức xử lý để trao đổi với `UserService`:

```javascript
  handleRemoveFavorite = (recipeId) => {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    // Gọi Service để thực hiện thay đổi trong dữ liệu (LocalStorage)
    const result = this.userService.toggleFavorite(user.id, recipeId);
    
    if (result.success) {
      this.notification.success('Thành công', 'Đã xóa khỏi danh sách yêu thích');
      // Sau khi xóa xong, gọi lại hàm này để cập nhật lại giao diện ngay lập tức
      this.loadFavorites();
    } else {
      this.notification.error('Lỗi', result.message);
    }
  };
```

## Kết luận buổi Seminar

Chúc mừng bạn! Bạn đã hoàn thành một tính năng hoàn chỉnh theo đúng chuẩn chất lượng:
1. **Dễ bảo trì**: Code chia nhỏ thành các Service và Component.
2. **Hiệu năng**: Cập nhật DOM cục bộ, không cần tải lại toàn bộ trang.
3. **UX tốt**: Phản hồi nhanh qua Notification và tự động cập nhật số lượng.

**Bài tập mở rộng:** Thử thêm tính năng "Bỏ tất cả" (Unfavorite All) vào tiêu đề của Section.
