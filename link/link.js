var box = [
    {
        heading: `Các dạng câu cuối thi Toán vào lớp 10`,
        links: [
            {
                type: `Vietjack - Tổng hợp các dạng của câu cuối thi vào lớp 10`,
                link: `https://vietjack.com/tai-lieu-mon-toan/cac-dang-toan-nang-cao-on-thi-vao-lop-10-nam-2021.jsp`,
            },
            {
                type: `Trọng tâm bất đẳng thức cauchy (Cô-si)`,
                link: `https://vietjack.me/bat-dang-thuc-co-si-va-he-qua-chi-tiet-nhat-toan-lop-10-24008.html`,
            },
            {
                type: `Trọng tâm bất đẳng thức bunhiacopski`,
                link: `https://vuihoc.vn/tin/thcs-ly-thuyet-ve-bat-dang-thuc-bunhiacopxki-lop-9-4957.html`,
            },
        ]
    },
    {
        heading: `Tổng hợp các đề thi Toán vào lớp 10`,
        links: [
            {
                type: `50 đề thi vào lớp 10 của các tỉnh thành`,
                link: `https://loigiaihay.com/tong-hop-50-de-thi-vao-10-mon-toan-e10842.html`,
            },
            {
                type: `Đề thi thử toán vào 10 chương trình mới có đáp án`,
                link: `https://www.vietjack.com/de-thi-vao-10-mon-toan/de-thi-mon-toan-vao-10-tu-luan.jsp`,
            },
            {
                type: `10+ Đề thi thử toán vào 10 chương trình mới có đáp án (2)`,
                link: `https://thcs.toanmath.com/de-thi-tuyen-sinh-lop-10-mon-toan`,
            },
        ]
    },
];

html = ``
box.forEach(item => {
    var { heading, links } = item;
    html += `
        <div class="box-container">
            <h2>${heading}</h2>
            <ul>
                
    `;
    links.forEach(link => {
        var { type, link } = link;
        html += `
            <li>
                <div class="link-content">${type}</div>
                <div class="separator"> - </div>
                <a class="link" href="https://vietjack.me/bat-dang-thuc-co-si-va-he-qua-chi-tiet-nhat-toan-lop-10-24008.html" target="_blank">Link</a>
            </li>
        `;
    });
    html += `
        </div>
    `;
});

document.querySelector('.mid-section').innerHTML = html;