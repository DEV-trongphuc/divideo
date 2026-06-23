# Hướng Dẫn Thiết Kế & Quy Chuẩn Kịch Bản Video (base.md)

Tài liệu này quy định các tiêu chuẩn thiết kế UI/UX, hoạt ảnh mô phỏng và cấu trúc kịch bản (`slides.json`) dành cho định dạng video ngắn 9:16 (TikTok, Reels, Shorts). Bất kỳ AI Agent nào khi tiếp quản dự án đều phải đọc kỹ và tuân thủ các quy tắc này để đảm bảo tính đồng bộ và chất lượng cao nhất cho video.

---

## 1. Nguyên Tắc Thiết Kế Trực Quan (Mobile-First 9:16)
Vì người xem sử dụng điện thoại di động với màn hình nhỏ, giao diện mô phỏng phải tuân thủ các nguyên tắc sau:
* **Item To Rõ & Đơn Giản**:
  * Các thiết bị mockup (Client, Server, CA, Hacker) hoặc các khối hộp (Boxes) phải có kích thước lớn.
  * Chiều rộng tiêu chuẩn cho Mockup trình duyệt/máy chủ: **tối thiểu 340px**.
  * Chiều rộng tiêu chuẩn cho CA hoặc Hacker mockup: **tối thiểu 290px - 320px**.
  * Chiều rộng mockup điện thoại: **250px** (rộng) x **440px** (cao) kèm viền kim loại dày dặn bo góc.
* **Không Dùng Chữ Quá Nhiều & Thừa**:
  * Dẹp bỏ toàn bộ các terminal log dài dòng hoặc font chữ siêu nhỏ (dưới 12px) gây nhiễu màn hình.
  * Thay thế bằng các **Nhãn trạng thái lớn** (`.vXX-status-label-big` với font chữ từ `15.5px` trở lên, in đậm, có viền neon phát sáng nổi bật).
* **Gói tin chuyển động (Packets)**:
  * Kích thước gói tin phải to rõ (tối thiểu **50px** đường kính).
  * Icon bên trong to rõ (cỡ chữ `20px` trở lên).
  * Nhãn mô tả gói tin đi kèm (ví dụ: `pass: 123456`) phải có kích thước lớn từ `11px` trở lên, đặt trong khung nền đen viền sáng để đọc rõ trên điện thoại nhỏ.

---

## 2. Quy Chuẩn Slide Hook (Slide Đầu Tiên)
* **Ngắn Gọn & Tập Trung**: Slide Hook chỉ kéo dài khoảng **8s - 10s**. Lời thoại phải súc tích, đi thẳng vào vấn đề để khơi gợi sự tò mò.
* **Bố Cục Cân Đối**: 
  * Tiêu đề chính cực lớn, chia làm 2 dòng bằng thẻ `<br>`.
  * Luôn đi kèm một dải từ khóa công nghệ monospace phát sáng bên dưới tiêu đề chính (ví dụ: `SSL • TLS • SECURE CONNECTION` hoặc `E2EE • ENCRYPTION`) để làm đầy bố cục màn hình dọc 9:16, tránh khoảng trống thô ở nửa dưới màn hình.
  * Icon đại diện ở trung tâm (như ổ khóa, chìa khóa) phải to rõ và có vòng hào quang phát sáng xoay tròn xung quanh để cuốn hút thị giác ngay từ giây đầu tiên.
  * **Tránh hoạt ảnh quá phức tạp**: Tập trung làm nổi bật thuật ngữ cốt lõi (như HTTPS, E2EE) bằng cách sử dụng chữ to, đổi màu và có quầng sáng tĩnh, không cần cho co giãn quá nhiều gây rối mắt.

---

## 3. Quy Chuẩn Từ Khóa Highlight (Keywords Data)
* **Giới Hạn Số Lượng**: Mỗi slide **chỉ được phép có tối đa 2 từ khóa highlight** được sáng lên đồng thời để tránh làm người xem bị phân tâm bởi quá nhiều màu sắc nhấp nháy.
* **Đồng Bộ Thời Gian (Timings)**: Thời gian bắt đầu (`start`) và kết thúc (`end`) của các từ khóa highlight trong file cấu hình JS phải khớp chuẩn xác với thời điểm từ đó được phát âm trong audio lồng tiếng của slide.

---

