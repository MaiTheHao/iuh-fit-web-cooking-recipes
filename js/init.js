const mockBlogs = [
  {
    id: 'b1',
    title: '5 Mẹo Giúp Rau Luộc Luôn Xanh',
    excerpt: 'Bí quyết nhỏ giúp đĩa rau luộc của bạn trông hấp dẫn như nhà hàng 5 sao.',
    content:
      '\nĐể rau luộc luôn xanh mướt và giữ được độ giòn, bạn hãy thử áp dụng những mẹo nhỏ sau đây:\n\n### 1. Thêm muối vào nước luộc \nKhi nước bắt đầu sôi, hãy cho một thìa muối nhỏ vào. Muối giúp tăng nhiệt độ sôi của nước và giữ lại chất diệp lục, giúp rau xanh hơn.\n\n### 2. Luộc ngập nước và lửa lớn\nĐừng tiết kiệm nước! Hãy đảm bảo rau ngập hoàn toàn trong nước sôi và giữ lửa lớn để thời gian luộc ngắn nhất có thể.\n\n### 3. Ngâm nước đá (Shock nhiệt)\nĐây là bước quan trọng nhất. Ngay khi vớt rau ra, hãy thả ngay vào bát nước đá lạnh. Việc thay đổi nhiệt độ đột ngột giúp khóa màu xanh và giữ độ giòn sần sật.\n\n> **Lưu ý:** Đừng đậy vung khi luộc các loại rau có mùi hăng để khí lưu huỳnh thoát ra ngoài.\n        ',
    image: 'https://cdn.tgdd.vn/Files/2020/09/09/1288677/nhung-tac-dung-cua-da-lanh-ma-ban-khong-ngo-toi.jpg',
    authorId: 'u1',
    publishedAt: '2023-10-01T00:00:00.000Z',
    tags: ['Tips'],
  },
  {
    id: 'b2',
    title: 'Ăn Chay: Lợi Ích Sức Khỏe Và Môi Trường',
    excerpt: 'Tìm hiểu tại sao xu hướng ăn chay (Vegan) đang ngày càng phổ biến trên thế giới.',
    content:
      '\nĂn chay không chỉ là một trào lưu nhất thời mà là một lối sống mang lại nhiều lợi ích to lớn:\n\n### Cải thiện sức khỏe tim mạch\nChế độ ăn nhiều rau củ, ngũ cốc và ít chất béo bão hòa giúp giảm cholesterol xấu, từ đó giảm nguy cơ mắc bệnh tim mạch \n\n![Ảnh ăn chay](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwaDllN3PBD4h0f10bbRfmrzH5_AiaMcwSmA&s)\n\n### Hỗ trợ giảm cân tự nhiên\nThực phẩm thực vật thường giàu chất xơ nhưng ít calo, giúp bạn cảm thấy no lâu hơn mà không nạp quá nhiều năng lượng dư thừa.\n\n* **Giảm nguy cơ tiểu đường:** Ổn định lượng đường trong máu.\n* **Thanh lọc cơ thể:** Giúp hệ tiêu hóa hoạt động nhẹ nhàng hơn.\n\nHãy bắt đầu bằng việc ăn chay 1-2 ngày trong tuần (Meatless Monday) để cảm nhận sự thay đổi!\n        ',
    image: 'https://bizweb.dktcdn.net/100/509/197/files/y-nghia-that-su-cua-viec-an-chay-trong-phat-giao-1.jpg?v=1747909095640',
    authorId: 'u2',
    publishedAt: '2023-10-05T00:00:00.000Z',
    tags: ['Health', 'Lifestyle'],
  },
  {
    id: 'b3',
    title: 'Review: Top 3 Nồi Chiên Không Dầu Đáng Mua',
    excerpt: 'Giúp bạn chọn được thiết bị nhà bếp phù hợp với túi tiền và nhu cầu gia đình.',
    content:
      '\nNồi chiên không dầu (Air Fryer) đã trở thành thiết bị không thể thiếu. Dưới đây là so sánh nhanh 3 dòng phổ biến:\n\n### 1. Philips Airfryer XXL \n![Ảnh Philips Airfryer](https://images.philips.com/is/image/philipsconsumer/vrs_1b9b5d3e438b43b1eaf7c979d123ed9e0ce90dcd?$pnglarge$&wid=1250)\n* **Ưu điểm:** Công nghệ Twin TurboStar giảm 90% chất béo, chín đều không cần lật.\n* **Nhược điểm:** Giá thành cao, hơi ồn.\n\n### 2. Lock&Lock 5.2L\n![Ảnh Lock&Lock Airfryer](https://cdn.tgdd.vn/Products/Images/9418/288389/locknlock-ejf357blk-0-600x600.jpg)\n* **Ưu điểm:** Dung tích lớn, giá cả phải chăng, dễ vệ sinh.\n* **Nhược điểm:** Lớp chống dính có thể bong nếu không bảo quản kỹ.\n\n### 3. Xiaomi Smart Air Fryer\n![Ảnh Xiaomi Airfryer](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOpbXNV-TS3pL6-YipI_9AHySAZ-Zru-Y3Bg&s)\n* **Ưu điểm:** Kết nối App điện thoại, thiết kế đẹp, giá rẻ.\n* **Nhược điểm:** Dung tích hơi nhỏ (3.5L), phù hợp người độc thân hoặc gia đình nhỏ.\n\n**Kết luận:** Nếu tài chính dư dả, hãy chọn Philips. Nếu cần ngon-bổ-rẻ, Lock&Lock là lựa chọn an toàn.\n        ',
    image: 'https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2024/04/noi-chien-khong-dau-mini-1.jpg',
    authorId: 'u3',
    publishedAt: '2023-10-10T00:00:00.000Z',
    tags: ['Review'],
  },
  {
    id: 'b4',
    title: 'Bí Quyết Chọn Thịt Bò Nấu Phở',
    excerpt: 'Hướng dẫn chọn nguyên liệu tươi ngon nhất từ chợ sớm để có nồi phở chuẩn vị.',
    content:
      '\nThịt bò là linh hồn của món phở. Để bát phở ngon, bạn cần biết cách chọn thịt đúng chuẩn:\n\n### Phân biệt các phần thịt\n1.  **Gầu bò:** Phần thịt có mỡ giòn, ăn béo nhưng không ngấy.\n2.  **Nạm bò:** Phần thịt có lẫn gân, khi hầm lâu sẽ rất mềm và thơm.\n3.  **Lõi rùa/Bắp hoa:** Phần ngon nhất để làm bò tái, giòn sần sật.\n\n### Cách nhìn thịt tươi \n\n![Ảnh thịt bò](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyB57-HU4teKJu2bDTUYII6xvYWJRA6Wo50g&sv)\n\n* **Màu sắc:** Thịt bò tươi phải có màu đỏ tươi (không phải đỏ sẫm), mỡ màu vàng nhạt.\n* **Độ đàn hồi:** Ấn ngón tay vào thịt, nếu thịt đàn hồi lại ngay và không dính tay là thịt mới.\n* **Mùi:** Không có mùi hôi lạ hay mùi kháng sinh.\n\nHãy đi chợ sớm để chọn được những miếng thịt ngon nhất nhé!\n        ',
    image: 'https://dienmaynewsun.com/wp-content/uploads/2021/07/chon-thit-bo-ngon-de-nau-pho-1.jpg',
    authorId: 'u1',
    publishedAt: '2023-10-15T00:00:00.000Z',
    tags: ['Ingredients'],
  },
];
const mockCategories = [
  { id: 'c1', code: 'CATE_VEGAN', name: 'Vegan', description: 'Các món ăn thuần thực vật, thanh đạm.' },
  { id: 'c2', code: 'CATE_MEAT', name: 'Meat & Seafood', description: 'Các món chế biến từ thịt, cá, hải sản.' },
  { id: 'c3', code: 'CATE_DESSERT', name: 'Dessert', description: 'Bánh ngọt, chè, kem và đồ ngọt.' },
  { id: 'c4', code: 'CATE_DRINK', name: 'Drinks', description: 'Sinh tố, nước ép, cocktail.' },
  { id: 'c5', code: 'CATE_BREAKFAST', name: 'Breakfast', description: 'Năng lượng cho ngày mới.' },
];
const mockRecipes = [
  {
    id: 'r1',
    code: 'REC_PHO_BO',
    name: 'Phở Bò Truyền Thống',
    description: 'Món ăn quốc hồn quốc túy của Việt Nam. Nước dùng thơm phức mùi quế hồi, hòa quyện cùng bánh phở mềm và thịt bò ngọt lịm.',
    image: 'https://file.hstatic.net/200000700229/article/pho-bo-ha-noi-thumb_980349ef2bcf40c9b736a672e5a944d3.jpg',
    prepTime: 30,
    cookTime: 360,
    totalTime: 390,
    categoryId: 'c2',
    authorId: 'u1',
    nutrition: { calories: 450, protein: 25, fat: 12, carbs: 58, cholesterol: 65 },
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
    directions:
      '### Bước 1: Sơ chế và Hầm xương\n1. Xương ống rửa sạch, chần qua nước sôi 5 phút để khử sạch bụi bẩn và mùi hôi.\n2. Nướng vàng **gừng**, **hành tím**, **hành tây** và các loại hương liệu (quế, hồi) để dậy mùi thơm.\n3. Cho xương vào nồi lớn, thêm 3-4 lít nước. Thêm các nguyên liệu đã nướng và 1 thìa muối.\n4. Ninh nhỏ lửa trong khoảng **6-8 tiếng**.\n\n### Bước 2: Nấu nước dùng\n- Sau khi hầm đủ thời gian, vớt xương và hương liệu ra.\n- Lọc lại nước dùng qua rây cho trong.\n- Nêm nếm thêm nước mắm, hạt nêm, đường phèn cho vị ngọt thanh đậm đà.\n\n### Bước 3: Trình bày và Thưởng thức\n1. Thái thịt bò thành lát mỏng (ngang thớ). Cắt nhỏ hành lá, rau thơm.\n2. Chần bánh phở qua nước sôi rồi cho vào tô.\n3. Xếp thịt bò tái lên trên, rắc hành lá.\n4. Chan nước dùng **đang sôi sùng sục** trực tiếp lên thịt bò để làm chín tái.\n\n> **Mẹo:** Nên ăn kèm với quẩy, chanh tươi, ớt tươi và dấm tỏi để tròn vị.',
    stars: 5,
  },
  {
    id: 'r2',
    code: 'REC_SALAD_BO',
    name: 'Salad Bơ Trứng',
    description: 'Món khai vị healthy, giàu chất béo tốt. Phù hợp cho người ăn kiêng và giảm cân.',
    image: 'https://file.hstatic.net/1000337345/article/screenshot_2023-02-16_145739_1855658674884e3f927b0cc5083bb720_1024x1024.png',
    prepTime: 15,
    cookTime: 10,
    totalTime: 25,
    categoryId: 'c1',
    authorId: 'u2',
    nutrition: { calories: 320, protein: 9, fat: 28, carbs: 12, cholesterol: 185 },
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
    directions:
      '### Bước 1: Sơ chế nguyên liệu\n- **Trứng gà:** Luộc chín (hoặc lòng đào tùy sở thích trong 6-7 phút), bóc vỏ và cắt múi cau.\n- **Bơ sáp:** Cắt đôi, bỏ hạt, lột vỏ và cắt thành miếng vuông hạt lựu vừa ăn.\n- **Rau xà lách:** Rửa sạch, ngâm nước muối loãng 5 phút, vẩy ráo nước rồi cắt khúc.\n\n### Bước 2: Làm sốt trộn (Tùy chọn)\n- Nếu không dùng sốt Mayonnaise nguyên bản, bạn có thể trộn Mayonnaise với một chút tương ớt, nước cốt chanh và tiêu xay để tạo vị chua cay nhẹ.\n\n### Bước 3: Trộn salad\n1. Cho xà lách vào tô lớn làm lớp lót.\n2. Xếp lần lượt bơ và trứng lên trên.\n3. Rưới nước sốt đều khắp mặt salad.\n4. Trộn nhẹ tay ngay trước khi ăn để rau không bị nát.\n\n> **Lưu ý:** Bơ sau khi cắt nên trộn ngay hoặc vắt chút chanh để không bị thâm đen.',
    stars: 4,
  },
  {
    id: 'r3',
    code: 'REC_BANH_FLAN',
    name: 'Bánh Flan Caramen',
    description: 'Béo ngậy vị trứng sữa, thơm lừng mùi caramen đắng nhẹ. Món tráng miệng hoàn hảo.',
    image: 'https://cdn.tgdd.vn/Files/2020/04/20/1250342/2-cach-lam-banh-flan-mem-min-khong-tanh-ngay-tai-nha-202106182157209970.jpg',
    prepTime: 20,
    cookTime: 40,
    totalTime: 60,
    categoryId: 'c3',
    authorId: 'u2',
    nutrition: { calories: 180, protein: 6, fat: 7, carbs: 24, cholesterol: 120 },
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
    directions:
      '### Bước 1: Thắng đường Caramen\n1. Cho đường và nước vào nồi, đun lửa vừa. **Tuyệt đối không khuấy** để tránh lại đường.\n2. Khi nước đường chuyển sang màu cánh gián (nâu hổ phách), tắt bếp ngay.\n3. Nhanh tay tráng một lớp mỏng caramen vào đáy các khuôn bánh. Để nguội cho đông lại.\n\n### Bước 2: Pha hỗn hợp trứng sữa\n- Đập trứng ra tô (lấy cả lòng trắng và đỏ), khuấy nhẹ tay theo một chiều để trứng tan nhưng **không tạo bọt khí**.\n- Đun sữa tươi ấm (khoảng 70 độ C - sờ thấy, chưa sôi), cho đường vào hòa tan.\n- Đổ từ từ sữa ấm vào tô trứng, vừa đổ vừa khuấy nhẹ. Thêm vani.\n- Lọc hỗn hợp qua rây 1-2 lần cho thật mịn.\n\n### Bước 3: Hấp bánh\n1. Đổ hỗn hợp trứng sữa vào các khuôn đã có caramen.\n2. Xếp vào nồi hấp hoặc khay nướng cách thủy.\n3. Hấp lửa nhỏ trong khoảng **30-40 phút**.\n\n> **Bí quyết:** Phủ khăn lên miệng nồi hấp để hơi nước không nhỏ xuống làm rỗ mặt bánh.',
    stars: 5,
  },
  {
    id: 'r4',
    code: 'REC_SUON_XAO_CHUA_NGOT',
    name: 'Sườn Xào Chua Ngọt',
    description: 'Sườn non mềm thấm đẫm sốt chua ngọt đậm đà. Món mặn cực kỳ đưa cơm.',
    image: 'https://cdn.tgdd.vn/Files/2019/10/06/1205476/cach-lam-suon-xao-chua-ngot-mien-bac-dep-mat-va-ngon-com-202202241319497834.jpg',
    prepTime: 20,
    cookTime: 30,
    totalTime: 50,
    categoryId: 'c2',
    authorId: 'u1',
    nutrition: { calories: 350, protein: 18, fat: 22, carbs: 15, cholesterol: 80 },
    ingredients: [
      {
        section: 'Chính',
        items: [
          { name: 'Sườn non', quantity: '500g' },
          { name: 'Cà chua', quantity: '2 quả' },
        ],
      },
      { section: 'Gia vị sốt', items: [{ name: 'Giấm, đường, tỏi, ớt', quantity: 'Vừa đủ' }] },
    ],
    directions:
      '### Bước 1: Sơ chế sườn\n- Sườn non rửa sạch với nước muối, chặt miếng vừa ăn.\n- Chần sườn qua nước sôi 2 phút để sạch bọt bẩn, vớt ra để ráo.\n- Ướp sườn với 1 thìa nước mắm, hành tím băm trong 15 phút.\n\n### Bước 2: Chiên sườn\n1. Làm nóng chảo dầu, cho sườn vào chiên sơ sao cho vàng đều các mặt (không chiên quá khô).\n2. Vớt sườn ra đĩa.\n\n### Bước 3: Làm sốt chua ngọt\n- Phi thơm hành tỏi băm. Cho cà chua thái hạt lựu vào xào nhuyễn.\n- Pha hỗn hợp sốt: 3 thìa giấm (hoặc chanh/me), 2 thìa đường, 2 thìa nước mắm, 1 chút tương ớt, 1 chút nước lọc.\n- Đổ hỗn hợp vào chảo cà chua, đun sôi sệt lại.\n\n### Bước 4: Hoàn thiện\n- Đổ sườn đã chiên vào chảo sốt. Đảo đều tay lửa nhỏ cho sốt bám đều quanh miếng sườn.\n- Đun thêm 5-7 phút cho thấm vị. Tắt bếp và rắc hành lá.',
    stars: 5,
  },
  {
    id: 'r5',
    code: 'REC_SINH_TO_XOAI',
    name: 'Sinh Tố Xoài Chuối',
    description: 'Giải nhiệt mùa hè với vị ngọt tự nhiên từ trái cây tươi. Thơm ngon và mát lạnh.',
    image: 'https://file.hstatic.net/200000700229/article/sinh-to-chuoi-xoai-thumb_798b914b42454d07abb183db5c879609.jpg',
    prepTime: 10,
    cookTime: 10,
    totalTime: 20,
    categoryId: 'c4',
    authorId: 'u3',
    nutrition: { calories: 160, protein: 4, fat: 2, carbs: 35, cholesterol: 5 },
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
    directions:
      '### Bước 1: Chuẩn bị trái cây\n- **Xoài:** Gọt vỏ, cắt lấy phần thịt má xoài, thái miếng nhỏ.\n- **Chuối:** Bóc vỏ, cắt khoanh tròn.\n- **Lưu ý:** Để sinh tố ngon và đặc hơn, bạn có thể để trái cây đã cắt vào ngăn đá tủ lạnh khoảng 30 phút trước khi xay.\n\n### Bước 2: Xay sinh tố\n1. Cho lần lượt xoài, chuối vào cối xay sinh tố.\n2. Thêm 1 hộp sữa chua (có đường hoặc không đường tùy khẩu vị).\n3. Thêm đá bào (hoặc đá viên nhỏ) và khoảng 30ml sữa tươi/sữa đặc nếu muốn ngọt béo hơn.\n4. Bấm máy xay nhuyễn mịn đến khi hỗn hợp có màu vàng tươi đẹp mắt.\n\n### Bước 3: Thưởng thức\n- Đổ ra ly cao.\n- Trang trí bằng một lát xoài hoặc vài lá bạc hà. Uống ngay khi còn lạnh.',
    stars: 3,
  },
  {
    id: 'r6',
    code: 'REC_BANH_MI',
    name: 'Bánh Mì Thập Cẩm',
    description: 'Bữa sáng nhanh gọn, đầy đủ dinh dưỡng với vỏ bánh giòn rụm.',
    image: 'https://cdn2.fptshop.com.vn/unsafe/800x0/banh_mi_thap_cam_5_0e3359c2bf.jpg',
    prepTime: 5,
    cookTime: 5,
    totalTime: 10,
    categoryId: 'c5',
    authorId: 'u3',
    nutrition: { calories: 420, protein: 15, fat: 18, carbs: 48, cholesterol: 40 },
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
    directions:
      '### Bước 1: Chuẩn bị bánh mì\n1. Nếu bánh mì bị ỉu, hãy nướng lại trong lò nướng hoặc áp chảo nóng trong 1-2 phút cho vỏ bánh giòn tan.\n2. Dùng dao rạch dọc một bên thân bánh.\n\n### Bước 2: Thêm nhân\n1. Phết một lớp **pate gan** mỏng đều vào hai bên ruột bánh.\n2. Nếu thích béo, có thể phết thêm một lớp bơ trứng gà hoặc sốt mayonnaise.\n3. Xếp lần lượt dưa leo thái lát dọc, chả lụa, thịt nguội vào giữa.\n4. Thêm ngò rí, hành lá, đồ chua (cà rốt, củ cải ngâm giấm).\n\n### Bước 3: Gia vị\n- Rưới một chút nước tương (xì dầu) và tương ớt dọc theo chiều dài nhân bánh.\n- Kẹp bánh lại và thưởng thức ngay khi vỏ còn nóng giòn.\n\n> **Mẹo:** Nên làm nóng lại bánh mì trước khi kẹp nhân để đảm bảo độ ngon nhất.',
    stars: 4,
  },
  {
    id: 'r7',
    code: 'REC_CANH_CHUA_CA_LOC',
    name: 'Canh Chua Cá Lóc',
    description: 'Hương vị miền Tây dân dã. Vị chua thanh của me hòa quyện với thịt cá ngọt mềm.',
    image: 'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2024_3_31_638474737289073713_nau-canh-chua-ca-loc.jpg',
    prepTime: 20,
    cookTime: 25,
    totalTime: 45,
    categoryId: 'c2',
    authorId: 'u1',
    nutrition: { calories: 150, protein: 20, fat: 4, carbs: 10, cholesterol: 45 },
    ingredients: [
      { section: 'Cá', items: [{ name: 'Cá lóc', quantity: '500g' }] },
      {
        section: 'Rau & Gia vị',
        items: [
          { name: 'Me chua', quantity: '1 vắt' },
          { name: 'Bạc hà, đậu bắp, giá', quantity: '300g' },
          { name: 'Rau om, ngò gai', quantity: '1 nắm' },
        ],
      },
    ],
    directions:
      '### Bước 1: Sơ chế cá lóc\n- Cá lóc làm sạch, đánh vẩy, cạo nhớt bằng chanh và muối.\n- Cắt cá thành các khứa dày khoảng 2-3cm.\n- Ướp cá với 1 thìa nước mắm, tiêu, đầu hành băm.\n\n### Bước 2: Chuẩn bị rau củ\n- Me chín ngâm nước ấm, dầm nát lấy nước cốt.\n- Thơm (dứa) cắt lát. Cà chua cắt múi cau.\n- Bạc hà (dọc mùng) tước vỏ, cắt lát chéo. Đậu bắp cắt chéo.\n- Rau om, ngò gai thái nhỏ.\n\n### Bước 3: Nấu canh\n1. Phi thơm tỏi băm, cho cá vào chiên sơ cho săn thịt rồi vớt ra (để cá không bị tanh khi nấu).\n2. Đun sôi nồi nước (khoảng 1 lít), cho nước cốt me vào.\n3. Thả cá vào nấu chín (khoảng 5-7 phút), vớt bọt.\n4. Lần lượt cho thơm, cà chua, đậu bắp, bạc hà, giá đỗ vào nấu vừa chín tới.\n5. Nêm đường, nước mắm, muối cho có vị **chua - ngọt - mặn** hài hòa.\n\n### Bước 4: Hoàn thành\n- Tắt bếp ngay khi rau vừa chín.\n- Rắc rau om, ngò gai và ớt lát lên trên. Múc ra tô dùng nóng.',
    stars: 3,
  },
  {
    id: 'r8',
    code: 'REC_BUN_CHA',
    name: 'Bún Chả Hà Nội',
    description: 'Tinh hoa ẩm thực Hà Thành. Chả nướng than hoa thơm lừng ăn kèm nước chấm chua ngọt và rau sống.',
    image: 'https://sunhouse.com.vn/pic/news/images/image-20211229181528-1.jpeg',
    prepTime: 40,
    cookTime: 20,
    totalTime: 60,
    categoryId: 'c2',
    authorId: 'u1',
    nutrition: { calories: 550, protein: 28, fat: 25, carbs: 60, cholesterol: 70 },
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
    directions:
      '### Bước 1: Ướp thịt (Quan trọng nhất)\n- **Gia vị ướp:** Sả băm, hành tím băm, nước mắm ngon, đường, nước hàng (nước màu), một chút dầu hào và tiêu.\n- **Thịt miếng:** Thái ba chỉ miếng mỏng vừa ăn. Ướp với gia vị trên.\n- **Chả viên:** Trộn thịt xay với gia vị, vo thành viên tròn nhỏ rồi ấn dẹt.\n- Để thịt thấm gia vị ít nhất **30 phút** (ngon nhất là để qua đêm trong tủ lạnh).\n\n### Bước 2: Nướng thịt\n- Kẹp thịt vào vỉ nướng.\n- Nướng trên than hoa là ngon nhất. Quạt đều tay, lật liên tục để thịt chín vàng ruộm, hơi xém cạnh và dậy mùi thơm khói.\n\n### Bước 3: Pha nước chấm & Dưa góp\n- **Dưa góp:** Đu đủ xanh, cà rốt thái lát mỏng, ngâm giấm đường cho giòn.\n- **Nước chấm:** Pha theo tỷ lệ 1 mắm : 1 đường : 1 giấm : 5 nước lọc. Đun ấm hoặc dùng nước sôi để nguội. Thêm tỏi ớt băm nhuyễn.\n- Thả dưa góp và chả nướng vào bát nước chấm.\n\n### Bước 4: Thưởng thức\n- Dọn kèm bún rối và đĩa rau sống tía tô, xà lách.\n- Gắp bún nhúng vào bát chả nóng hổi và thưởng thức.',
    stars: 5,
  },
  {
    id: 'r9',
    code: 'REC_DAU_HU_SOT_CA',
    name: 'Đậu Hũ Sốt Cà Chua',
    description: 'Món chay quốc dân đơn giản mà đưa cơm. Đậu hũ chiên vàng thấm đẫm sốt cà chua đậm đà.',
    image: 'https://www.thatlangon.com/wp-content/uploads/2021/06/cong-thuc-cach-lam-dau-sot-ca-chua.jpg',
    prepTime: 10,
    cookTime: 15,
    totalTime: 25,
    categoryId: 'c1',
    authorId: 'u2',
    nutrition: { calories: 200, protein: 12, fat: 10, carbs: 15, cholesterol: 0 },
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
    directions:
      '### Bước 1: Chiên đậu hũ\n1. Đậu hũ rửa nhẹ, cắt miếng vuông vừa ăn.\n2. Thấm khô nước để khi chiên không bị bắn dầu.\n3. Chiên đậu trong chảo dầu nóng đến khi lớp vỏ ngoài vàng rụm. Vớt ra để ráo dầu.\n\n### Bước 2: Làm sốt cà chua\n1. Cà chua rửa sạch, cắt miếng nhỏ hoặc thái hạt lựu.\n2. Phi thơm hành tím băm (hoặc đầu hành trắng).\n3. Cho cà chua vào xào, nêm một chút muối để cà chua nhanh mềm. Dầm nhuyễn tạo thành hỗn hợp sệt.\n\n### Bước 3: Rim đậu\n- Cho đậu hũ đã chiên vào chảo sốt.\n- Thêm khoảng nửa bát nước lọc, nêm nước mắm (chay/mặn), hạt nêm, đường cho vừa miệng.\n- Đun lửa nhỏ khoảng **5-10 phút** cho gia vị ngấm sâu vào miếng đậu.\n- Khi nước sốt sệt lại, cho hành lá thái nhỏ, rắc tiêu và tắt bếp.',
    stars: 3,
  },
  {
    id: 'r10',
    code: 'REC_TRA_DAO_CAM_SA',
    name: 'Trà Đào Cam Sả',
    description: 'Thức uống giải nhiệt sành điệu. Vị chát nhẹ của trà kết hợp vị ngọt thanh của đào và hương sả nồng nàn.',
    image: 'https://th.bing.com/th/id/OIP.nUDz8X3RAO7t8EPkvOvHUAHaE8?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
    prepTime: 10,
    cookTime: 5,
    totalTime: 15,
    categoryId: 'c4',
    authorId: 'u3',
    nutrition: { calories: 120, protein: 0, fat: 0, carbs: 30, cholesterol: 0 },
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
    directions:
      '### Bước 1: Nấu nước cốt sả\n- Sả cây rửa sạch, đập dập, cắt khúc ngắn.\n- Đun sôi khoảng 300ml nước với sả trong 5 phút để lấy tinh dầu thơm.\n\n### Bước 2: Ủ trà\n- Dùng nước sả nóng (90 độ C) để ủ trà túi lọc (Trà đào hoặc Earl Grey) trong khoảng 3-5 phút.\n- Bỏ túi trà, để nguội bớt.\n\n### Bước 3: Pha chế\n1. Cho vào bình lắc (shaker): Nước trà sả, 20ml siro đào (từ hộp đào ngâm), 10ml nước đường.\n2. Vắt lấy nước cốt của nửa quả cam (để lại 1 lát trang trí).\n3. Thêm đầy đá viên. Đậy nắp và lắc mạnh tay đến khi bình lạnh buốt.\n\n### Bước 4: Trình bày\n- Đổ ra ly cao.\n- Trang trí bằng đào miếng cắt lát, một lát cam vàng và một cây sả tươi.',
    stars: 4,
  },
  {
    id: 'r11',
    code: 'REC_CHE_KHUC_BACH',
    name: 'Chè Khúc Bạch',
    description: 'Món tráng miệng thanh mát. Viên khúc bạch béo ngậy tan trong miệng cùng hạnh nhân lát giòn tan.',
    image: 'https://tse1.mm.bing.net/th/id/OIP.F7-D-Pw-p74UZOnk58y5hwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',
    prepTime: 30,
    cookTime: 240,
    totalTime: 270,
    categoryId: 'c3',
    authorId: 'u2',
    nutrition: { calories: 300, protein: 5, fat: 18, carbs: 35, cholesterol: 40 },
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
    directions:
      '### Bước 1: Làm thạch Khúc Bạch\n1. Ngâm gelatin trong nước lạnh 15 phút cho nở mềm.\n2. Đun sữa tươi và whipping cream, đường trên lửa nhỏ (không để sôi bùng).\n3. Cho gelatin đã ngâm vào nồi sữa, khuấy tan hoàn toàn. (Có thể thêm trà xanh hoặc cacao ở bước này để tạo màu).\n4. Đổ ra khuôn, để nguội và cho vào tủ lạnh ngăn mát 3-4 tiếng cho đông đặc.\n\n### Bước 2: Nấu nước đường\n- Đun 1 lít nước với đường phèn. Cho thêm bó lá dứa cho thơm.\n- Khi nước sôi, cho cơm nhãn (đã bỏ hạt) hoặc vải vào trần sơ rồi tắt bếp ngay để giữ độ giòn. Để nguội.\n\n### Bước 3: Hoàn thiện\n1. Rang vàng hạnh nhân lát trong chảo (không cần dầu) đến khi thơm.\n2. Dùng dao gợn sóng cắt thạch khúc bạch thành miếng vừa ăn.\n3. Cho thạch vào bát, thêm nhãn, chan nước đường và rắc hạnh nhân lên trên.\n4. Thêm đá bào và thưởng thức.',
    stars: 3,
  },
  {
    id: 'r12',
    code: 'REC_XOI_GAC',
    name: 'Xôi Gấc Đậu Xanh',
    description: 'Món ăn sáng may mắn với màu đỏ tự nhiên. Hạt nếp dẻo thơm quyện vị bùi của đậu xanh.',
    image: 'https://file.hstatic.net/200000624211/file/10_82c93d5d5dba4eb8a045194429cebfda_grande.jpg',
    prepTime: 60,
    cookTime: 40,
    totalTime: 100,
    categoryId: 'c5',
    authorId: 'u1',
    nutrition: { calories: 400, protein: 10, fat: 8, carbs: 70, cholesterol: 0 },
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
    directions:
      '### Bước 1: Ngâm gạo và Chuẩn bị Gấc\n- Gạo nếp vo sạch, ngâm qua đêm (6-8 tiếng) rồi vớt ra để ráo, xóc với chút muối.\n- Bổ gấc lấy ruột. Trộn thịt gấc với 1 thìa **rượu trắng** để gấc dậy màu đỏ tươi.\n- Trộn đều gấc với gạo nếp, bóp nhẹ tay cho màu ngấm đều vào gạo.\n\n### Bước 2: Làm nhân đậu xanh\n- Đậu xanh ngâm mềm, hấp chín.\n- Nghiền nhuyễn đậu xanh với chút đường và dầu ăn, sên lửa nhỏ cho dẻo mịn.\n\n### Bước 3: Đồ xôi\n1. Cho gạo vào chõ đồ xôi. Hấp khoảng 30 phút.\n2. Mở vung, rưới 2 thìa mỡ gà hoặc dầu ăn vào đảo đều cho xôi bóng.\n3. Đồ thêm 10 phút nữa cho hạt xôi chín dẻo.\n\n### Bước 4: Đóng khuôn\n- Cho một lớp xôi vào khuôn, nén nhẹ.\n- Thêm một lớp đậu xanh ở giữa.\n- Phủ tiếp một lớp xôi lên trên, nén chặt và lấy ra đĩa.',
    stars: 5,
  },
  {
    id: 'r13',
    code: 'REC_GA_CHIEN_MAM',
    name: 'Cánh Gà Chiên Nước Mắm',
    description: 'Lớp da giòn rụm, thịt bên trong mềm ẩm. Vị mặn ngọt kích thích vị giác cực độ.',
    image: 'https://tse1.mm.bing.net/th/id/OIP.S-fsSeT9Pnxh31AExwPE-wHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    prepTime: 15,
    cookTime: 20,
    totalTime: 35,
    categoryId: 'c2',
    authorId: 'u3',
    nutrition: { calories: 450, protein: 30, fat: 25, carbs: 10, cholesterol: 90 },
    ingredients: [
      { section: 'Thịt', items: [{ name: 'Cánh gà', quantity: '500g' }] },
      {
        section: 'Sốt mắm',
        items: [
          { name: 'Nước mắm ngon', quantity: '3 thìa' },
          { name: 'Đường', quantity: '2 thìa' },
          { name: 'Tỏi băm', quantity: '1 củ' },
        ],
      },
    ],
    directions:
      '### Bước 1: Chiên gà\n1. Cánh gà rửa sạch nước muối loãng, chặt khúc ngay khớp hoặc để nguyên. Thấm khô.\n2. Có thể áo một lớp bột chiên giòn mỏng (tùy chọn) để da giòn lâu hơn.\n3. Chiên gà ngập dầu với lửa vừa đến khi vàng ruộm. Vớt ra giấy thấm dầu.\n\n### Bước 2: Làm sốt mắm tỏi\n- Pha hỗn hợp: 3 thìa nước mắm + 2 thìa đường + 1 thìa tương ớt + 1 thìa nước lọc. Khuấy tan.\n- Phi thơm tỏi băm trong chảo dầu (lấy bớt dầu chiên gà ra) đến khi vàng thơm thì vớt xác tỏi ra riêng (để giữ độ giòn).\n\n### Bước 3: Xóc chảo\n1. Đổ bát nước sốt vào chảo, đun sôi lăn tăn cho sệt lại.\n2. Cho cánh gà đã chiên vào, đảo đều nhanh tay với lửa lớn trong 1 phút để sốt bám đều.\n3. Tắt bếp, rắc tỏi phi lên trên và bày ra đĩa.\n\n> **Lưu ý:** Không chiên gà quá lâu sẽ bị khô thịt bên trong.',
    stars: 5,
  },
  {
    id: 'r14',
    code: 'REC_NAM_KHO_TIEU',
    name: 'Nấm Rơm Kho Tiêu',
    description: 'Món chay đậm đà hương vị đồng quê. Nước kho sánh quyện chấm rau luộc cực ngon.',
    image: 'https://yummyday.vn/uploads/images/nam-rom-kho-tieu-5.jpg',
    prepTime: 15,
    cookTime: 20,
    totalTime: 35,
    categoryId: 'c1',
    authorId: 'u2',
    nutrition: { calories: 80, protein: 4, fat: 2, carbs: 10, cholesterol: 0 },
    ingredients: [
      {
        section: 'Chính',
        items: [
          { name: 'Nấm rơm', quantity: '300g' },
          { name: 'Tiêu xanh', quantity: '2 nhánh' },
        ],
      },
      { section: 'Gia vị', items: [{ name: 'Nước tương, dầu hào chay, đường', quantity: 'Vừa đủ' }] },
    ],
    directions:
      '### Bước 1: Sơ chế nấm\n- Nấm rơm gọt bỏ chân đen, ngâm nước muối loãng 10 phút.\n- Rửa sạch, để ráo. Nấm to thì cắt đôi, nấm nhỏ khía dấu thập trên đầu để dễ thấm gia vị.\n- Ướp nấm với 1 thìa hạt nêm chay, chút nước tương và tiêu xay.\n\n### Bước 2: Kho nấm\n1. Dùng nồi đất (nếu có) sẽ ngon hơn. Phi thơm đầu hành hoặc boaro.\n2. Cho nấm vào xào săn với lửa lớn.\n3. Thêm nước tương, đường, chút nước màu dừa, dầu hào chay và vài thìa nước lọc xâm xấp mặt nấm.\n4. Cho **tiêu xanh** cả nhánh và ớt hiểm vào kho cùng.\n\n### Bước 3: Hoàn thành\n- Kho lửa riu riu đến khi nước sốt keo lại sền sệt, nấm chuyển màu nâu bóng đẹp mắt.\n- Rắc thêm tiêu xay, tắt bếp. Ăn nóng với cơm trắng hoặc chấm rau luộc.',
    stars: 3,
  },
  {
    id: 'r15',
    code: 'REC_SUA_DAU_NANH',
    name: 'Sữa Đậu Nành Lá Dứa',
    description: 'Thức uống dinh dưỡng cho mọi lứa tuổi. Hương lá dứa thơm nhẹ giúp thư giãn tinh thần.',
    image: 'https://tse2.mm.bing.net/th/id/OIP.PpalqPFz2vu58hl91VdheAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3',
    prepTime: 480,
    cookTime: 30,
    totalTime: 510,
    categoryId: 'c4',
    authorId: 'u1',
    nutrition: { calories: 100, protein: 8, fat: 4, carbs: 12, cholesterol: 0 },
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
    directions:
      '### Bước 1: Ngâm và Xay\n- Chọn hạt đậu nành bóng, không mốc. Ngâm nước từ **6-8 tiếng** cho hạt nở mềm (thay nước 1-2 lần để không bị chua).\n- Rửa sạch đậu, bóc vỏ (hoặc để vỏ tùy thích).\n- Cho đậu vào máy xay sinh tố với khoảng 1.5 lít nước. Xay thật nhuyễn mịn.\n\n### Bước 2: Lọc sữa\n- Đổ hỗn hợp vào túi vải lọc, vắt kiệt lấy nước cốt. Bỏ bã.\n\n### Bước 3: Nấu sữa\n1. Đổ nước đậu vào nồi, cho bó **lá dứa** đã rửa sạch cuộn gọn vào.\n2. Đun lửa vừa, khuấy đều tay liên tục để không bị khê đáy nồi.\n3. Khi sữa bắt đầu sôi bùng, hạ lửa nhỏ nhất, vớt bọt kĩ.\n4. Đun liu riu thêm 10-15 phút để sữa chín kỹ (tránh bị đau bụng).\n5. Thêm đường phèn, khuấy tan rồi tắt bếp.\n\n> **Lưu ý:** Có thể uống nóng hoặc để nguội thêm đá đều ngon tuyệt.',
    stars: 3,
  },
  {
    id: 'r16',
    code: 'REC_SUA_CHUA_NEP_CAM',
    name: 'Sữa Chua Nếp Cẩm',
    description: 'Sự kết hợp hoàn hảo giữa sữa chua lên men và nếp cẩm dẻo bùi. Tốt cho tiêu hóa.',
    image: 'https://befresh.vn/wp-content/uploads/2023/04/s-a-chua-n-p-c-m-1.jpg',
    prepTime: 120,
    cookTime: 40,
    totalTime: 160,
    categoryId: 'c3',
    authorId: 'u3',
    nutrition: { calories: 250, protein: 6, fat: 5, carbs: 45, cholesterol: 10 },
    ingredients: [
      {
        section: 'Nếp cẩm',
        items: [
          { name: 'Gạo nếp cẩm', quantity: '200g' },
          { name: 'Nước cốt dừa', quantity: '100ml' },
          { name: 'Đường', quantity: '100g' },
        ],
      },
      { section: 'Sữa', items: [{ name: 'Sữa chua không đường', quantity: '4 hộp' }] },
    ],
    directions:
      '### Bước 1: Nấu nếp cẩm\n- Gạo nếp cẩm vo sạch, ngâm nước ấm 2-4 tiếng.\n- Cho gạo vào nồi, đổ nước xâm xấp (như nấu cơm nếp), thêm một xíu muối.\n- Nấu chín mềm. Nếu cạn nước mà gạo chưa mềm thì chế thêm ít nước sôi.\n\n### Bước 2: Sên nếp cẩm\n1. Khi nếp đã chín, chắt bỏ bớt nước nhớt (nếu quá nhiều).\n2. Cho đường và nước cốt dừa vào nồi nếp.\n3. Đảo đều tay trên lửa nhỏ khoảng 5-10 phút cho hạt nếp bóng, ngấm đường và hỗn hợp keo lại sền sệt.\n4. Tắt bếp, để nguội hoàn toàn.\n\n### Bước 3: Trình bày\n- Múc chè nếp cẩm vào ly (khoảng 1/3 ly).\n- Đổ sữa chua (Vinamilk hoặc sữa chua nhà làm) lên trên.\n- Thêm đá bào và một chút cốt dừa tươi nếu thích béo. Trộn đều và thưởng thức.',
    stars: 3,
  },
  {
    id: 'r17',
    code: 'REC_BANH_CUON',
    name: 'Bánh Cuốn Nóng',
    description: 'Bữa sáng nhẹ bụng. Vỏ bánh tráng mỏng trong veo, nhân thịt mộc nhĩ giòn sần sật.',
    image: 'https://cdn.eva.vn/upload/4-2023/images/2023-11-09/cach-lam-banh-cuon-bang-chao-chong-dinh-tai-nha-ngon-nhuc-nhoi-banh-cuon-eva-002-1699523484-381-width780height440.jpg',
    prepTime: 40,
    cookTime: 30,
    totalTime: 70,
    categoryId: 'c5',
    authorId: 'u2',
    nutrition: { calories: 320, protein: 12, fat: 10, carbs: 45, cholesterol: 30 },
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
    directions:
      '### Bước 1: Pha bột tráng bánh\n- Trộn đều bột gạo, bột năng, muối và nước. Thêm 1 thìa dầu ăn để bột láng mịn.\n- Để bột nghỉ ít nhất **30 phút** cho nở. (Lưu ý: Chắt bỏ nước trong bên trên rồi bù lại lượng nước mới tương đương để bánh không bị chua bột).\n\n### Bước 2: Làm nhân\n- Mộc nhĩ ngâm nở, băm nhỏ. Hành tây băm nhỏ.\n- Phi thơm hành tím, cho thịt băm vào xào săn.\n- Tiếp tục cho mộc nhĩ, hành tây vào xào chín. Nêm hạt nêm, tiêu xay đậm đà.\n\n### Bước 3: Tráng bánh bằng chảo chống dính\n1. Dùng chảo chống dính tốt, phết một lớp dầu cực mỏng. Làm nóng chảo.\n2. Múc 1 vá bột đổ vào chảo, láng đều thật mỏng.\n3. Đậy vung khoảng **30 giây - 1 phút** cho bánh chín bột trong.\n4. Úp ngược chảo ra đĩa (đã thoa dầu) để lấy bánh ra.\n\n### Bước 4: Cuốn bánh\n- Cho nhân thịt vào giữa lá bánh, cuộn tròn lại.\n- Rắc hành phi vàng giòn lên trên. Ăn kèm nước mắm chua ngọt và chả lụa.',
    stars: 4,
  },
  {
    id: 'r18',
    code: 'REC_COM_TAM',
    name: 'Cơm Tấm Sườn Nướng',
    description: 'Món ăn đặc trưng của Sài Gòn với hạt cơm tấm dẻo thơm, sườn nướng mật ong vàng óng và nước mắm chua ngọt đậm đà.',
    image: 'https://beptruong.edu.vn/wp-content/uploads/2018/09/pha-nuoc-mam-com-tam.jpg',
    prepTime: 30,
    cookTime: 45,
    totalTime: 75,
    categoryId: 'c2',
    authorId: 'u1',
    nutrition: { calories: 650, protein: 35, fat: 28, carbs: 75, cholesterol: 95 },
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
    directions:
      '### Bước 1: Nấu cơm tấm\n- Gạo tấm vo sạch, ngâm 20-30 phút.\n- Cho vào nồi cơm điện nấu ít nước hơn gạo thường hoặc ngon nhất là **hấp cách thủy** để hạt cơm tơi xốp, không bị nát.\n\n### Bước 2: Ướp Sườn Cốt Lết\n- Sườn rửa sạch, dùng búa dần thịt đập nhẹ cho mềm.\n- Ướp với hỗn hợp: Mật ong, sữa đặc (bí quyết giúp thịt mềm), nước tương, dầu hào, sả băm, tỏi băm, dầu ăn và chút ngũ vị hương.\n- Để tủ lạnh ít nhất **2-3 tiếng**.\n\n### Bước 3: Nướng sườn\n- Nướng trên than hoa là ngon nhất. Quết nước ướp lên thịt trong lúc nướng để không bị khô.\n- Nướng đến khi thịt vàng óng, cháy xém nhẹ các cạnh.\n\n### Bước 4: Mỡ hành và Nước mắm\n- **Mỡ hành:** Hành lá thái nhỏ, đổ dầu sôi vào trộn đều với chút muối đường.\n- **Nước mắm:** Nấu nước mắm với đường tỷ lệ 1:1 cho kẹo lại, để nguội thêm tỏi ớt băm.\n\n### Bước 5: Trình bày\n- Xới cơm ra đĩa, đặt miếng sườn nướng lên. Thêm bì, chả trứng (nếu có).\n- Rưới mỡ hành lên cơm. Dọn kèm dưa chua và bát nước mắm kẹo.',
    stars: 5,
  },
];

