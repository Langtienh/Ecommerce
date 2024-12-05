# Đây là note ghi lại những bug gặp phải và cách fix

## Backend

### Bug: Build query case undefined

- **Mô tả**: Khi viết hàm tiện ích, gặp trường hợp input là undefined => build lỗi
- **Cách fix**: Đặt giá trị mặc định cho các field

### 2. Bug: khi create/update 1 đối tượng với filed không được phép

- **Mô tả**: khi create/update 1 đối tượng với input có filed không được phép
- **Cách fix**: ở service tạo 1 detructoring object mới vd: const {id, email, name} = dataInput

### 3. Bug: Form validation error

- **Mô tả**: Khi người dùng nhập dữ liệu không hợp lệ vào form, không có thông báo lỗi hiển thị.
- **Cách fix**: Thêm logic kiểm tra dữ liệu và hiển thị thông báo lỗi khi dữ liệu không hợp lệ.

## Frontend

## Template

### . Bug:

- **Mô tả**:
- **Cách fix**:
