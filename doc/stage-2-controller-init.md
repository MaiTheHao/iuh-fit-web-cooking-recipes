# Giai đoạn 2: Khởi tạo Controller & Dependency Injection

Sau khi đã có giao diện, chúng ta cần cập nhật Controller để điều khiển logic cho section này.

## 1. Import các thành phần cần thiết

Mở file `assets/js/core/controllers/profile.controller.js`. Đầu tiên, chúng ta cần import thêm các Service và Component mới:

```javascript
import AuthService from '../services/auth.service.js';
import UserService from '../services/user.service.js';
import RecipeService from '../services/recipe.service.js'; // Thêm mới
import InfoCard from '../../ui/components/info-card.js'; // Thêm mới
// ... các imports khác
```

## 2. Cấu trúc Constructor

Chúng ta cần khởi tạo các Service instance và lấy tham chiếu đến các phần tử DOM đã tạo ở Stage 1:

```javascript
class ProfileController {
  constructor() {
    this.authService = AuthService.getInstance();
    this.userService = UserService.getInstance();
    this.recipeService = RecipeService.getInstance(); // Khởi tạo Service
    
    this.notification = new Notification();
    this.form = document.getElementById('profile-form');
    this.deleteBtn = document.getElementById('btn-confirm-delete');
    
    // Lấy tham chiếu DOM
    this.favoriteListContainer = document.getElementById('favorite-list');
    this.favoriteCountBadge = document.getElementById('favorite-count');
  }
  
  // ...
}
```

## 3. Cập nhật hàm khởi tạo (init)

Đừng quên gọi hàm tải dữ liệu yêu thích khi Controller được kích hoạt:

```javascript
  init() {
    if (!this.checkAuth()) return;
    this.loadUserData();
    this.loadFavorites(); // Gọi hàm này
    this.bindEvents();
    Logger.info('ProfileController initialized');
  }
```

**Câu hỏi Seminar:** Tại sao chúng ta sử dụng `getInstance()` thay vì `new Service()`?
> **Trả lời:** Đây là Singleton Pattern, đảm bảo toàn bộ ứng dụng chỉ sử dụng một instance duy nhất của Service, giúp quản lý trạng thái (state) tập trung và tiết kiệm tài nguyên.
