import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Cho 2 tiếp tuyến PA và PB của đường tròn (O; R) (A và B là tiếp điểm). Tính PA và PB, biết R = 5cm và PO = 7cm.
        `,
        answers: [
            `PA = PB = 6cm`,
            `PA = PB = 4cm`,
            `PA = PB = 3cm`,
            `PA = PB = 5.5cm`,
        ],
        explain: `
            - Khi biết R = 5cm và PO = 7cm, ta sử dụng định lý tiếp tuyến để tính chiều dài PA (hoặc PB). Theo định lý tiếp tuyến, PA^2 = PO^2 - R^2. Thay số vào, ta có PA = √(7² - 5²) = √(49 - 25) = √24 ≈ 4.9cm. Vậy PA ≈ PB ≈ 5cm.
        `
    }, {
        question: `
            Cho 2 tiếp tuyến PA và PB của đường tròn (O; R) (A và B là tiếp điểm). Tính PA và PB, biết R = 6cm và PO = 10cm.
        `,
        answers: [
            `PA = PB = 8cm`,
            `PA = PB = 7cm`,
            `PA = PB = 6.5cm`,
            `PA = PB = 9cm`,
        ],
        explain: `
            - Khi biết R = 6cm và PO = 10cm, ta sử dụng định lý tiếp tuyến để tính chiều dài PA (hoặc PB). Theo định lý tiếp tuyến, PA^2 = PO^2 - R^2. Thay số vào, ta có PA = √(10² - 6²) = √(100 - 36) = √64 = 8cm. Vậy PA = PB = 8cm.
        `
    }, {
        question: `
            Cho 2 tiếp tuyến PA và PB của đường tròn (O; R) (A và B là tiếp điểm). Tính PA và PB, biết R = 2cm và PO = 5cm.
        `,
        answers: [
            `PA = PB = 3cm`,
            `PA = PB = 4cm`,
            `PA = PB = 3.5cm`,
            `PA = PB = 2.5cm`,
        ],
        explain: `
            - Khi biết R = 2cm và PO = 5cm, ta sử dụng định lý tiếp tuyến để tính chiều dài PA (hoặc PB). Theo định lý tiếp tuyến, PA^2 = PO^2 - R^2. Thay số vào, ta có PA = √(5² - 2²) = √(25 - 4) = √21 ≈ 4.58cm. Vậy PA ≈ PB ≈ 4.6cm.
        `
    }, {
        question: `
            Cho 2 tiếp tuyến PA và PB của đường tròn (O; R) (A và B là tiếp điểm). Tính PA và PB, biết R = 3cm và PO = 8cm.
        `,
        answers: [
            `PA = PB = 7cm`,
            `PA = PB = 6cm`,
            `PA = PB = 5cm`,
            `PA = PB = 4cm`,
        ],
        explain: `
            - Khi biết R = 3cm và PO = 8cm, ta sử dụng định lý tiếp tuyến để tính chiều dài PA (hoặc PB). Theo định lý tiếp tuyến, PA^2 = PO^2 - R^2. Thay số vào, ta có PA = √(8² - 3²) = √(64 - 9) = √55 ≈ 7.42cm. Vậy PA ≈ PB ≈ 7cm.
        `
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[16].levels[0].state = 'unlock';
        localStorage.setItem('units', JSON.stringify(units));
        alert("Bạn đã hoàn thành tất cả câu hỏi!");
        document.location.href = '../../../../';
    }

    const { question, answers, explain } = lesson[0];
    const correctAnswer = answers[0];
    const shuffledAnswers = [...answers].sort(() => Math.random() - 0.5);

    // DOM elements
    const questionElement = document.querySelector('.question');
    const optionsContainer = document.querySelector('.options-container');
    const explainElement = document.querySelector('.explain');
    const checkButton = document.querySelector('.check-btn');
    const continueButton = document.querySelector('.continue-btn');

    // Reset UI
    questionElement.innerHTML = question;
    optionsContainer.innerHTML = '';
    explainElement.innerHTML = '';
    continueButton.classList.add('hide');

    // Track selected option
    let selectedOption = null;

    // Render options
    shuffledAnswers.forEach(answer => {
        const option = document.createElement('div');
        option.className = 'option';
        option.innerHTML = answer;

        option.addEventListener('click', () => {
            if (selectedOption) {
                selectedOption.classList.remove('selected');
            }
            option.classList.add('selected');
            selectedOption = option;
        });

        optionsContainer.appendChild(option);
    });

    // Set up event for "Check" button
    checkButton.replaceWith(checkButton.cloneNode(true));
    const newCheckButton = document.querySelector('.check-btn');

newCheckButton.style.pointerEvents = 'auto';





    newCheckButton.addEventListener('click', () => {
        if (!selectedOption) {
            alert("Vui lòng chọn một đáp án!");
            return;
        }
        console.log(selectedOption.innerHTML);
        console.log(correctAnswer);
        const isCorrect = selectedOption.innerHTML === correctAnswer;
        selectedOption.classList.add(isCorrect ? 'correct' : 'wrong');

        if (isCorrect) {
            point++;
            lesson.shift();
            updateProgressBar(point, maxPoint);
            if (explain)
                explainElement.innerHTML = 
                    `<p class="highlight">Giải thích<p>` + explain;
        } else {
            const currentQuestion = lesson.shift();
            lesson.push(currentQuestion);
            explainElement.innerHTML = `<p class="highlight red">Đáp án sai, thử lại sau nhé!</p>`;
        }

        // Sound Effect
        const audio = new Audio(`../../../../assets/sounds/${isCorrect}.mp3`);
        audio.play();

        // Disable options and check button
        optionsContainer.querySelectorAll('.option').forEach(option => {
            option.style.pointerEvents = 'none';
        });
        newCheckButton.disabled = true;

        



        

                newCheckButton.style.pointerEvents = "none";

        // Show continue button
        continueButton.classList.remove('hide');
    });
}

function setContinueButton() {
    const continueButton = document.querySelector('.continue-btn');
    continueButton.addEventListener('click', displayQuestion);
}

// Initialize quiz
setContinueButton();
displayQuestion();
