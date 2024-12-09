# Git flow

## Cách ghi commit

### 1. Cấu trúc commit message:

```bash
<location>: <type>(<scope>): <summary>
- location: All, BE, FE, Docs
```

### 2. Loại commit (type)

Sử dụng các từ khóa tiêu chuẩn để phân loại thay đổi:
**feat**: Thêm tính năng mới.
**fix**: Sửa lỗi.
**chore**: Công việc không liên quan đến code logic (vd: cấu hình, **thư** viện).
**refactor**: Tái cấu trúc code mà không thay đổi chức năng.
**docs**: Cập nhật tài liệu.
**test**: Thêm/sửa test.
**style**: Thay đổi không ảnh hưởng logic (vd: định dạng, thêm dấu **chấm**, đổi tên biến).
**perf**: Cải thiện hiệu năng.
**build**: Thay đổi liên quan đến build system hoặc phụ thuộc.

### 3. Scope (phạm vi): global, module

# Tip dùng git

### Sửa commit gần nhất

```base
git commit --amend -m "New commit message"
```

---

## Sửa nhiều commit

- Step 1: Chọn số lượng

```bash
git rebase -i HEAD~<n>
```

- Step 2: Sẽ xuất hiện danh sách

```bash
pick abc123 First commit message
pick def456 Second commit message
pick ghi789 Third commit message
```

- Step 3: Thay pick của 'commit' muốn sửa thành 'reword'

```bash
reword def456 Second commit message
```

- Step 4: Lưu file và bash sẽ mở từng file chứa các commit => sửa nội dung

# Xóa Commit Cuối Cùng Trên Local

Hướng dẫn chi tiết cách xóa commit cuối cùng trên local repository Git, bao gồm các trường hợp giữ lại hoặc xóa thay đổi.

---

## **1. Xóa commit cuối nhưng giữ lại thay đổi (unstage)**

Nếu bạn muốn xóa commit cuối và giữ lại các thay đổi trong **working directory** để chỉnh sửa hoặc commit lại:

```bash
git reset --soft HEAD~1
```

- **HEAD~1**: Chỉ định commit cuối cùng (một bước trước HEAD).
- **--soft**: Giữ lại các thay đổi trong **staging area** (index).

### **Hành vi:**

- Các thay đổi từ commit bị xóa sẽ ở trạng thái **staged**.
- Sau đó, bạn có thể chỉnh sửa và commit lại:

```bash
git commit -m "New commit message"
```

---

## **2. Xóa commit cuối và đưa thay đổi về trạng thái chưa được staged**

Nếu bạn muốn xóa commit cuối và đưa tất cả thay đổi về **working directory** (unstaged):

```bash
git reset --mixed HEAD~1
```

- **--mixed**: Hủy commit và unstaged các thay đổi.
- Các thay đổi sẽ xuất hiện như những file chưa được `git add`.

---

## **3. Xóa commit cuối và xóa luôn các thay đổi**

Nếu bạn muốn xóa commit cuối cùng **và toàn bộ thay đổi của nó**:

```bash
git reset --hard HEAD~1
```

- **--hard**: Xóa commit và xóa cả các thay đổi khỏi working directory.
- **Lưu ý:** Hành động này không thể hoàn tác trừ khi bạn có backup.

---

## **4. Đẩy thay đổi sau khi xóa (nếu đã push lên remote)**

Nếu bạn đã đẩy commit lên remote và muốn xóa commit trên remote, bạn cần thực hiện force push sau khi dùng `git reset`:

```bash
git push origin <branch_name> --force
```

- **Force push** thay đổi lịch sử của branch trên remote.
- **Lưu ý:** Hành động này có thể ảnh hưởng đến các thành viên khác trong nhóm.

---

## **5. Kiểm tra lại lịch sử commit**

Sau khi thực hiện xóa, kiểm tra lịch sử commit để đảm bảo thay đổi đã áp dụng:

```bash
git log --oneline
```

---
