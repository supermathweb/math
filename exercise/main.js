function submitData() {
    // Lấy giá trị từ input
    const timeValue = document.querySelector('.timeInput').value;
    // Xây dựng URL với dữ liệu
    const targetUrl = `contest/index.html?time=${encodeURIComponent(timeValue)}`;
    // Điều hướng đến trang mới
    window.location.href = targetUrl;
}

// Lấy input
const timeInput = document.querySelector('.timeInput');

// Lắng nghe sự kiện khi người dùng thay đổi giá trị
timeInput.addEventListener('input', () => {
    const value = timeInput.value.trim(); // Lấy giá trị và loại bỏ khoảng trắng

    // Kiểm tra nếu không phải số nguyên hoặc nằm ngoài khoảng [1, 359]
    if (!Number.isInteger(Number(value)) || value < 1 || value > 359) {
        timeInput.value = 120;
    } else {
        timeInput.style.border = ''; // Bỏ viền đỏ khi hợp lệ
    }
});

// Chặn các ký tự không hợp lệ (chỉ cho nhập số)
timeInput.addEventListener('keypress', (event) => {
    // Kiểm tra nếu phím không phải là số (0-9)
    if (!/[0-9]/.test(event.key)) {
        event.preventDefault(); // Ngăn không cho nhập
    }
});