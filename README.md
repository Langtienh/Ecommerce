# Ecommerce project

## Giới thiệu
Ecommerce project là một dự án thương mại điện tử được xây dựng để giúp người dùng mua sắm trực tuyến và quản lý cửa hàng dễ dàng. Dự án được phát triển với mục tiêu học hỏi và xây dựng các chức năng cốt lõi của một hệ thống e-commerce hiện đại.

## Công nghệ sử dụng
- **Frontend**: [Next.js](https://nextjs.org/) (React Framework)
- **Backend**: [NestJS](https://nestjs.com/) (Node.js Framework)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [TypeORM](https://typeorm.io/)
- **UI Framework**: TailwindCSS, ShanCN UI

## Các tính năng chính
- Quản lý sản phẩm (CRUD sản phẩm).
- Gửi mail
- Hỗ trợ giỏ hàng và thanh toán.
- Quản lý đơn hàng và trạng thái giao hàng.
- Tìm kiếm sản phẩm theo từ khóa hoặc danh mục.
- Lọc, sắp xếp sản phẩm theo đa tiêu chí.
- Đăng ký/Đăng nhập người dùng với JWT Authentication.
- Phân quyền người dùng theo mô hình Permission-Based Security.

## Cài đặt
### Yêu cầu
- Node.js >= 18
- PostgreSQL >= 13
- Yarn hoặc npm

### Clone Repository
```bash
git clone https://github.com/langtienh/ecommerce.git
cd ecommerce
```

```plaintext
Ecommerce/
│
├── Nextjs/          # Frontend dựa trên Next.js
│   ├── src/
│       ├── app/         # Các trang chính
│       ├── components/    # Các thành phần giao diện
│       └── ...
│
├── Nestjs/           # Backend dựa trên NestJS
│   ├── src/
│   │   ├── modules/   # Các module chính (Users, Products, Orders,...)
│   │   ├── main.ts    # File khởi động
│   │   └── ...
│   └── ...
│
└── README.md          # Tài liệu dự án
```

### Get started
#### Back-end
```bash
cd Nestjs
npm i
npm start
```
#### Font-end
```bash
cd Nextjs
npm i
npm run build
npm start
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