## 4. Phối Hợp Màu Sắc Đa Dạng (Less Green)
Nghiêm cấm lạm dụng một hoặc hai màu sắc chủ đạo duy nhất (đặc biệt là màu xanh lá cây) phủ lên toàn bộ slide. Phải phân bổ màu đa sắc thông minh có quy luật:
* **Xanh Dương / Cyan (`var(--tls-cyan)`)**: Dùng cho Client, Trình duyệt, các kết nối an toàn, gói tin hello, hoặc request bình thường.
* **Tím (`var(--tls-purple)`)**: Dùng cho Server, dải chữ ký số, các tác vụ xử lý của máy chủ dữ liệu.
* **Vàng / Gold (`var(--tls-yellow)`)**: Dùng cho Khóa đối xứng, Khóa phiên (Session Key), Token bảo mật, các giá trị tối ưu hoặc từ khóa chính cần nhấn mạnh.
* **Đỏ / Cam (`var(--tls-red)`)**: Dùng cho Hacker, lệnh nghe lén, lỗi kết nối mạng, dữ liệu dạng chữ trần nguy hiểm hoặc tin nhắn đã bị thu hồi.
* **Xanh Lá (`var(--tls-green)`)**: Chỉ dùng để hiển thị trạng thái kiểm tra thành công, chứng chỉ số hợp lệ, hoặc khi kênh truyền đã bảo mật thành công 100%.

---

## 5. Số Lượng Slide & Hoạt Ảnh Mô Phỏng (Animations)
* **Nhiều Slide Ngắn**: Ưu tiên tách nhỏ nội dung thành nhiều slide ngắn (mỗi slide giải thích 1 ý khoảng 10s - 15s) thay vì dồn quá nhiều thông tin vào một slide dài.
* **Liên Tục Tương Tác**: Mọi slide mô phỏng bắt buộc phải có hoạt ảnh động (gói tin di chuyển liên tục, các đường truyền SVG lấp lánh chạy dash, các thẻ hoặc các lớp overlay rung lắc nhẹ `v41-shake-subtle` khi tương tác tạo khóa). Điều này giúp giữ chân người xem không bị nhàm chán.

---

## 6. Quy Chuẩn Slide Chào Kết (Slide Outro)
* **Kịch Bản Ngắn Gọn**: Lời thoại chào kết tối đa chỉ từ **25 - 35 từ** (thời lượng kéo dài **6.5s - 8s**). Kết bài nhanh chóng, kêu gọi hành động (CTA) dứt khoát.
* **Không Dùng Custom Layout Cho Outro**: 
  * Loại bỏ ID slide chào kết (thường là slide cuối cùng) ra khỏi danh sách `customSlideIds` của file JS.
  * Việc này giúp slide chào kết được tự động render bằng **Layout mặc định chuẩn của hệ thống** (hiển thị Avatar logo kênh hình tròn lớn, nút bấm Follow có ripple ring sóng lan tỏa, v.v.), tránh hoàn toàn lỗi vỡ giao diện hoặc màn hình đen.

## 7. Danh Sách Chủ Đề Video Đã Có (Tránh Trùng Lặp)

* **video1**: Con quái vật thầm lặng trong Backend!
* **video17**: Spotify gợi ý nhạc: Bí mật 'đọc vị' tâm trạng
* **video18**: Bí ẩn 'Quảng cáo bám đuôi': Tại sao AI đọc vị được bạn?
* **video19**: Giải mã Google Maps: Tại sao tìm đường chỉ trong 1 giây?
* **video20**: Bí ẩn QR Code: Tại sao bị rách vẫn quét được?
* **video21**: Tại sao rút gọn Link: Không bao giờ bị trùng lặp?
* **video22**: Tại sao Spotify Shuffle: Lại ít ngẫu nhiên hơn?
* **video23**: Phía sau chữ "Typing..." của Chat App: Server xử lý thế nào để không sập?
* **video24**: Giao diện Chấm Xanh Facebook: Hệ thống Presence Service xử lý thế nào ở 200M user?
* **video25**: Cơ chế Git Status: Làm sao phát hiện code đổi chỉ trong tích tắc?
* **video26**: Bí ẩn tệp .ZIP: Làm sao nén file mà không mất một chữ?
* **video27**: Quả bom vô hình: Sức mạnh hủy diệt nặng 42KB!
* **video28**: 500 triệu User: Tại sao biết username đã tồn tại?
* **video29**: Facebook khổng lồ: Làm sao tính nhanh bạn chung?
* **video30**: Thảm họa mạng: Tấn công DDoS là gì?
* **video31**: Bí mật số 2: Thuật toán Luhn
* **video32**: Bí mật cơ chế JWT
* **video33**: Đồng bộ đa thiết bị
* **video34**: Tin nhắn xuất hiện tức thì
* **video35**: Câu chuyện của Cookie
* **video36**: Sự trùng hợp kỳ lạ
* **video37**: Sự miễn phí kỳ lạ
* **video38**: TikTok lưu video ở đâu?
* **video39**: Giải Mã Video Call: Nén Dung Lượng 1000 Lần Thế Nào?
* **video40**: Mã Hóa Đầu Cuối E2EE: Bí Ẩn Thu Hồi Tin Nhắn Vẫn Bị Đọc
* **video41**: Bắt Tay SSL/TLS: Bí Mật Đằng Sau Ổ Khóa HTTPS
* **video42**: Quên Mật Khẩu: Bí Mật Đằng Sau Ký Tự Hash
* **spotify_demo**: Danh sách phát Coding
