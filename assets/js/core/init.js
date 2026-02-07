import UserRepository from './repositories/user.repository.js';
import RecipeRepository from './repositories/recipe.repository.js';
import CategoryRepository from './repositories/category.repository.js';
import BlogPostRepository from './repositories/blog-post.repository.js';
import User from './entities/user.entity.js';
import Recipe from './entities/recipe.entity.js';
import Category from './entities/category.entity.js';
import BlogPost from './entities/blog-post.entity.js';
import Logger from '../utils/logger.js';

const INIT_KEY = 'APP_INITIALIZED';
const VERSION = '08-02-2026-1:01';

const initData = () => {
  if (localStorage.getItem(INIT_KEY) === VERSION && VERSION !== null) {
    Logger.info('--- MOCK DATA ALREADY INITIALIZED ---');
    return;
  }

  localStorage.removeItem('USERS');
  localStorage.removeItem('RECIPES');
  localStorage.removeItem('CATEGORIES');
  localStorage.removeItem('BLOG_POSTS');

  const userRepo = UserRepository.getInstance();
  const recipeRepo = RecipeRepository.getInstance();
  const categoryRepo = CategoryRepository.getInstance();
  const blogPostRepo = BlogPostRepository.getInstance();

  const users = [
    new User({
      id: 'u1',
      fullName: 'Mai Thế Hào',
      email: 'hao.mai@example.com',
      password: 'abc123456',
      role: 'admin',
      avatar:
        'https://static.vecteezy.com/system/resources/previews/025/738/217/original/anime-black-and-white-isolated-icon-illustration-vector.jpg',
    }),
    new User({
      id: 'u2',
      fullName: 'Phạm Quý Hương',
      email: 'huong.pham@example.com',
      password: 'abc123456',
      role: 'user',
      avatar: 'https://freestylized.com/wp-content/uploads/2024/11/sky_26-768x768.webp',
    }),
    new User({
      id: 'u3',
      fullName: 'Trần Văn Nam',
      email: 'nam.tran@example.com',
      password: 'abc123456',
      role: 'user',
      avatar:
        'https://tse1.mm.bing.net/th/id/OIP.hp-Tsbnv6yy2RrcWRo9mVgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    }),
  ];

  userRepo.saveBatch(users);

  const categories = [
    new Category({
      id: 'c1',
      code: 'CATE_VEGAN',
      name: 'Vegan',
      description: 'Các món ăn thuần thực vật, thanh đạm.',
    }),
    new Category({
      id: 'c2',
      code: 'CATE_MEAT',
      name: 'Meat & Seafood',
      description: 'Các món chế biến từ thịt, cá, hải sản.',
    }),
    new Category({
      id: 'c3',
      code: 'CATE_DESSERT',
      name: 'Dessert',
      description: 'Bánh ngọt, chè, kem và đồ ngọt.',
    }),
    new Category({
      id: 'c4',
      code: 'CATE_DRINK',
      name: 'Drinks',
      description: 'Sinh tố, nước ép, cocktail.',
    }),
    new Category({
      id: 'c5',
      code: 'CATE_BREAKFAST',
      name: 'Breakfast',
      description: 'Năng lượng cho ngày mới.',
    }),
  ];

  categoryRepo.saveBatch(categories);

  const recipes = [
    new Recipe({
      id: 'r1',
      code: 'REC_PHO_BO',
      name: 'Phở Bò Truyền Thống',
      description:
        'Món ăn quốc hồn quốc túy của Việt Nam. Nước dùng thơm phức mùi quế hồi, hòa quyện cùng bánh phở mềm và thịt bò ngọt lịm.',
      ingredients: [
        {
          section: 'Nguyên liệu chính',
          items: [
            { name: 'Bánh phở', quantity: '500g' },
            { name: 'Thịt bò tái', quantity: '300g' },
            { name: 'Xương ống', quantity: '1kg' },
          ],
        },
        {
          section: 'Hương liệu',
          items: [
            { name: 'Quế, hồi, thảo quả', quantity: '1 gói' },
            { name: 'Hành tây, hành lá', quantity: 'Vừa đủ' },
          ],
        },
      ],
      directions: `
### Bước 1: Sơ chế và Hầm xương
1. Xương ống rửa sạch, chần qua nước sôi 5 phút để khử sạch bụi bẩn và mùi hôi.
2. Nướng vàng **gừng**, **hành tím**, **hành tây** và các loại hương liệu (quế, hồi) để dậy mùi thơm.
3. Cho xương vào nồi lớn, thêm 3-4 lít nước. Thêm các nguyên liệu đã nướng và 1 thìa muối.
4. Ninh nhỏ lửa trong khoảng **6-8 tiếng**.

### Bước 2: Nấu nước dùng
- Sau khi hầm đủ thời gian, vớt xương và hương liệu ra.
- Lọc lại nước dùng qua rây cho trong.
- Nêm nếm thêm nước mắm, hạt nêm, đường phèn cho vị ngọt thanh đậm đà.

### Bước 3: Trình bày và Thưởng thức
1. Thái thịt bò thành lát mỏng (ngang thớ). Cắt nhỏ hành lá, rau thơm.
2. Chần bánh phở qua nước sôi rồi cho vào tô.
3. Xếp thịt bò tái lên trên, rắc hành lá.
4. Chan nước dùng **đang sôi sùng sục** trực tiếp lên thịt bò để làm chín tái.

> **Mẹo:** Nên ăn kèm với quẩy, chanh tươi, ớt tươi và dấm tỏi để tròn vị.
`,
      prepTime: 30,
      cookTime: 360,
      categoryId: 'c2',
      authorId: 'u1',
      image:
        'https://file.hstatic.net/200000700229/article/pho-bo-ha-noi-thumb_980349ef2bcf40c9b736a672e5a944d3.jpg',
      nutrition: {
        calories: 450,
        protein: 25,
        fat: 12,
        carbs: 58,
        cholesterol: 65,
      },
      stars: 5,
    }),

    new Recipe({
      id: 'r2',
      code: 'REC_SALAD_BO',
      name: 'Salad Bơ Trứng',
      description:
        'Món khai vị healthy, giàu chất béo tốt. Phù hợp cho người ăn kiêng và giảm cân.',
      ingredients: [
        {
          section: 'Thành phần',
          items: [
            { name: 'Bơ sáp', quantity: '2 quả' },
            { name: 'Trứng gà', quantity: '2 quả' },
            { name: 'Xà lách', quantity: '200g' },
            { name: 'Sốt Mayonnaise', quantity: '2 thìa' },
          ],
        },
      ],
      directions: `
### Bước 1: Sơ chế nguyên liệu
- **Trứng gà:** Luộc chín (hoặc lòng đào tùy sở thích trong 6-7 phút), bóc vỏ và cắt múi cau.
- **Bơ sáp:** Cắt đôi, bỏ hạt, lột vỏ và cắt thành miếng vuông hạt lựu vừa ăn.
- **Rau xà lách:** Rửa sạch, ngâm nước muối loãng 5 phút, vẩy ráo nước rồi cắt khúc.

### Bước 2: Làm sốt trộn (Tùy chọn)
- Nếu không dùng sốt Mayonnaise nguyên bản, bạn có thể trộn Mayonnaise với một chút tương ớt, nước cốt chanh và tiêu xay để tạo vị chua cay nhẹ.

### Bước 3: Trộn salad
1. Cho xà lách vào tô lớn làm lớp lót.
2. Xếp lần lượt bơ và trứng lên trên.
3. Rưới nước sốt đều khắp mặt salad.
4. Trộn nhẹ tay ngay trước khi ăn để rau không bị nát.

> **Lưu ý:** Bơ sau khi cắt nên trộn ngay hoặc vắt chút chanh để không bị thâm đen.
`,
      prepTime: 15,
      cookTime: 10,
      categoryId: 'c1',
      authorId: 'u2',
      image:
        'https://file.hstatic.net/1000337345/article/screenshot_2023-02-16_145739_1855658674884e3f927b0cc5083bb720_1024x1024.png',
      nutrition: {
        calories: 320,
        protein: 9,
        fat: 28,
        carbs: 12,
        cholesterol: 185,
      },
      stars: 4,
    }),

    new Recipe({
      id: 'r3',
      code: 'REC_BANH_FLAN',
      name: 'Bánh Flan Caramen',
      description:
        'Béo ngậy vị trứng sữa, thơm lừng mùi caramen đắng nhẹ. Món tráng miệng hoàn hảo.',
      ingredients: [
        {
          section: 'Hỗn hợp trứng',
          items: [
            { name: 'Trứng gà', quantity: '5 quả' },
            { name: 'Sữa tươi', quantity: '500ml' },
            { name: 'Vani', quantity: '1 ống' },
          ],
        },
        {
          section: 'Caramen',
          items: [
            { name: 'Đường cát', quantity: '100g' },
            { name: 'Nước', quantity: '50ml' },
          ],
        },
      ],
      directions: `
### Bước 1: Thắng đường Caramen
1. Cho đường và nước vào nồi, đun lửa vừa. **Tuyệt đối không khuấy** để tránh lại đường.
2. Khi nước đường chuyển sang màu cánh gián (nâu hổ phách), tắt bếp ngay.
3. Nhanh tay tráng một lớp mỏng caramen vào đáy các khuôn bánh. Để nguội cho đông lại.

### Bước 2: Pha hỗn hợp trứng sữa
- Đập trứng ra tô (lấy cả lòng trắng và đỏ), khuấy nhẹ tay theo một chiều để trứng tan nhưng **không tạo bọt khí**.
- Đun sữa tươi ấm (khoảng 70 độ C - sờ thấy, chưa sôi), cho đường vào hòa tan.
- Đổ từ từ sữa ấm vào tô trứng, vừa đổ vừa khuấy nhẹ. Thêm vani.
- Lọc hỗn hợp qua rây 1-2 lần cho thật mịn.

### Bước 3: Hấp bánh
1. Đổ hỗn hợp trứng sữa vào các khuôn đã có caramen.
2. Xếp vào nồi hấp hoặc khay nướng cách thủy.
3. Hấp lửa nhỏ trong khoảng **30-40 phút**.

> **Bí quyết:** Phủ khăn lên miệng nồi hấp để hơi nước không nhỏ xuống làm rỗ mặt bánh.
`,
      prepTime: 20,
      cookTime: 40,
      categoryId: 'c3',
      authorId: 'u2',
      image:
        'https://cdn.tgdd.vn/Files/2020/04/20/1250342/2-cach-lam-banh-flan-mem-min-khong-tanh-ngay-tai-nha-202106182157209970.jpg',
      nutrition: {
        calories: 180,
        protein: 6,
        fat: 7,
        carbs: 24,
        cholesterol: 120,
      },
      stars: 5,
    }),

    new Recipe({
      id: 'r4',
      code: 'REC_SUON_XAO_CHUA_NGOT',
      name: 'Sườn Xào Chua Ngọt',
      description: 'Sườn non mềm thấm đẫm sốt chua ngọt đậm đà. Món mặn cực kỳ đưa cơm.',
      ingredients: [
        {
          section: 'Chính',
          items: [
            { name: 'Sườn non', quantity: '500g' },
            { name: 'Cà chua', quantity: '2 quả' },
          ],
        },
        {
          section: 'Gia vị sốt',
          items: [{ name: 'Giấm, đường, tỏi, ớt', quantity: 'Vừa đủ' }],
        },
      ],
      directions: `
### Bước 1: Sơ chế sườn
- Sườn non rửa sạch với nước muối, chặt miếng vừa ăn.
- Chần sườn qua nước sôi 2 phút để sạch bọt bẩn, vớt ra để ráo.
- Ướp sườn với 1 thìa nước mắm, hành tím băm trong 15 phút.

### Bước 2: Chiên sườn
1. Làm nóng chảo dầu, cho sườn vào chiên sơ sao cho vàng đều các mặt (không chiên quá khô).
2. Vớt sườn ra đĩa.

### Bước 3: Làm sốt chua ngọt
- Phi thơm hành tỏi băm. Cho cà chua thái hạt lựu vào xào nhuyễn.
- Pha hỗn hợp sốt: 3 thìa giấm (hoặc chanh/me), 2 thìa đường, 2 thìa nước mắm, 1 chút tương ớt, 1 chút nước lọc.
- Đổ hỗn hợp vào chảo cà chua, đun sôi sệt lại.

### Bước 4: Hoàn thiện
- Đổ sườn đã chiên vào chảo sốt. Đảo đều tay lửa nhỏ cho sốt bám đều quanh miếng sườn.
- Đun thêm 5-7 phút cho thấm vị. Tắt bếp và rắc hành lá.
`,
      prepTime: 20,
      cookTime: 30,
      categoryId: 'c2',
      authorId: 'u1',
      image:
        'https://cdn.tgdd.vn/Files/2019/10/06/1205476/cach-lam-suon-xao-chua-ngot-mien-bac-dep-mat-va-ngon-com-202202241319497834.jpg',
      nutrition: {
        calories: 350,
        protein: 18,
        fat: 22,
        carbs: 15,
        cholesterol: 80,
      },
      stars: 5,
    }),

    new Recipe({
      id: 'r5',
      code: 'REC_SINH_TO_XOAI',
      name: 'Sinh Tố Xoài Chuối',
      description:
        'Giải nhiệt mùa hè với vị ngọt tự nhiên từ trái cây tươi. Thơm ngon và mát lạnh.',
      ingredients: [
        {
          section: 'Hoa quả',
          items: [
            { name: 'Xoài chín', quantity: '1 quả' },
            { name: 'Chuối', quantity: '1 quả' },
          ],
        },
        {
          section: 'Phụ gia',
          items: [
            { name: 'Sữa chua', quantity: '1 hộp' },
            { name: 'Đá xay', quantity: '1 cốc' },
          ],
        },
      ],
      directions: `
### Bước 1: Chuẩn bị trái cây
- **Xoài:** Gọt vỏ, cắt lấy phần thịt má xoài, thái miếng nhỏ.
- **Chuối:** Bóc vỏ, cắt khoanh tròn.
- **Lưu ý:** Để sinh tố ngon và đặc hơn, bạn có thể để trái cây đã cắt vào ngăn đá tủ lạnh khoảng 30 phút trước khi xay.

### Bước 2: Xay sinh tố
1. Cho lần lượt xoài, chuối vào cối xay sinh tố.
2. Thêm 1 hộp sữa chua (có đường hoặc không đường tùy khẩu vị).
3. Thêm đá bào (hoặc đá viên nhỏ) và khoảng 30ml sữa tươi/sữa đặc nếu muốn ngọt béo hơn.
4. Bấm máy xay nhuyễn mịn đến khi hỗn hợp có màu vàng tươi đẹp mắt.

### Bước 3: Thưởng thức
- Đổ ra ly cao.
- Trang trí bằng một lát xoài hoặc vài lá bạc hà. Uống ngay khi còn lạnh.
`,
      prepTime: 10,
      cookTime: 10,
      categoryId: 'c4',
      authorId: 'u3',
      image:
        'https://file.hstatic.net/200000700229/article/sinh-to-chuoi-xoai-thumb_798b914b42454d07abb183db5c879609.jpg',
      nutrition: {
        calories: 160,
        protein: 4,
        fat: 2,
        carbs: 35,
        cholesterol: 5,
      },
      stars: 3,
    }),

    new Recipe({
      id: 'r6',
      code: 'REC_BANH_MI',
      name: 'Bánh Mì Thập Cẩm',
      description: 'Bữa sáng nhanh gọn, đầy đủ dinh dưỡng với vỏ bánh giòn rụm.',
      ingredients: [
        {
          section: 'Thành phần',
          items: [
            { name: 'Bánh mì', quantity: '1 ổ' },
            { name: 'Pate', quantity: '1 thìa' },
            { name: 'Chả lụa', quantity: '3 lát' },
            { name: 'Rau (Dưa leo, ngò)', quantity: 'Vừa đủ' },
          ],
        },
      ],
      directions: `
### Bước 1: Chuẩn bị bánh mì
1. Nếu bánh mì bị ỉu, hãy nướng lại trong lò nướng hoặc áp chảo nóng trong 1-2 phút cho vỏ bánh giòn tan.
2. Dùng dao rạch dọc một bên thân bánh.

### Bước 2: Thêm nhân
1. Phết một lớp **pate gan** mỏng đều vào hai bên ruột bánh.
2. Nếu thích béo, có thể phết thêm một lớp bơ trứng gà hoặc sốt mayonnaise.
3. Xếp lần lượt dưa leo thái lát dọc, chả lụa, thịt nguội vào giữa.
4. Thêm ngò rí, hành lá, đồ chua (cà rốt, củ cải ngâm giấm).

### Bước 3: Gia vị
- Rưới một chút nước tương (xì dầu) và tương ớt dọc theo chiều dài nhân bánh.
- Kẹp bánh lại và thưởng thức ngay khi vỏ còn nóng giòn.

> **Mẹo:** Nên làm nóng lại bánh mì trước khi kẹp nhân để đảm bảo độ ngon nhất.
`,
      prepTime: 5,
      cookTime: 5,
      categoryId: 'c5',
      authorId: 'u3',
      image: 'https://cdn2.fptshop.com.vn/unsafe/800x0/banh_mi_thap_cam_5_0e3359c2bf.jpg',
      nutrition: {
        calories: 420,
        protein: 15,
        fat: 18,
        carbs: 48,
        cholesterol: 40,
      },
      stars: 4,
    }),

    new Recipe({
      id: 'r7',
      code: 'REC_CANH_CHUA_CA_LOC',
      name: 'Canh Chua Cá Lóc',
      description: 'Hương vị miền Tây dân dã. Vị chua thanh của me hòa quyện với thịt cá ngọt mềm.',
      ingredients: [
        {
          section: 'Cá',
          items: [{ name: 'Cá lóc', quantity: '500g' }],
        },
        {
          section: 'Rau & Gia vị',
          items: [
            { name: 'Me chua', quantity: '1 vắt' },
            { name: 'Bạc hà, đậu bắp, giá', quantity: '300g' },
            { name: 'Rau om, ngò gai', quantity: '1 nắm' },
          ],
        },
      ],
      directions: `
### Bước 1: Sơ chế cá lóc
- Cá lóc làm sạch, đánh vẩy, cạo nhớt bằng chanh và muối.
- Cắt cá thành các khứa dày khoảng 2-3cm.
- Ướp cá với 1 thìa nước mắm, tiêu, đầu hành băm.

### Bước 2: Chuẩn bị rau củ
- Me chín ngâm nước ấm, dầm nát lấy nước cốt.
- Thơm (dứa) cắt lát. Cà chua cắt múi cau.
- Bạc hà (dọc mùng) tước vỏ, cắt lát chéo. Đậu bắp cắt chéo.
- Rau om, ngò gai thái nhỏ.

### Bước 3: Nấu canh
1. Phi thơm tỏi băm, cho cá vào chiên sơ cho săn thịt rồi vớt ra (để cá không bị tanh khi nấu).
2. Đun sôi nồi nước (khoảng 1 lít), cho nước cốt me vào.
3. Thả cá vào nấu chín (khoảng 5-7 phút), vớt bọt.
4. Lần lượt cho thơm, cà chua, đậu bắp, bạc hà, giá đỗ vào nấu vừa chín tới.
5. Nêm đường, nước mắm, muối cho có vị **chua - ngọt - mặn** hài hòa.

### Bước 4: Hoàn thành
- Tắt bếp ngay khi rau vừa chín.
- Rắc rau om, ngò gai và ớt lát lên trên. Múc ra tô dùng nóng.
`,
      prepTime: 20,
      cookTime: 25,
      categoryId: 'c2',
      authorId: 'u1',
      image:
        'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2024_3_31_638474737289073713_nau-canh-chua-ca-loc.jpg',
      nutrition: {
        calories: 150,
        protein: 20,
        fat: 4,
        carbs: 10,
        cholesterol: 45,
      },
      stars: 3,
    }),
    new Recipe({
      id: 'r8',
      code: 'REC_BUN_CHA',
      name: 'Bún Chả Hà Nội',
      description:
        'Tinh hoa ẩm thực Hà Thành. Chả nướng than hoa thơm lừng ăn kèm nước chấm chua ngọt và rau sống.',
      ingredients: [
        {
          section: 'Thịt & Chả',
          items: [
            { name: 'Thịt ba chỉ', quantity: '500g' },
            { name: 'Thịt nạc vai xay', quantity: '300g' },
            { name: 'Sả, hành tím', quantity: 'Vừa đủ' },
          ],
        },
        {
          section: 'Ăn kèm',
          items: [
            { name: 'Bún tươi', quantity: '1kg' },
            { name: 'Đu đủ, cà rốt', quantity: '1 củ' },
            { name: 'Rau sống', quantity: '1 rổ' },
          ],
        },
      ],
      directions: `
### Bước 1: Ướp thịt (Quan trọng nhất)
- **Gia vị ướp:** Sả băm, hành tím băm, nước mắm ngon, đường, nước hàng (nước màu), một chút dầu hào và tiêu.
- **Thịt miếng:** Thái ba chỉ miếng mỏng vừa ăn. Ướp với gia vị trên.
- **Chả viên:** Trộn thịt xay với gia vị, vo thành viên tròn nhỏ rồi ấn dẹt.
- Để thịt thấm gia vị ít nhất **30 phút** (ngon nhất là để qua đêm trong tủ lạnh).

### Bước 2: Nướng thịt
- Kẹp thịt vào vỉ nướng.
- Nướng trên than hoa là ngon nhất. Quạt đều tay, lật liên tục để thịt chín vàng ruộm, hơi xém cạnh và dậy mùi thơm khói.

### Bước 3: Pha nước chấm & Dưa góp
- **Dưa góp:** Đu đủ xanh, cà rốt thái lát mỏng, ngâm giấm đường cho giòn.
- **Nước chấm:** Pha theo tỷ lệ 1 mắm : 1 đường : 1 giấm : 5 nước lọc. Đun ấm hoặc dùng nước sôi để nguội. Thêm tỏi ớt băm nhuyễn.
- Thả dưa góp và chả nướng vào bát nước chấm.

### Bước 4: Thưởng thức
- Dọn kèm bún rối và đĩa rau sống tía tô, xà lách.
- Gắp bún nhúng vào bát chả nóng hổi và thưởng thức.
`,
      prepTime: 40,
      cookTime: 20,
      categoryId: 'c2',
      authorId: 'u1',
      image: 'https://sunhouse.com.vn/pic/news/images/image-20211229181528-1.jpeg',
      nutrition: {
        calories: 550,
        protein: 28,
        fat: 25,
        carbs: 60,
        cholesterol: 70,
      },
      stars: 5,
    }),

    new Recipe({
      id: 'r9',
      code: 'REC_DAU_HU_SOT_CA',
      name: 'Đậu Hũ Sốt Cà Chua',
      description:
        'Món chay quốc dân đơn giản mà đưa cơm. Đậu hũ chiên vàng thấm đẫm sốt cà chua đậm đà.',
      ingredients: [
        {
          section: 'Chính',
          items: [
            { name: 'Đậu hũ trắng', quantity: '4 bìa' },
            { name: 'Cà chua chín', quantity: '3 quả' },
          ],
        },
        {
          section: 'Gia vị',
          items: [
            { name: 'Hành tím, hành lá', quantity: '1 ít' },
            { name: 'Nước mắm chay/Muối', quantity: 'Vừa đủ' },
          ],
        },
      ],
      directions: `
### Bước 1: Chiên đậu hũ
1. Đậu hũ rửa nhẹ, cắt miếng vuông vừa ăn.
2. Thấm khô nước để khi chiên không bị bắn dầu.
3. Chiên đậu trong chảo dầu nóng đến khi lớp vỏ ngoài vàng rụm. Vớt ra để ráo dầu.

### Bước 2: Làm sốt cà chua
1. Cà chua rửa sạch, cắt miếng nhỏ hoặc thái hạt lựu.
2. Phi thơm hành tím băm (hoặc đầu hành trắng).
3. Cho cà chua vào xào, nêm một chút muối để cà chua nhanh mềm. Dầm nhuyễn tạo thành hỗn hợp sệt.

### Bước 3: Rim đậu
- Cho đậu hũ đã chiên vào chảo sốt.
- Thêm khoảng nửa bát nước lọc, nêm nước mắm (chay/mặn), hạt nêm, đường cho vừa miệng.
- Đun lửa nhỏ khoảng **5-10 phút** cho gia vị ngấm sâu vào miếng đậu.
- Khi nước sốt sệt lại, cho hành lá thái nhỏ, rắc tiêu và tắt bếp.
`,
      prepTime: 10,
      cookTime: 15,
      categoryId: 'c1',
      authorId: 'u2',
      image:
        'https://www.thatlangon.com/wp-content/uploads/2021/06/cong-thuc-cach-lam-dau-sot-ca-chua.jpg',
      nutrition: {
        calories: 200,
        protein: 12,
        fat: 10,
        carbs: 15,
        cholesterol: 0,
      },
      stars: 3,
    }),

    new Recipe({
      id: 'r10',
      code: 'REC_TRA_DAO_CAM_SA',
      name: 'Trà Đào Cam Sả',
      description:
        'Thức uống giải nhiệt sành điệu. Vị chát nhẹ của trà kết hợp vị ngọt thanh của đào và hương sả nồng nàn.',
      ingredients: [
        {
          section: 'Pha chế',
          items: [
            { name: 'Trà túi lọc', quantity: '1 gói' },
            { name: 'Đào ngâm', quantity: '2 miếng' },
            { name: 'Cam vàng', quantity: '1 lát' },
            { name: 'Sả cây', quantity: '2 cây' },
          ],
        },
      ],
      directions: `
### Bước 1: Nấu nước cốt sả
- Sả cây rửa sạch, đập dập, cắt khúc ngắn.
- Đun sôi khoảng 300ml nước với sả trong 5 phút để lấy tinh dầu thơm.

### Bước 2: Ủ trà
- Dùng nước sả nóng (90 độ C) để ủ trà túi lọc (Trà đào hoặc Earl Grey) trong khoảng 3-5 phút.
- Bỏ túi trà, để nguội bớt.

### Bước 3: Pha chế
1. Cho vào bình lắc (shaker): Nước trà sả, 20ml siro đào (từ hộp đào ngâm), 10ml nước đường.
2. Vắt lấy nước cốt của nửa quả cam (để lại 1 lát trang trí).
3. Thêm đầy đá viên. Đậy nắp và lắc mạnh tay đến khi bình lạnh buốt.

### Bước 4: Trình bày
- Đổ ra ly cao.
- Trang trí bằng đào miếng cắt lát, một lát cam vàng và một cây sả tươi.
`,
      prepTime: 10,
      cookTime: 5,
      categoryId: 'c4',
      authorId: 'u3',
      image:
        'https://th.bing.com/th/id/OIP.nUDz8X3RAO7t8EPkvOvHUAHaE8?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
      nutrition: {
        calories: 120,
        protein: 0,
        fat: 0,
        carbs: 30,
        cholesterol: 0,
      },
      stars: 4,
    }),

    new Recipe({
      id: 'r11',
      code: 'REC_CHE_KHUC_BACH',
      name: 'Chè Khúc Bạch',
      description:
        'Món tráng miệng thanh mát. Viên khúc bạch béo ngậy tan trong miệng cùng hạnh nhân lát giòn tan.',
      ingredients: [
        {
          section: 'Thạch',
          items: [
            { name: 'Whipping cream', quantity: '200ml' },
            { name: 'Sữa tươi', quantity: '200ml' },
            { name: 'Gelatin', quantity: '10g' },
          ],
        },
        {
          section: 'Nước dùng',
          items: [
            { name: 'Đường phèn', quantity: '100g' },
            { name: 'Nhãn/Vải', quantity: '200g' },
            { name: 'Hạnh nhân lát', quantity: '20g' },
          ],
        },
      ],
      directions: `
### Bước 1: Làm thạch Khúc Bạch
1. Ngâm gelatin trong nước lạnh 15 phút cho nở mềm.
2. Đun sữa tươi và whipping cream, đường trên lửa nhỏ (không để sôi bùng).
3. Cho gelatin đã ngâm vào nồi sữa, khuấy tan hoàn toàn. (Có thể thêm trà xanh hoặc cacao ở bước này để tạo màu).
4. Đổ ra khuôn, để nguội và cho vào tủ lạnh ngăn mát 3-4 tiếng cho đông đặc.

### Bước 2: Nấu nước đường
- Đun 1 lít nước với đường phèn. Cho thêm bó lá dứa cho thơm.
- Khi nước sôi, cho cơm nhãn (đã bỏ hạt) hoặc vải vào trần sơ rồi tắt bếp ngay để giữ độ giòn. Để nguội.

### Bước 3: Hoàn thiện
1. Rang vàng hạnh nhân lát trong chảo (không cần dầu) đến khi thơm.
2. Dùng dao gợn sóng cắt thạch khúc bạch thành miếng vừa ăn.
3. Cho thạch vào bát, thêm nhãn, chan nước đường và rắc hạnh nhân lên trên.
4. Thêm đá bào và thưởng thức.
`,
      prepTime: 30,
      cookTime: 240,
      categoryId: 'c3',
      authorId: 'u2',
      image:
        'https://tse1.mm.bing.net/th/id/OIP.F7-D-Pw-p74UZOnk58y5hwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',
      nutrition: {
        calories: 300,
        protein: 5,
        fat: 18,
        carbs: 35,
        cholesterol: 40,
      },
      stars: 3,
    }),

    new Recipe({
      id: 'r12',
      code: 'REC_XOI_GAC',
      name: 'Xôi Gấc Đậu Xanh',
      description:
        'Món ăn sáng may mắn với màu đỏ tự nhiên. Hạt nếp dẻo thơm quyện vị bùi của đậu xanh.',
      ingredients: [
        {
          section: 'Nguyên liệu',
          items: [
            { name: 'Gạo nếp cái hoa vàng', quantity: '500g' },
            { name: 'Gấc chín', quantity: '1/2 quả' },
            { name: 'Đậu xanh', quantity: '200g' },
            { name: 'Rượu trắng', quantity: '1 thìa' },
          ],
        },
      ],
      directions: `
### Bước 1: Ngâm gạo và Chuẩn bị Gấc
- Gạo nếp vo sạch, ngâm qua đêm (6-8 tiếng) rồi vớt ra để ráo, xóc với chút muối.
- Bổ gấc lấy ruột. Trộn thịt gấc với 1 thìa **rượu trắng** để gấc dậy màu đỏ tươi.
- Trộn đều gấc với gạo nếp, bóp nhẹ tay cho màu ngấm đều vào gạo.

### Bước 2: Làm nhân đậu xanh
- Đậu xanh ngâm mềm, hấp chín.
- Nghiền nhuyễn đậu xanh với chút đường và dầu ăn, sên lửa nhỏ cho dẻo mịn.

### Bước 3: Đồ xôi
1. Cho gạo vào chõ đồ xôi. Hấp khoảng 30 phút.
2. Mở vung, rưới 2 thìa mỡ gà hoặc dầu ăn vào đảo đều cho xôi bóng.
3. Đồ thêm 10 phút nữa cho hạt xôi chín dẻo.

### Bước 4: Đóng khuôn
- Cho một lớp xôi vào khuôn, nén nhẹ.
- Thêm một lớp đậu xanh ở giữa.
- Phủ tiếp một lớp xôi lên trên, nén chặt và lấy ra đĩa.
`,
      prepTime: 60,
      cookTime: 40,
      categoryId: 'c5',
      authorId: 'u1',
      image:
        'https://file.hstatic.net/200000624211/file/10_82c93d5d5dba4eb8a045194429cebfda_grande.jpg',
      nutrition: {
        calories: 400,
        protein: 10,
        fat: 8,
        carbs: 70,
        cholesterol: 0,
      },
      stars: 5,
    }),

    new Recipe({
      id: 'r13',
      code: 'REC_GA_CHIEN_MAM',
      name: 'Cánh Gà Chiên Nước Mắm',
      description: 'Lớp da giòn rụm, thịt bên trong mềm ẩm. Vị mặn ngọt kích thích vị giác cực độ.',
      ingredients: [
        {
          section: 'Thịt',
          items: [{ name: 'Cánh gà', quantity: '500g' }],
        },
        {
          section: 'Sốt mắm',
          items: [
            { name: 'Nước mắm ngon', quantity: '3 thìa' },
            { name: 'Đường', quantity: '2 thìa' },
            { name: 'Tỏi băm', quantity: '1 củ' },
          ],
        },
      ],
      directions: `
### Bước 1: Chiên gà
1. Cánh gà rửa sạch nước muối loãng, chặt khúc ngay khớp hoặc để nguyên. Thấm khô.
2. Có thể áo một lớp bột chiên giòn mỏng (tùy chọn) để da giòn lâu hơn.
3. Chiên gà ngập dầu với lửa vừa đến khi vàng ruộm. Vớt ra giấy thấm dầu.

### Bước 2: Làm sốt mắm tỏi
- Pha hỗn hợp: 3 thìa nước mắm + 2 thìa đường + 1 thìa tương ớt + 1 thìa nước lọc. Khuấy tan.
- Phi thơm tỏi băm trong chảo dầu (lấy bớt dầu chiên gà ra) đến khi vàng thơm thì vớt xác tỏi ra riêng (để giữ độ giòn).

### Bước 3: Xóc chảo
1. Đổ bát nước sốt vào chảo, đun sôi lăn tăn cho sệt lại.
2. Cho cánh gà đã chiên vào, đảo đều nhanh tay với lửa lớn trong 1 phút để sốt bám đều.
3. Tắt bếp, rắc tỏi phi lên trên và bày ra đĩa.

> **Lưu ý:** Không chiên gà quá lâu sẽ bị khô thịt bên trong.
`,
      prepTime: 15,
      cookTime: 20,
      categoryId: 'c2',
      authorId: 'u3',
      image:
        'https://tse1.mm.bing.net/th/id/OIP.S-fsSeT9Pnxh31AExwPE-wHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
      nutrition: {
        calories: 450,
        protein: 30,
        fat: 25,
        carbs: 10,
        cholesterol: 90,
      },
      stars: 5,
    }),

    new Recipe({
      id: 'r14',
      code: 'REC_NAM_KHO_TIEU',
      name: 'Nấm Rơm Kho Tiêu',
      description: 'Món chay đậm đà hương vị đồng quê. Nước kho sánh quyện chấm rau luộc cực ngon.',
      ingredients: [
        {
          section: 'Chính',
          items: [
            { name: 'Nấm rơm', quantity: '300g' },
            { name: 'Tiêu xanh', quantity: '2 nhánh' },
          ],
        },
        {
          section: 'Gia vị',
          items: [{ name: 'Nước tương, dầu hào chay, đường', quantity: 'Vừa đủ' }],
        },
      ],
      directions: `
### Bước 1: Sơ chế nấm
- Nấm rơm gọt bỏ chân đen, ngâm nước muối loãng 10 phút.
- Rửa sạch, để ráo. Nấm to thì cắt đôi, nấm nhỏ khía dấu thập trên đầu để dễ thấm gia vị.
- Ướp nấm với 1 thìa hạt nêm chay, chút nước tương và tiêu xay.

### Bước 2: Kho nấm
1. Dùng nồi đất (nếu có) sẽ ngon hơn. Phi thơm đầu hành hoặc boaro.
2. Cho nấm vào xào săn với lửa lớn.
3. Thêm nước tương, đường, chút nước màu dừa, dầu hào chay và vài thìa nước lọc xâm xấp mặt nấm.
4. Cho **tiêu xanh** cả nhánh và ớt hiểm vào kho cùng.

### Bước 3: Hoàn thành
- Kho lửa riu riu đến khi nước sốt keo lại sền sệt, nấm chuyển màu nâu bóng đẹp mắt.
- Rắc thêm tiêu xay, tắt bếp. Ăn nóng với cơm trắng hoặc chấm rau luộc.
`,
      prepTime: 15,
      cookTime: 20,
      categoryId: 'c1',
      authorId: 'u2',
      image: 'https://yummyday.vn/uploads/images/nam-rom-kho-tieu-5.jpg',
      nutrition: {
        calories: 80,
        protein: 4,
        fat: 2,
        carbs: 10,
        cholesterol: 0,
      },
      stars: 3,
    }),

    new Recipe({
      id: 'r15',
      code: 'REC_SUA_DAU_NANH',
      name: 'Sữa Đậu Nành Lá Dứa',
      description:
        'Thức uống dinh dưỡng cho mọi lứa tuổi. Hương lá dứa thơm nhẹ giúp thư giãn tinh thần.',
      ingredients: [
        {
          section: 'Nguyên liệu',
          items: [
            { name: 'Hạt đậu nành', quantity: '200g' },
            { name: 'Lá dứa', quantity: '1 bó' },
            { name: 'Đường phèn', quantity: 'Tùy khẩu vị' },
          ],
        },
      ],
      directions: `
### Bước 1: Ngâm và Xay
- Chọn hạt đậu nành bóng, không mốc. Ngâm nước từ **6-8 tiếng** cho hạt nở mềm (thay nước 1-2 lần để không bị chua).
- Rửa sạch đậu, bóc vỏ (hoặc để vỏ tùy thích).
- Cho đậu vào máy xay sinh tố với khoảng 1.5 lít nước. Xay thật nhuyễn mịn.

### Bước 2: Lọc sữa
- Đổ hỗn hợp vào túi vải lọc, vắt kiệt lấy nước cốt. Bỏ bã.

### Bước 3: Nấu sữa
1. Đổ nước đậu vào nồi, cho bó **lá dứa** đã rửa sạch cuộn gọn vào.
2. Đun lửa vừa, khuấy đều tay liên tục để không bị khê đáy nồi.
3. Khi sữa bắt đầu sôi bùng, hạ lửa nhỏ nhất, vớt bọt kĩ.
4. Đun liu riu thêm 10-15 phút để sữa chín kỹ (tránh bị đau bụng).
5. Thêm đường phèn, khuấy tan rồi tắt bếp.

> **Lưu ý:** Có thể uống nóng hoặc để nguội thêm đá đều ngon tuyệt.
`,
      prepTime: 480,
      cookTime: 30,
      categoryId: 'c4',
      authorId: 'u1',
      image:
        'https://tse2.mm.bing.net/th/id/OIP.PpalqPFz2vu58hl91VdheAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3',
      nutrition: {
        calories: 100,
        protein: 8,
        fat: 4,
        carbs: 12,
        cholesterol: 0,
      },
      stars: 3,
    }),

    new Recipe({
      id: 'r16',
      code: 'REC_SUA_CHUA_NEP_CAM',
      name: 'Sữa Chua Nếp Cẩm',
      description:
        'Sự kết hợp hoàn hảo giữa sữa chua lên men và nếp cẩm dẻo bùi. Tốt cho tiêu hóa.',
      ingredients: [
        {
          section: 'Nếp cẩm',
          items: [
            { name: 'Gạo nếp cẩm', quantity: '200g' },
            { name: 'Nước cốt dừa', quantity: '100ml' },
            { name: 'Đường', quantity: '100g' },
          ],
        },
        {
          section: 'Sữa',
          items: [{ name: 'Sữa chua không đường', quantity: '4 hộp' }],
        },
      ],
      directions: `
### Bước 1: Nấu nếp cẩm
- Gạo nếp cẩm vo sạch, ngâm nước ấm 2-4 tiếng.
- Cho gạo vào nồi, đổ nước xâm xấp (như nấu cơm nếp), thêm một xíu muối.
- Nấu chín mềm. Nếu cạn nước mà gạo chưa mềm thì chế thêm ít nước sôi.

### Bước 2: Sên nếp cẩm
1. Khi nếp đã chín, chắt bỏ bớt nước nhớt (nếu quá nhiều).
2. Cho đường và nước cốt dừa vào nồi nếp.
3. Đảo đều tay trên lửa nhỏ khoảng 5-10 phút cho hạt nếp bóng, ngấm đường và hỗn hợp keo lại sền sệt.
4. Tắt bếp, để nguội hoàn toàn.

### Bước 3: Trình bày
- Múc chè nếp cẩm vào ly (khoảng 1/3 ly).
- Đổ sữa chua (Vinamilk hoặc sữa chua nhà làm) lên trên.
- Thêm đá bào và một chút cốt dừa tươi nếu thích béo. Trộn đều và thưởng thức.
`,
      prepTime: 120,
      cookTime: 40,
      categoryId: 'c3',
      authorId: 'u3',
      image: 'https://befresh.vn/wp-content/uploads/2023/04/s-a-chua-n-p-c-m-1.jpg',
      nutrition: {
        calories: 250,
        protein: 6,
        fat: 5,
        carbs: 45,
        cholesterol: 10,
      },
      stars: 3,
    }),

    new Recipe({
      id: 'r17',
      code: 'REC_BANH_CUON',
      name: 'Bánh Cuốn Nóng',
      description:
        'Bữa sáng nhẹ bụng. Vỏ bánh tráng mỏng trong veo, nhân thịt mộc nhĩ giòn sần sật.',
      ingredients: [
        {
          section: 'Vỏ bánh',
          items: [
            { name: 'Bột gạo', quantity: '200g' },
            { name: 'Bột năng', quantity: '100g' },
            { name: 'Nước', quantity: '1 lít' },
          ],
        },
        {
          section: 'Nhân',
          items: [
            { name: 'Thịt băm', quantity: '200g' },
            { name: 'Mộc nhĩ', quantity: '50g' },
          ],
        },
      ],
      directions: `
### Bước 1: Pha bột tráng bánh
- Trộn đều bột gạo, bột năng, muối và nước. Thêm 1 thìa dầu ăn để bột láng mịn.
- Để bột nghỉ ít nhất **30 phút** cho nở. (Lưu ý: Chắt bỏ nước trong bên trên rồi bù lại lượng nước mới tương đương để bánh không bị chua bột).

### Bước 2: Làm nhân
- Mộc nhĩ ngâm nở, băm nhỏ. Hành tây băm nhỏ.
- Phi thơm hành tím, cho thịt băm vào xào săn.
- Tiếp tục cho mộc nhĩ, hành tây vào xào chín. Nêm hạt nêm, tiêu xay đậm đà.

### Bước 3: Tráng bánh bằng chảo chống dính
1. Dùng chảo chống dính tốt, phết một lớp dầu cực mỏng. Làm nóng chảo.
2. Múc 1 vá bột đổ vào chảo, láng đều thật mỏng.
3. Đậy vung khoảng **30 giây - 1 phút** cho bánh chín bột trong.
4. Úp ngược chảo ra đĩa (đã thoa dầu) để lấy bánh ra.

### Bước 4: Cuốn bánh
- Cho nhân thịt vào giữa lá bánh, cuộn tròn lại.
- Rắc hành phi vàng giòn lên trên. Ăn kèm nước mắm chua ngọt và chả lụa.
`,
      prepTime: 40,
      cookTime: 30,
      categoryId: 'c5',
      authorId: 'u2',
      image:
        'https://cdn.eva.vn/upload/4-2023/images/2023-11-09/cach-lam-banh-cuon-bang-chao-chong-dinh-tai-nha-ngon-nhuc-nhoi-banh-cuon-eva-002-1699523484-381-width780height440.jpg',
      nutrition: {
        calories: 320,
        protein: 12,
        fat: 10,
        carbs: 45,
        cholesterol: 30,
      },
      stars: 4,
    }),
    new Recipe({
      id: 'r18',
      code: 'REC_COM_TAM',
      name: 'Cơm Tấm Sườn Nướng',
      description:
        'Món ăn đặc trưng của Sài Gòn với hạt cơm tấm dẻo thơm, sườn nướng mật ong vàng óng và nước mắm chua ngọt đậm đà.',
      ingredients: [
        {
          section: 'Chính',
          items: [
            { name: 'Gạo tấm', quantity: '500g' },
            { name: 'Sườn cốt lết', quantity: '4 miếng' },
            { name: 'Bì heo, chả trứng', quantity: 'Vừa đủ' },
          ],
        },
        {
          section: 'Gia vị ướp',
          items: [
            { name: 'Mật ong, dầu hào', quantity: '2 thìa' },
            { name: 'Sả băm, tỏi băm', quantity: 'Vừa đủ' },
          ],
        },
      ],
      directions: `
### Bước 1: Nấu cơm tấm
- Gạo tấm vo sạch, ngâm 20-30 phút.
- Cho vào nồi cơm điện nấu ít nước hơn gạo thường hoặc ngon nhất là **hấp cách thủy** để hạt cơm tơi xốp, không bị nát.

### Bước 2: Ướp Sườn Cốt Lết
- Sườn rửa sạch, dùng búa dần thịt đập nhẹ cho mềm.
- Ướp với hỗn hợp: Mật ong, sữa đặc (bí quyết giúp thịt mềm), nước tương, dầu hào, sả băm, tỏi băm, dầu ăn và chút ngũ vị hương.
- Để tủ lạnh ít nhất **2-3 tiếng**.

### Bước 3: Nướng sườn
- Nướng trên than hoa là ngon nhất. Quết nước ướp lên thịt trong lúc nướng để không bị khô.
- Nướng đến khi thịt vàng óng, cháy xém nhẹ các cạnh.

### Bước 4: Mỡ hành và Nước mắm
- **Mỡ hành:** Hành lá thái nhỏ, đổ dầu sôi vào trộn đều với chút muối đường.
- **Nước mắm:** Nấu nước mắm với đường tỷ lệ 1:1 cho kẹo lại, để nguội thêm tỏi ớt băm.

### Bước 5: Trình bày
- Xới cơm ra đĩa, đặt miếng sườn nướng lên. Thêm bì, chả trứng (nếu có).
- Rưới mỡ hành lên cơm. Dọn kèm dưa chua và bát nước mắm kẹo.
`,
      prepTime: 30,
      cookTime: 45,
      categoryId: 'c2',
      authorId: 'u1',
      image: 'https://beptruong.edu.vn/wp-content/uploads/2018/09/pha-nuoc-mam-com-tam.jpg',
      nutrition: {
        calories: 650,
        protein: 35,
        fat: 28,
        carbs: 75,
        cholesterol: 95,
      },
      stars: 5,
    }),
  ];

  recipeRepo.saveBatch(recipes);

  const blogPosts = [
    new BlogPost({
      id: 'b1',
      title: '5 Mẹo Giúp Rau Luộc Luôn Xanh',
      excerpt: 'Bí quyết nhỏ giúp đĩa rau luộc của bạn trông hấp dẫn như nhà hàng 5 sao.',
      image:
        'https://cdn.tgdd.vn/Files/2020/09/09/1288677/nhung-tac-dung-cua-da-lanh-ma-ban-khong-ngo-toi.jpg',
      authorId: 'u1',
      publishedAt: new Date('2023-10-01').toISOString(),
      tags: ['Tips'],
      content: `
Để rau luộc luôn xanh mướt và giữ được độ giòn, bạn hãy thử áp dụng những mẹo nhỏ sau đây:

### 1. Thêm muối vào nước luộc 
Khi nước bắt đầu sôi, hãy cho một thìa muối nhỏ vào. Muối giúp tăng nhiệt độ sôi của nước và giữ lại chất diệp lục, giúp rau xanh hơn.

### 2. Luộc ngập nước và lửa lớn
Đừng tiết kiệm nước! Hãy đảm bảo rau ngập hoàn toàn trong nước sôi và giữ lửa lớn để thời gian luộc ngắn nhất có thể.

### 3. Ngâm nước đá (Shock nhiệt)
Đây là bước quan trọng nhất. Ngay khi vớt rau ra, hãy thả ngay vào bát nước đá lạnh. Việc thay đổi nhiệt độ đột ngột giúp khóa màu xanh và giữ độ giòn sần sật.

> **Lưu ý:** Đừng đậy vung khi luộc các loại rau có mùi hăng để khí lưu huỳnh thoát ra ngoài.
        `,
    }),

    new BlogPost({
      id: 'b2',
      title: 'Lợi Ích Của Việc Ăn Chay',
      excerpt: 'Tìm hiểu tại sao xu hướng ăn chay (Vegan) đang ngày càng phổ biến trên thế giới.',
      image:
        'https://bizweb.dktcdn.net/100/509/197/files/y-nghia-that-su-cua-viec-an-chay-trong-phat-giao-1.jpg?v=1747909095640',
      authorId: 'u2',
      publishedAt: new Date('2023-10-05').toISOString(),
      tags: ['Health', 'Lifestyle'],
      content: `
Ăn chay không chỉ là một trào lưu nhất thời mà là một lối sống mang lại nhiều lợi ích to lớn:

### Cải thiện sức khỏe tim mạch
Chế độ ăn nhiều rau củ, ngũ cốc và ít chất béo bão hòa giúp giảm cholesterol xấu, từ đó giảm nguy cơ mắc bệnh tim mạch 

![Ảnh ăn chay](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwaDllN3PBD4h0f10bbRfmrzH5_AiaMcwSmA&s)

### Hỗ trợ giảm cân tự nhiên
Thực phẩm thực vật thường giàu chất xơ nhưng ít calo, giúp bạn cảm thấy no lâu hơn mà không nạp quá nhiều năng lượng dư thừa.

* **Giảm nguy cơ tiểu đường:** Ổn định lượng đường trong máu.
* **Thanh lọc cơ thể:** Giúp hệ tiêu hóa hoạt động nhẹ nhàng hơn.

Hãy bắt đầu bằng việc ăn chay 1-2 ngày trong tuần (Meatless Monday) để cảm nhận sự thay đổi!
        `,
    }),

    new BlogPost({
      id: 'b3',
      title: 'Review: Top 3 Nồi Chiên Không Dầu Đáng Mua',
      excerpt: 'Giúp bạn chọn được thiết bị nhà bếp phù hợp với túi tiền và nhu cầu gia đình.',
      image:
        'https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2024/04/noi-chien-khong-dau-mini-1.jpg',
      authorId: 'u3',
      publishedAt: new Date('2023-10-10').toISOString(),
      tags: ['Review'],
      content: `
Nồi chiên không dầu (Air Fryer) đã trở thành thiết bị không thể thiếu. Dưới đây là so sánh nhanh 3 dòng phổ biến:

### 1. Philips Airfryer XXL 
![Ảnh Philips Airfryer](https://images.philips.com/is/image/philipsconsumer/vrs_1b9b5d3e438b43b1eaf7c979d123ed9e0ce90dcd?$pnglarge$&wid=1250)
* **Ưu điểm:** Công nghệ Twin TurboStar giảm 90% chất béo, chín đều không cần lật.
* **Nhược điểm:** Giá thành cao, hơi ồn.

### 2. Lock&Lock 5.2L
![Ảnh Lock&Lock Airfryer](https://cdn.tgdd.vn/Products/Images/9418/288389/locknlock-ejf357blk-0-600x600.jpg)
* **Ưu điểm:** Dung tích lớn, giá cả phải chăng, dễ vệ sinh.
* **Nhược điểm:** Lớp chống dính có thể bong nếu không bảo quản kỹ.

### 3. Xiaomi Smart Air Fryer
![Ảnh Xiaomi Airfryer](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOpbXNV-TS3pL6-YipI_9AHySAZ-Zru-Y3Bg&s)
* **Ưu điểm:** Kết nối App điện thoại, thiết kế đẹp, giá rẻ.
* **Nhược điểm:** Dung tích hơi nhỏ (3.5L), phù hợp người độc thân hoặc gia đình nhỏ.

**Kết luận:** Nếu tài chính dư dả, hãy chọn Philips. Nếu cần ngon-bổ-rẻ, Lock&Lock là lựa chọn an toàn.
        `,
    }),

    new BlogPost({
      id: 'b4',
      title: 'Bí Quyết Chọn Thịt Bò Nấu Phở',
      excerpt: 'Hướng dẫn chọn nguyên liệu tươi ngon nhất từ chợ sớm để có nồi phở chuẩn vị.',
      image:
        'https://dienmaynewsun.com/wp-content/uploads/2021/07/chon-thit-bo-ngon-de-nau-pho-1.jpg',
      authorId: 'u1',
      publishedAt: new Date('2023-10-15').toISOString(),
      tags: ['Ingredients'],
      content: `
Thịt bò là linh hồn của món phở. Để bát phở ngon, bạn cần biết cách chọn thịt đúng chuẩn:

### Phân biệt các phần thịt
1.  **Gầu bò:** Phần thịt có mỡ giòn, ăn béo nhưng không ngấy.
2.  **Nạm bò:** Phần thịt có lẫn gân, khi hầm lâu sẽ rất mềm và thơm.
3.  **Lõi rùa/Bắp hoa:** Phần ngon nhất để làm bò tái, giòn sần sật.

### Cách nhìn thịt tươi 

![Ảnh thịt bò](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyB57-HU4teKJu2bDTUYII6xvYWJRA6Wo50g&sv)

* **Màu sắc:** Thịt bò tươi phải có màu đỏ tươi (không phải đỏ sẫm), mỡ màu vàng nhạt.
* **Độ đàn hồi:** Ấn ngón tay vào thịt, nếu thịt đàn hồi lại ngay và không dính tay là thịt mới.
* **Mùi:** Không có mùi hôi lạ hay mùi kháng sinh.

Hãy đi chợ sớm để chọn được những miếng thịt ngon nhất nhé!
        `,
    }),
  ];

  blogPostRepo.saveBatch(blogPosts);

  localStorage.setItem(INIT_KEY, VERSION);
  Logger.info('--- MOCK DATA INITIALIZED SUCCESSFULLY ---');
};

export default initData;
