# Giải quyết Circular Dependency trong NestJS với `forwardRef`

Circular dependency xảy ra khi hai hoặc nhiều module phụ thuộc lẫn nhau, dẫn đến lỗi trong việc khởi tạo các module này. Trong NestJS, bạn có thể sử dụng `forwardRef` để xử lý vấn đề này.

## Mô tả vấn đề

Giả sử bạn có hai module:

- **UserModule** phụ thuộc vào **AuthService** (từ AuthModule).
- **AuthModule** phụ thuộc vào **UserService** (từ UserModule).

Điều này dẫn đến vòng lặp phụ thuộc (circular dependency), gây lỗi khi NestJS cố gắng khởi tạo các module này.

---

## Cách giải quyết

### 1. Cấu hình các Module

#### UserModule

```typescript
import { Module, forwardRef } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [forwardRef(() => AuthModule)], // Sử dụng forwardRef để xử lý vòng lặp
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Export UserService để AuthModule có thể sử dụng
})
export class UserModule {}
```

#### AuthModule

```typescript
import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";

@Module({
  imports: [forwardRef(() => UserModule)], // Sử dụng forwardRef để xử lý vòng lặp
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService], // Export AuthService để UserModule có thể sử dụng
})
export class AuthModule {}
```

---

### 2. Sử dụng `forwardRef` trong Service

#### UserService

```typescript
import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService)) // Inject AuthService với forwardRef
    private readonly authService: AuthService
  ) {}

  // Logic sử dụng authService
}
```

#### AuthService

```typescript
import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) // Inject UserService với forwardRef
    private readonly userService: UserService
  ) {}

  // Logic sử dụng userService
}
```

---

## Giải thích

- `forwardRef(() => Module)`:

  - Trì hoãn việc giải quyết phụ thuộc để tránh vòng lặp trong quá trình khởi tạo.

- `@Inject(forwardRef(() => Service))`:
  - Đảm bảo service được inject đúng cách khi có vòng lặp phụ thuộc.

---

## Khi nào nên sử dụng `forwardRef`?

- Chỉ sử dụng khi thực sự cần thiết (khi có circular dependency).
- Nên cân nhắc thiết kế lại kiến trúc module để hạn chế vòng lặp phụ thuộc.

---

## Giải pháp thay thế

1. **Tách Logic Chung**: Di chuyển phần logic dùng chung vào một module trung gian để giảm phụ thuộc lẫn nhau.
2. **Event-Based Communication**: Sử dụng các cơ chế event như EventEmitter hoặc message broker (RabbitMQ, Kafka).

---

## Kết luận

Sử dụng `forwardRef` trong NestJS là cách hiệu quả để giải quyết circular dependency, nhưng cần thận trọng trong thiết kế hệ thống để tránh việc lạm dụng và tạo ra các module phức tạp khó bảo trì.
