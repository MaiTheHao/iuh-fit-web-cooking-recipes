# Guideline Triển Khai Chức Năng Yêu Thích & Phiên Bản Admin

Trong tài liệu này, bạn sẽ nhận được các thông tin hướng dẫn và luồng cần xử lý tay cho việc bổ sung 2 chức năng lớn được phân quyền thành 2 nhánh:
- **Người dùng phổ thông:** Thêm Recipe Yêu Thích.
- **Tài khoản Admin:** Xem Quản Trị (Datatable), Thêm, Xoá, Sửa (CRUD) Recipe và Blogs.

Mọi chức năng này đều sẽ đặt tập trung cấu trúc nhô ra ở giao diện trang cá nhân (Profile) nhằm tránh chỉnh sửa phức tạp vào Header. Vừa đơn giản nhưng lại bao quát toàn vẹn. Việc custom CSS, tái sử dụng các components lấy từ `component.css` hoặc sử dụng Bootstrap Utilities là **cực kỳ khuyến nghị** dựa theo (Doc 04).

---

## Tính năng 1: Danh sách Recipe Yêu Thích (Favorite Recipe)

Hệ thống Entity hiện tại (Tệp `user.entity.js`) **đã được chuẩn bị sẵn thuộc tính `#favoriteRecipes`** mang định dạng `Mảng string (Array of IDs)` để hứng dữ liệu. Bạn hãy tiếp tục phần việc:

### 1. Phía View/Controller Hiển Thị Ở Dưới Profile
- Trang `profile.html` và `ProfileController` sẽ tạo thêm một khối giao diện dưới dạng Danh sách dọc hoặc Grid cơ bản bằng `Bootstrap col`.
- Bạn không cần làm gì ở Header. 
- Mọi khi Load Profile:
  - Lấy current Session User (Đang lưu ở LocalStorage với key như `currentUser` hoặc `session`).
  - Lặp trong vòng lặp mảng `user.favoriteRecipes`.
  - Từ chuỗi `id` đó, gọi lệnh `RecipeRepository.getInstance().findById(id)`.
  - Truyền dữ liệu tìm được gọi xuống file Component chung (`VD: Component.render()`) vừa xuất hiện ở *Doc 04* và gán `innerHTML`.

### 2. Logic Thả Tim Đảo Ngược
- Chỗ người dùng bấm (Nút Tim ở Recipe Detail / Recipe Card).
- Controller xử lý sự kiện On-Click sẽ kiểm tra:
  ```javascript
  const user = SessionService.getCurrentUser();
  if(!user) return notify("Chưa đăng nhập");
  
  // Toggle: Nếu ID recipe chưa có thì push vào array, nếu có rồi thì gỡ ra.
  if(user.favoriteRecipes.includes(recipeId)) {
        user.favoriteRecipes = user.favoriteRecipes.filter(id => id !== recipeId);
  } else {
        user.favoriteRecipes.push(recipeId);
  }
  // Lưu đè lại Local Storage
  UserRepository.getInstance().save(user); // Entity tự serialize xuống.
  ```

---

## Tính năng 2: Phân Quyền Quản Trị Admin (Administration Panel)

Trong hệ thống Entity `User`, có trường `#role`. Thường có 2 giá trị: `user` (người thường) và `admin` (người quản lý).

### 1. Cơ chế Hiển thị Rẽ Nhánh Tại Profile 
Khi người dùng chạy `profile.html`:
- Controller: Kiểm tra User Role.
  ```javascript
  const user = SessionService.getCurrentUser();
  if (user.role === 'admin') {
     // Gỡ CSS 'd-none' để bật giao diện Khối Admin Control
     document.getElementById('admin-panel').classList.remove('d-none');
  }
  ```
- Lời Khuyên Giao Diện: Tại khối Admin này bạn thiết kế đơn giản 1 cái Table (bằng class `.table.table-striped` của Bootstrap5) hoặc Nav/Tab Panel Bootstrap. Có 2 Tab: "Quản lý Recipes", và "Quản lý Blog". 

### 2. Datatable cho Admin
**Hành động Đọc (Read):** Dùng `RecipeRepository.getInstance().findAll()` đổ hết recipes xuống Table, với các cột cơ bản kiểu `[ID] [Tên Món] [Thao tác(Button Sửa | Button Xóa)]`. 

**Hành động Xóa (Delete):**
Khi bấm Button "Thùng rác" của 1 hàng Datatable:
- Dùng thuộc tính data attribute chứa id gửi qua hàm Listen: `<button data-id="..." class="btn-delete">`
- Lấy id ra và nã súng: `RecipeRepository.getInstance().delete(id)`.
- Re-render Data Table (Làm mới lại giao diện table).

**Hành động Thêm/Sửa (Create/Update):**
- Đơn giản nhất là hãy dùng Modal của `Bootstrap 5`. Khi bấm Thêm: Mở 1 Modal chứa Form 1 đống Text-Input (Name, ImageURL, Config Time). 
- Bấm Gửi thì bốc toàn bộ Input gộp thành một biến Object rồi dùng JSON móc vào `new Recipe(...)` mới.
- Sau đó đẩy luồng vào `RecipeRepository.getInstance().save(newRecipe)`.

### 💡 Lưu ý Tối Ưu và Clean Code
Tất cả các chức năng Quản trị đều cực kỳ cần sử dụng chung với thành phần CSS có sẵn. Bạn sử dụng tính năng *Tái Sử Dụng* bằng tiện ích Bootstrap5:
- Form hãy sử dụng class nhập tĩnh `form-control` đã có của trang Register.
- Nút bấm Admin hãy dùng `btn btn-primary` hoặc `btn-danger`. Không cần viết CSS mới cho nút.
- Màu nhấn (Accent color) lấy từ `--primary-color` do file `root.css` quy định, chỉ dùng var(). Đừng rải rác chèn thẳng màu tĩnh (như "#ff0000").
