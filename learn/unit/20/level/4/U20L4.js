import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Tìm hai số biết tổng của chúng bằng –8, tích của chúng bằng 15.
            Lời giải: Hai số cần tìm là hai nghiệm của phương trình x² + 8x + 15 = 0.
        `,
        answers: [
            `x = -3 và x = -5`,
            `x = -1 và x = -15`,
            `x = 3 và x = -5`,
            `x = 1 và x = -15`,
        ],
        explain: `
            Đặt hai số cần tìm là x1 và x2.
            Áp dụng định lý Viète: x1 + x2 = -8 và x1 * x2 = 15.
            Phương trình tương ứng là x² + 8x + 15 = 0, từ đó ta tìm được hai nghiệm là x = -3 và x = -5.
        `
    },
    {
        question: `
            Tìm hai số biết tổng của chúng bằng 7, tích của chúng bằng 12.
            Lời giải: Hai số cần tìm là hai nghiệm của phương trình x² - 7x + 12 = 0.
        `,
        answers: [
            `x = 3 và x = 4`,
            `x = -3 và x = -4`,
            `x = 1 và x = 12`,
            `x = -1 và x = -12`,
        ],
        explain: `
            Đặt hai số cần tìm là x1 và x2.
            Áp dụng định lý Viète: x1 + x2 = 7 và x1 * x2 = 12.
            Phương trình tương ứng là x² - 7x + 12 = 0, từ đó ta tìm được hai nghiệm là x = 3 và x = 4.
        `
    },
    {
        question: `
            Tìm hai số biết tổng của chúng bằng –3, tích của chúng bằng –10.
            Lời giải: Hai số cần tìm là hai nghiệm của phương trình x² + 3x - 10 = 0.
        `,
        answers: [
            `x = -5 và x = 2`,
            `x = 5 và x = -2`,
            `x = 4 và x = -3`,
            `x = -4 và x = 3`,
        ],
        explain: `
            Đặt hai số cần tìm là x1 và x2.
            Áp dụng định lý Viète: x1 + x2 = -3 và x1 * x2 = -10.
            Phương trình tương ứng là x² + 3x - 10 = 0, từ đó ta tìm được hai nghiệm là x = -5 và x = 2.
        `
    },
    {
        question: `
            Tìm hai số biết tổng của chúng bằng 10, tích của chúng bằng 21.
            Lời giải: Hai số cần tìm là hai nghiệm của phương trình x² - 10x + 21 = 0.
        `,
        answers: [
            `x = 3 và x = 7`,
            `x = 4 và x = 6`,
            `x = 1 và x = 20`,
            `x = -1 và x = -20`,
        ],
        explain: `
            Đặt hai số cần tìm là x1 và x2.
            Áp dụng định lý Viète: x1 + x2 = 10 và x1 * x2 = 21.
            Phương trình tương ứng là x² - 10x + 21 = 0, từ đó ta tìm được hai nghiệm là x = 3 và x = 7.
        `
    }       
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[20].levels[0].state = 'unlock';
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
