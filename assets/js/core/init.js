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
const VERSION = '03-02-2026-11:17';

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
			avatar: 'https://static.vecteezy.com/system/resources/previews/025/738/217/original/anime-black-and-white-isolated-icon-illustration-vector.jpg',
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
			avatar: 'https://tse1.mm.bing.net/th/id/OIP.hp-Tsbnv6yy2RrcWRo9mVgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
		}),
	];

	userRepo.saveBatch(users);

	const categories = [
		new Category({ id: 'c1', code: 'CATE_VEGAN', name: 'Món Chay', description: 'Các món ăn thuần thực vật, thanh đạm.' }),
		new Category({ id: 'c2', code: 'CATE_MEAT', name: 'Món Mặn', description: 'Các món chế biến từ thịt, cá, hải sản.' }),
		new Category({ id: 'c3', code: 'CATE_DESSERT', name: 'Tráng Miệng', description: 'Bánh ngọt, chè, kem và đồ ngọt.' }),
		new Category({ id: 'c4', code: 'CATE_DRINK', name: 'Đồ Uống', description: 'Sinh tố, nước ép, cocktail.' }),
		new Category({ id: 'c5', code: 'CATE_BREAKFAST', name: 'Ăn Sáng', description: 'Năng lượng cho ngày mới.' }),
	];

	categoryRepo.saveBatch(categories);

	const recipes = [
		new Recipe({
			id: 'r1',
			code: 'REC_PHO_BO',
			name: 'Phở Bò Truyền Thống',
			description: 'Món ăn quốc hồn quốc túy của Việt Nam. Nước dùng thơm phức mùi quế hồi, hòa quyện cùng bánh phở mềm và thịt bò ngọt lịm.',
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
			directions: 'Hầm xương ống 6 tiếng. Nướng gừng, hành tây, quế hồi thả vào nồi. Trần bánh phở, xếp thịt bò và chan nước dùng.',
			prepTime: 30,
			cookTime: 360,
			categoryId: 'c2',
			authorId: 'u1',
			image: 'https://file.hstatic.net/200000700229/article/pho-bo-ha-noi-thumb_980349ef2bcf40c9b736a672e5a944d3.jpg',
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
			description: 'Món khai vị healthy, giàu chất béo tốt. Phù hợp cho người ăn kiêng và giảm cân.',
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
			directions: 'Luộc trứng chín lòng đào. Cắt bơ hạt lựu. Trộn đều rau và sốt.',
			prepTime: 15,
			cookTime: 10,
			categoryId: 'c1',
			authorId: 'u2',
			image: 'https://file.hstatic.net/1000337345/article/screenshot_2023-02-16_145739_1855658674884e3f927b0cc5083bb720_1024x1024.png',
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
			description: 'Béo ngậy vị trứng sữa, thơm lừng mùi caramen đắng nhẹ. Món tráng miệng hoàn hảo.',
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
			directions: 'Thắng đường làm caramen. Đánh trứng với sữa ấm. Hấp cách thủy 30 phút.',
			prepTime: 20,
			cookTime: 40,
			categoryId: 'c3',
			authorId: 'u2',
			image: 'https://cdn.tgdd.vn/Files/2020/04/20/1250342/2-cach-lam-banh-flan-mem-min-khong-tanh-ngay-tai-nha-202106182157209970.jpg',
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
			directions: 'Chiên sơ sườn. Phi thơm tỏi, làm sốt cà chua. Đảo sườn với sốt đến khi sệt lại.',
			prepTime: 20,
			cookTime: 30,
			categoryId: 'c2',
			authorId: 'u1',
			image: 'https://cdn.tgdd.vn/Files/2019/10/06/1205476/cach-lam-suon-xao-chua-ngot-mien-bac-dep-mat-va-ngon-com-202202241319497834.jpg',
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
			description: 'Giải nhiệt mùa hè với vị ngọt tự nhiên từ trái cây tươi. Thơm ngon và mát lạnh.',
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
			directions: 'Cắt nhỏ trái cây. Cho tất cả vào máy xay sinh tố xay nhuyễn.',
			prepTime: 10,
			cookTime: 10,
			categoryId: 'c4',
			authorId: 'u3',
			image: 'https://file.hstatic.net/200000700229/article/sinh-to-chuoi-xoai-thumb_798b914b42454d07abb183db5c879609.jpg',
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
			directions: 'Nướng lại bánh mì cho giòn. Phết pate, kẹp chả lụa và rau.',
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
			directions: 'Nấu nước me. Thả cá đã làm sạch vào. Nêm gia vị. Thả rau vào rồi tắt bếp ngay.',
			prepTime: 20,
			cookTime: 25,
			categoryId: 'c2',
			authorId: 'u1',
			image: 'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2024_3_31_638474737289073713_nau-canh-chua-ca-loc.jpg',
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
			description: 'Tinh hoa ẩm thực Hà Thành. Chả nướng than hoa thơm lừng ăn kèm nước chấm chua ngọt và rau sống.',
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
			directions: 'Ướp thịt với gia vị và nước hàng. Nướng trên than hoa đến khi xém cạnh. Pha nước chấm chua ngọt thả đu đủ cà rốt vào.',
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
			description: 'Món chay quốc dân đơn giản mà đưa cơm. Đậu hũ chiên vàng thấm đẫm sốt cà chua đậm đà.',
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
			directions: 'Chiên vàng đậu hũ. Phi thơm hành, xào cà chua nhuyễn thành sốt. Cho đậu vào rim nhỏ lửa 10 phút.',
			prepTime: 10,
			cookTime: 15,
			categoryId: 'c1',
			authorId: 'u2',
			image: 'https://www.thatlangon.com/wp-content/uploads/2021/06/cong-thuc-cach-lam-dau-sot-ca-chua.jpg',
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
			description: 'Thức uống giải nhiệt sành điệu. Vị chát nhẹ của trà kết hợp vị ngọt thanh của đào và hương sả nồng nàn.',
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
			directions: 'Nấu nước sả. Ủ trà. Cho nước cam, siro đào vào lắc đều với đá. Trang trí bằng đào miếng và sả.',
			prepTime: 10,
			cookTime: 5,
			categoryId: 'c4',
			authorId: 'u3',
			image: 'https://th.bing.com/th/id/OIP.nUDz8X3RAO7t8EPkvOvHUAHaE8?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
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
			description: 'Món tráng miệng thanh mát. Viên khúc bạch béo ngậy tan trong miệng cùng hạnh nhân lát giòn tan.',
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
			directions: 'Nấu tan gelatin với sữa và kem, để đông. Nấu nước đường phèn thả nhãn vào. Cắt khúc bạch chan nước dùng.',
			prepTime: 30,
			cookTime: 240,
			categoryId: 'c3',
			authorId: 'u2',
			image: 'https://tse1.mm.bing.net/th/id/OIP.F7-D-Pw-p74UZOnk58y5hwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',
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
			description: 'Món ăn sáng may mắn với màu đỏ tự nhiên. Hạt nếp dẻo thơm quyện vị bùi của đậu xanh.',
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
			directions: 'Trộn gấc với rượu và gạo nếp. Đồ xôi 2 lần lửa cho dẻo. Đậu xanh hấp chín nghiền mịn kẹp giữa xôi.',
			prepTime: 60,
			cookTime: 40,
			categoryId: 'c5',
			authorId: 'u1',
			image: 'https://file.hstatic.net/200000624211/file/10_82c93d5d5dba4eb8a045194429cebfda_grande.jpg',
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
			directions: 'Chiên cánh gà ngập dầu cho vàng giòn. Phi thơm tỏi, cho mắm đường vào nấu sệt. Đảo nhanh gà trong sốt.',
			prepTime: 15,
			cookTime: 20,
			categoryId: 'c2',
			authorId: 'u3',
			image: 'https://tse1.mm.bing.net/th/id/OIP.S-fsSeT9Pnxh31AExwPE-wHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
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
			directions: 'Nấm rửa sạch ngâm muối. Phi thơm đầu hành, cho nấm vào xào săn. Thêm gia vị và tiêu xanh kho liu riu.',
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
			description: 'Thức uống dinh dưỡng cho mọi lứa tuổi. Hương lá dứa thơm nhẹ giúp thư giãn tinh thần.',
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
			directions: 'Ngâm đậu 8 tiếng, xay nhuyễn và lọc bã. Đun sôi nước đậu với lá dứa, vớt bọt thường xuyên.',
			prepTime: 480,
			cookTime: 30,
			categoryId: 'c4',
			authorId: 'u1',
			image: 'https://tse2.mm.bing.net/th/id/OIP.PpalqPFz2vu58hl91VdheAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3',
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
			description: 'Sự kết hợp hoàn hảo giữa sữa chua lên men và nếp cẩm dẻo bùi. Tốt cho tiêu hóa.',
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
			directions: 'Nấu nếp cẩm chín mềm, sên với đường và cốt dừa cho keo lại. Để nguội, múc ra ly và đổ sữa chua lên trên.',
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
			description: 'Bữa sáng nhẹ bụng. Vỏ bánh tráng mỏng trong veo, nhân thịt mộc nhĩ giòn sần sật.',
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
			directions: 'Pha bột để nghỉ 30p. Xào nhân thịt chín. Tráng lớp bột mỏng trên chảo, đậy vung 1p rồi cuốn nhân.',
			prepTime: 40,
			cookTime: 30,
			categoryId: 'c5',
			authorId: 'u2',
			image: 'https://cdn.eva.vn/upload/4-2023/images/2023-11-09/cach-lam-banh-cuon-bang-chao-chong-dinh-tai-nha-ngon-nhuc-nhoi-banh-cuon-eva-002-1699523484-381-width780height440.jpg',
			nutrition: {
				calories: 320,
				protein: 12,
				fat: 10,
				carbs: 45,
				cholesterol: 30,
			},
			stars: 4,
		}),
	];

	recipeRepo.saveBatch(recipes);

	const blogPosts = [
		new BlogPost({
			id: 'b1',
			title: '5 Mẹo Giúp Rau Luộc Luôn Xanh',
			excerpt: 'Bí quyết nhỏ giúp đĩa rau luộc của bạn trông hấp dẫn như nhà hàng 5 sao.',
			image: 'https://cdn.tgdd.vn/Files/2020/09/09/1288677/nhung-tac-dung-cua-da-lanh-ma-ban-khong-ngo-toi.jpg',
			authorId: 'u1',
			publishedAt: new Date('2023-10-01').toISOString(),
			tags: ['Tips', 'Rau củ', 'Kỹ năng'],
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
			image: 'https://bizweb.dktcdn.net/100/509/197/files/y-nghia-that-su-cua-viec-an-chay-trong-phat-giao-1.jpg?v=1747909095640',
			authorId: 'u2',
			publishedAt: new Date('2023-10-05').toISOString(),
			tags: ['Sức khỏe', 'Vegan', 'Lifestyle'],
			content: `
Ăn chay không chỉ là một trào lưu nhất thời mà là một lối sống mang lại nhiều lợi ích to lớn:

### Cải thiện sức khỏe tim mạch
Chế độ ăn nhiều rau củ, ngũ cốc và ít chất béo bão hòa giúp giảm cholesterol xấu, từ đó giảm nguy cơ mắc bệnh tim mạch 

[Image of healthy heart diagram]
.

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
			image: 'https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2024/04/noi-chien-khong-dau-mini-1.jpg',
			authorId: 'u3',
			publishedAt: new Date('2023-10-10').toISOString(),
			tags: ['Review', 'Dụng cụ', 'Bếp núc'],
			content: `
Nồi chiên không dầu (Air Fryer) đã trở thành thiết bị không thể thiếu. Dưới đây là so sánh nhanh 3 dòng phổ biến:

### 1. Philips Airfryer XXL 
* **Ưu điểm:** Công nghệ Twin TurboStar giảm 90% chất béo, chín đều không cần lật.
* **Nhược điểm:** Giá thành cao, hơi ồn.

### 2. Lock&Lock 5.2L
* **Ưu điểm:** Dung tích lớn, giá cả phải chăng, dễ vệ sinh.
* **Nhược điểm:** Lớp chống dính có thể bong nếu không bảo quản kỹ.

### 3. Xiaomi Smart Air Fryer
* **Ưu điểm:** Kết nối App điện thoại, thiết kế đẹp, giá rẻ.
* **Nhược điểm:** Dung tích hơi nhỏ (3.5L), phù hợp người độc thân hoặc gia đình nhỏ.

**Kết luận:** Nếu tài chính dư dả, hãy chọn Philips. Nếu cần ngon-bổ-rẻ, Lock&Lock là lựa chọn an toàn.
        `,
		}),

		new BlogPost({
			id: 'b4',
			title: 'Bí Quyết Chọn Thịt Bò Nấu Phở',
			excerpt: 'Hướng dẫn chọn nguyên liệu tươi ngon nhất từ chợ sớm để có nồi phở chuẩn vị.',
			image: 'https://dienmaynewsun.com/wp-content/uploads/2021/07/chon-thit-bo-ngon-de-nau-pho-1.jpg',
			authorId: 'u1',
			publishedAt: new Date('2023-10-15').toISOString(),
			tags: ['Nguyên liệu', 'Món Việt', 'Tips'],
			content: `
Thịt bò là linh hồn của món phở. Để bát phở ngon, bạn cần biết cách chọn thịt đúng chuẩn:

### Phân biệt các phần thịt
1.  **Gầu bò:** Phần thịt có mỡ giòn, ăn béo nhưng không ngấy.
2.  **Nạm bò:** Phần thịt có lẫn gân, khi hầm lâu sẽ rất mềm và thơm.
3.  **Lõi rùa/Bắp hoa:** Phần ngon nhất để làm bò tái, giòn sần sật.

### Cách nhìn thịt tươi 

[Image of fresh raw beef cuts]

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