const mockUsers = [
  { id: 'u1', email: 'hao.mai@example.com', fullName: 'Mai Thế Hào', password: 'abc123456', avatar: 'https://static.vecteezy.com/system/resources/previews/025/738/217/original/anime-black-and-white-isolated-icon-illustration-vector.jpg', role: 'admin', favoriteRecipes: ['r16', 'r3'] },
  { id: 'u2', email: 'huong.pham@example.com', fullName: 'Phạm Quý Hương', password: 'abc123456', avatar: 'https://freestylized.com/wp-content/uploads/2024/11/sky_26-768x768.webp', role: 'user', favoriteRecipes: [] },
  { id: 'u3', email: 'nam.tran@example.com', fullName: 'Trần Văn Nam', password: 'abc123456', avatar: 'https://tse1.mm.bing.net/th/id/OIP.hp-Tsbnv6yy2RrcWRo9mVgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3', role: 'user', favoriteRecipes: [] },
];

const ver = '0001';
const currentVer = localStorage.getItem('APP_INITIALIZED');

if (currentVer !== ver) {
  if (currentVer) {
    localStorage.clear();
  }
  localStorage.setItem('APP_INITIALIZED', ver);
  localStorage.setItem('BLOGS', JSON.stringify(mockBlogs));
  localStorage.setItem('CATEGORIES', JSON.stringify(mockCategories));
  localStorage.setItem('RECIPES', JSON.stringify(mockRecipes));
  localStorage.setItem('USERS', JSON.stringify(mockUsers));
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (!root) return;

  const id = localStorage.getItem('CURRENT_USER_ID');
  const user = id ? JSON.parse(localStorage.getItem('USERS') || '[]').find((u) => u.id === id) : null;
  const fallback = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0RJ6oSUR7W8DB9W3TOaitZSbY8EIMLDe6Jw&s';
  const isAdmin = user?.role === 'admin';

  const isManagePage = window.location.pathname.includes('manage-');
  const rootPath = '';
  const adminPath = '';

  root.insertAdjacentHTML(
    'afterbegin',
    `
      <div class="header__overlay header__overlay--default"></div>
      <header class="header">
        <div class="header__container">
          <a href="${rootPath}index.html" class="header__logo"><img src="${rootPath}..//img/logo.svg" alt="Logo" /></a>
          <nav class="header__nav">
            <ul class="header__menu">
              <li><a href="${rootPath}index.html" class="header__link fw-light">Home</a></li>
              <li><a href="${rootPath}recipes.html" class="header__link fw-light">Recipes</a></li>
              <li><a href="${rootPath}blogs.html" class="header__link fw-light">Blog</a></li>
              <li><a href="${rootPath}about.html" class="header__link fw-light">About</a></li>
              <li><a href="${rootPath}contact.html" class="header__link fw-light">Contact</a></li>
            </ul>
          </nav>
          <div class="header__actions">
            ${
              user
                ? `
              <div class="header__user-wrapper">
                <div class="header__user header__user--desktop" role="button">
                  <img src="${user.avatar}" alt="${user.fullName}" class="header__user-avatar" onerror="this.src='${fallback}'"/>
                  <span class="header__user-name fw-medium">${user.fullName}</span>
                </div>
                <ul class="header__user-menu">
                  <li><a href="${rootPath}profile.html" class="header__user-menu-item"><i data-lucide="user"></i><span>Profile</span></a></li>
                  ${
                    isAdmin
                      ? `
                    <li><a href="manage-users.html" class="header__user-menu-item"><i data-lucide="shield"></i><span>Manage Users</span></a></li>
                    <li><a href="manage-recipes.html" class="header__user-menu-item"><i data-lucide="shield"></i><span>Manage Recipes</span></a></li>
                    <li><a href="manage-blogs.html" class="header__user-menu-item"><i data-lucide="shield"></i><span>Manage Blogs</span></a></li>
                  `
                      : ''
                  }
                  <li><button class="header__user-menu-item logout-btn"><i data-lucide="log-out"></i><span>Logout</span></button></li>
                </ul>
              </div>
            `
                : `
              <a href="${rootPath}login.html" class="btn btn-primary header__auth-btn d-flex align-items-center gap-2">
                <i data-lucide="log-in"></i> <span>Sign In</span>
              </a>
            `
            }
            <button class="header__toggle" aria-label="Open Menu"><i data-lucide="menu"></i></button>
          </div>
          <aside class="header__drawer">
            <div class="header__drawer-top">
              <h3 class="ff-serif"><span class="highlight-text">RECIPE4F</span> Menu</h3>
              <button class="header__close-btn"><i data-lucide="x"></i></button>
            </div>
            <ul class="header__drawer-menu">
              <li><a href="${rootPath}index.html" class="header__drawer-link fw-light">Home</a></li>
              <li><a href="${rootPath}recipes.html" class="header__drawer-link fw-light">Recipes</a></li>
              <li><a href="${rootPath}blogs.html" class="header__drawer-link fw-light">Blog</a></li>
              <li><a href="${rootPath}about.html" class="header__drawer-link fw-light">About</a></li>
              <li><a href="${rootPath}contact.html" class="header__drawer-link fw-light">Contact</a></li>
            </ul>
          </aside>
        </div>
      </header>
    `,
  );

  root.insertAdjacentHTML(
    'beforeend',
    `
      <footer id="app-footer">
        <div class="footer__top">
          <div class="footer__top__part footer__info">
            <a href="${rootPath}index.html" class="footer__logo"><img src="${rootPath}..//img/logo.svg" alt="Logo" /></a>
            <p class="footer__description ff-main fw-light">
              <strong class="highlight-text">Recipe4f</strong> is your ultimate destination for recipes and cooking tips.
            </p>
          </div>
          <nav class="footer__top__part footer__nav">
            <ul>
              <li><a href="${rootPath}index.html" class="footer__link fw-light">Home</a></li>
              <li><a href="${rootPath}recipes.html" class="footer__link fw-light">Recipes</a></li>
              <li><a href="${rootPath}blogs.html" class="footer__link fw-light">Blog</a></li>
            </ul>
            <ul class="d-flex gap-3">
              <a href="#" class="social-icon"><i data-lucide="facebook"></i></a>
              <a href="#" class="social-icon"><i data-lucide="instagram"></i></a>
              <a href="#" class="social-icon"><i data-lucide="github"></i></a>
            </ul>
          </nav>
        </div>
        <hr class="footer__divider" />
        <div class="footer__bottom"><p class="footer__copy">&copy; 2024 Recipe4f. All rights reserved.</p></div>
      </footer>

      <div class="modal fade" id="noti-modal" tabindex="-1" aria-labelledby="noti-modal__label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title" id="noti-modal__label">Notification</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body py-4">
              <p class="modal-message mb-0"></p>
            </div>
            <div class="modal-footer border-0">
              <button type="button" class="btn btn-primary px-4" data-bs-dismiss="modal">OK</button>
            </div>
          </div>
        </div>
      </div>
    `,
  );

  const toggle = document.querySelector('.header__toggle');
  const drawer = document.querySelector('.header__drawer');
  const close = document.querySelector('.header__close-btn');
  const overlay = document.querySelector('.header__overlay');
  const logout = document.querySelector('.logout-btn');

  const setDrawer = (open) => {
    drawer?.classList.toggle('header__drawer--open', open);
    overlay?.classList.toggle('header__overlay--visible', open);
    overlay?.classList.toggle('header__overlay--hidden', !open);
  };

  if (toggle) toggle.onclick = () => setDrawer(true);
  if (close) close.onclick = () => setDrawer(false);
  if (overlay) overlay.onclick = () => setDrawer(false);
  if (logout)
    logout.onclick = () => {
      localStorage.removeItem('CURRENT_USER_ID');
      window.location.reload();
    };

  const path = window.location.pathname;
  root.querySelectorAll('.header__link, .header__drawer-link, .footer__link').forEach((link) => {
    if (path.endsWith(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });

  if (window.lucide) window.lucide.createIcons();

  window.notification = {
    _show: (type, title, message) => {
      const el = document.getElementById('noti-modal');
      if (!el) return;
      const icon = { success: 'check-circle', error: 'x-circle', warning: 'alert-triangle', question: 'help-circle' }[type] || 'info';
      el.querySelector('.modal-title').innerHTML = `<div class="modal-icon ${type}"><i data-lucide="${icon}"></i></div> ${title}`;
      el.querySelector('.modal-message').textContent = message;
      window.lucide?.createIcons();
      bootstrap.Modal.getOrCreateInstance(el).show();
    },
    success(t, m) {
      this._show('success', t, m);
    },
    error(t, m) {
      this._show('error', t, m);
    },
    warn(t, m) {
      this._show('warning', t, m);
    },
    info(t, m) {
      this._show('info', t, m);
    },
    quest(t, m) {
      this._show('question', t, m);
    },
  };

  window.renderInfoCard = (config) => {
    const uniqueId = `img-${Math.random().toString(36).substr(2, 9)}`;
    const image = config.image;
    const title = config.title;
    const description = config.description;
    const href = config.href;
    const badgeHtml = config.badgeHtml || '';
    const footerHtml = config.footerHtml || '';
    const imageAlt = config.imageAlt || title;
    const fallbackImage = config.fallbackImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0RJ6oSUR7W8DB9W3TOaitZSbY8EIMLDe6Jw&s';
    const cardClass = config.cardClass || 'info-card';

    return `
      <a href="${href}" class="d-block h-100 text-decoration-none">
        <div class="card h-100 border-0 shadow-sm info-card ${cardClass === 'info-card' ? '' : cardClass}">
          <div class="position-relative">
            <img id="${uniqueId}" src="${image}" class="card-img-top" alt="${imageAlt}" onerror="this.onerror=null; this.src='${fallbackImage}';"/>
            ${badgeHtml ? `<div class="position-absolute top-0 end-0 m-3">${badgeHtml}</div>` : ''}
          </div>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title mb-2 fw-bold text-dark info-card__title ${cardClass === 'info-card' ? '' : cardClass + '__title'}">${title}</h5>
            <p class="card-text text-muted mb-3 grow info-card__desc ${cardClass === 'info-card' ? '' : cardClass + '__desc'}">${description}</p>
            ${footerHtml ? `<div class="mt-auto">${footerHtml}</div>` : ''}
          </div>
        </div>
      </a>`;
  };

  window.RecipeCard = {
    render: (recipe) => {
      const users = JSON.parse(localStorage.getItem('USERS') || '[]');
      const author = users.find((u) => u.id === recipe.authorId);
      const authorName = author ? author.fullName : 'Unknown Author';
      const fallbackAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0RJ6oSUR7W8DB9W3TOaitZSbY8EIMLDe6Jw&s';
      const authorAvatar = author?.avatar || fallbackAvatar;
      const currentUserId = localStorage.getItem('CURRENT_USER_ID');
      const currentUser = users.find((u) => u.id === currentUserId);
      const isFavorite = currentUser?.favoriteRecipes?.includes(recipe.id);

      return renderInfoCard({
        image: recipe.image,
        title: recipe.name,
        description: recipe.description,
        href: `recipe-detail.html?code=${recipe.code}`,
        imageAlt: recipe.name,
        cardClass: 'recipe-card',
        badgeHtml: `
          <div class="d-flex align-items-center gap-2 position-absolute top-0 end-0 z-10">
            <div class="badge bg-accent bg-white shadow-sm recipe-card__time" style="display: flex; align-items: center; gap: 0.5ch; font-size: 0.75rem; padding: 0.5em 1em;">
              <i data-lucide="clock" style="width: 1rem; height: 1rem;"></i>
              <span>${recipe.cookTime} min</span>
            </div>
            <button class="btn btn-white favorite-btn" data-id="${recipe.id}" style="width: 32px; height: 32px; display: grid; place-content: center; border-radius: 50%; outline: none; border: none">
              <i data-lucide="heart" style="width: 1.2rem; height: 1.2rem; fill: ${isFavorite ? 'red' : 'white'}; color: ${isFavorite ? 'red' : 'white'};"></i>
            </button>
          </div>`,
        footerHtml: `
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center gap-2">
              <img src="${authorAvatar}" alt="${authorName}" class="rounded-circle info-card__author-img" onerror="this.onerror=null; this.src='${fallbackAvatar}';"/>
              <span class="text-muted small">${authorName}</span>
            </div>
            <div class="d-flex text-warning small">
              ${[1, 2, 3, 4, 5].map((i) => `<i data-lucide="star" class="fill-current" style="width: 1rem; color: ${i <= (recipe.stars || 0) ? 'var(--color-accent)' : 'var(--color-bg-alt)'}"></i>`).join('')}
            </div>
          </div>`,
      });
    },
  };

  window.RecipeList = {
    render: (containerId, recipes) => {
      const container = document.getElementById(containerId);
      if (!container) return;
      if (recipes.length === 0) {
        container.innerHTML = `<div class="col-12 text-center py-5"><div class="mb-3"><i data-lucide="utensils-crossed" class="text-muted" style="width: 48px; height: 48px;"></i></div><h3 class="h5 text-muted">No recipes found</h3><p class="text-muted small">Try adjusting your filters or search criteria.</p></div>`;
        return;
      }
      container.innerHTML = recipes.map((recipe) => `<div class="col">${RecipeCard.render(recipe)}</div>`).join('');
    },
  };

  window.BlogCard = {
    render: (blog) => {
      const users = JSON.parse(localStorage.getItem('USERS') || '[]');
      const author = users.find((u) => u.id === blog.authorId);
      const authorName = author ? author.fullName : 'Unknown Author';
      const fallbackAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0RJ6oSUR7W8DB9W3TOaitZSbY8EIMLDe6Jw&s';
      const authorAvatar = author?.avatar || fallbackAvatar;
      const publishDate = new Date(blog.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

      return renderInfoCard({
        image: blog.image,
        title: blog.title,
        description: blog.excerpt,
        href: `blog-detail.html?id=${blog.id}`,
        imageAlt: blog.title,
        cardClass: 'blog-card',
        badgeHtml: `<div class="badge bg-accent bg-white shadow-sm blog-card__date" style="display: flex; align-items: center; gap: 0.5ch; font-size: 0.75rem; padding: 0.5em 1em;"><i data-lucide="calendar" style="width: 1rem; height: 1rem;"></i><span>${publishDate}</span></div>`,
        footerHtml: `<div class="d-flex align-items-center gap-2"><img src="${authorAvatar}" alt="${authorName}" class="rounded-circle info-card__author-img" onerror="this.onerror=null; this.src='${fallbackAvatar}';"/><span class="text-muted small">${authorName}</span></div>`,
      });
    },
  };

  window.BlogList = {
    render: (containerId, blogs) => {
      const container = document.getElementById(containerId);
      if (!container) return;
      if (blogs.length === 0) {
        container.innerHTML = `<div class="col-12 text-center py-5"><div class="mb-3"><i data-lucide="book-open" class="text-muted" style="width: 48px; height: 48px;"></i></div><h3 class="h5 text-muted">No blog posts found</h3><p class="text-muted small">Try adjusting your filters or search criteria.</p></div>`;
        return;
      }
      container.innerHTML = blogs.map((blog) => `<div class="col">${BlogCard.render(blog)}</div>`).join('');
    },
  };

  window.FavoriteCard = {
    render: (recipe) => {
      return renderInfoCard({
        image: recipe.image,
        title: recipe.name,
        description: recipe.description.substring(0, 80) + '...',
        href: `recipe-detail.html?code=${recipe.code}`,
        imageAlt: recipe.name,
        cardClass: 'favorite-card',
        footerHtml: `
          <div class="d-flex justify-content-between align-items-center">
            <span class="text-warning d-flex align-items-center gap-1">
              <i data-lucide="star" style="width: 14px; height: 14px; fill: currentColor;"></i>
              ${recipe.stars}
            </span>
            <button class="unfavorite-btn btn btn-sm btn-link text-danger px-2 py-1" data-id="${recipe.id}">
              <i data-lucide="heart-off" style="width: 14px; height: 14px;"></i> 
              Unfavorite
            </button>
          </div>`,
      });
    },
  };

  document.addEventListener('click', (e) => {
    const favBtn = e.target.closest('.favorite-btn');
    const unfavBtn = e.target.closest('.unfavorite-btn');
    if (!favBtn && !unfavBtn) return;

    e.preventDefault();
    const btn = favBtn || unfavBtn;
    const recipeId = btn.dataset.id;
    const currentUserId = localStorage.getItem('CURRENT_USER_ID');

    if (!currentUserId) {
      return window.notification.warn('Authentication Required', 'Please login to manage your favorites.');
    }

    const users = JSON.parse(localStorage.getItem('USERS') || '[]');
    const userIndex = users.findIndex((u) => u.id === currentUserId);
    if (userIndex === -1) return;

    const user = users[userIndex];
    if (!user.favoriteRecipes) user.favoriteRecipes = [];

    const recipeIndex = user.favoriteRecipes.indexOf(recipeId);
    let isNowFavorite = false;

    if (recipeIndex === -1) {
      user.favoriteRecipes.push(recipeId);
      isNowFavorite = true;
    } else {
      user.favoriteRecipes.splice(recipeIndex, 1);
      isNowFavorite = false;
    }

    localStorage.setItem('USERS', JSON.stringify(users));

    document.querySelectorAll(`[data-id="${recipeId}"]`).forEach((b) => {
      const icon = b.querySelector('i, svg');
      if (b.classList.contains('favorite-btn')) {
        if (icon) {
          icon.style.fill = isNowFavorite ? 'red' : 'white';
          icon.style.color = isNowFavorite ? 'red' : 'white';
        }
      }
    });

    if (unfavBtn && typeof window.loadFavorites === 'function') {
      window.loadFavorites();
    }
  });
});
