# Hướng dẫn Seminar: Triển khai tính năng Công thức yêu thích

Chào mừng các bạn đến với buổi Seminar về phát triển Frontend theo mô hình **Controller - Service - Component**. 

Trong bài hướng dẫn này, chúng ta sẽ cùng nhau triển khai tính năng hiển thị danh sách "Công thức yêu thích" ngay trong trang Hồ sơ cá nhân của người dùng.

## Mục tiêu bài học
- Hiểu cách tổ chức code theo pattern Controller - Service.
- Biết cách tái sử dụng Component (`InfoCard`).
- Làm quen với việc tương tác qua các Service (`AuthService`, `UserService`, `RecipeService`).
- Xử lý DOM và Event trong một ứng dụng Vanilla JS hiện đại.

## Danh sách các giai đoạn (Stages)

1. **[Giai đoạn 1: Xây dựng giao diện (HTML & CSS)](./stage-1-html-css.md)**
   - Thêm cấu trúc HTML cho mục yêu thích.
   - Định nghĩa các style CSS cần thiết để giao diện trông "xịn xò".

2. **[Giai đoạn 2: Khởi tạo Controller & Dependency Injection](./stage-2-controller-init.md)**
   - Import các Service cần thiết.
   - Khởi tạo các biến thành viên trong Constructor.

3. **[Giai đoạn 3: Logic Rendering & Tái sử dụng Component](./stage-3-render-logic.md)**
   - Viết hàm `loadFavorites`.
   - Sử dụng `InfoCard` để render dữ liệu động.

4. **[Giai đoạn 4: Xử lý sự kiện & Tương tác dữ liệu](./stage-4-event-handling.md)**
   - Xử lý sự kiện "Bỏ yêu thích" (Unfavorite).
   - Đồng bộ hóa dữ liệu với Repository thông qua Service.

---
*Chúc các bạn có một buổi Seminar thành công!*
