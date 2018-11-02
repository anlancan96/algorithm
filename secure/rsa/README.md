## Hệ mã hóa RSA
RSA là một hệ mã hóa bất đối xứng được phát triển bởi Ron Rivest, Adi Shamir và Leonard Adleman (tên của nó cũng chính là tên viết tắt của 3 tác giả này) và được sử dụng rộng rãi trong công tác mã hoá và công nghệ chữ ký điện tử. Trong hệ mã hóa này, public key có thể chia sẻ công khai cho tất cả mọi người. Hoạt động của RSA dựa trên 4 bước chính: sinh khóa, chia sẻ key, mã hóa và giải mã.

### Sinh khoá
Mấu chốt của việc cơ bản trong việc sinh khoá RSA là tìm ra số tự nhiên e, d, n sao cho:
``` m^(ed) ≡ m mod n ```
Note: d cần phải được bảo mật sao cho mặc dù biết e, n m cũng không thể tìm ra được d
Khoá RSA được tạo ra như sau:
* Chọn 2 số nguyên tố p và q
* Tính n = p * q. n được dùng làm modulus cho public key và private key
* Tính một số giả nguyên tố bằng phi hàm Carmichael như sau λ(n) = BCNN(λ(p), λ(q)) = BCNN(p − 1, q − 1) Giá trị này sẽ được giữ bí mật.
* Chọn số tự nhiên e trong khoảng (1, λ(n)) sao cho UCLN(e, λ(n)) = 1,tức là e và λ(n) nguyên tố cùng nhau.
* Tính d sao cho d ≡ 1/e (mod λ(n)) hay d * e ≡ 1 (mod λ(n))
### Mã hoá
Mã hóa với public key (n, e) và giải mã với private key (n, d).

Nếu chúng ta có bản rõ M, chúng ta cần chuyển nó thành một số tự nhiên m trong khoảng (0, n) sao cho m, n nguyên tố cùng nhau. Việc này rất dễ dàng thực hiện bằng cách thêm một các kỹ thuật padding. Tiếp theo, chúng ta sẽ má hóa m, thành c như sau:
Alice gửi public key(n, e) cho Bob và giữ private key (n, d). Bob muốn gửi bản rõ M cho Alice
Đầu tiên Bob phải chuyển M sang thành 1 số m sao cho m < n bằng padding scheme. Và bắt đầu tính c như sau
```  c = m^e mod n ```


## Contributors
<a href="https://github.com/anlancan96"><img src="https://avatars0.githubusercontent.com/u/26276875?s=400u=9ea9699de3146b619478917f650fd57c04a1af9e&v=4"/></a>

## License
Bài này mình lấy từ 
<a href="https://viblo.asia/p/he-ma-hoa-rsa-va-chu-ky-so-6J3ZgkgMZmB">Viblo.asia</a>