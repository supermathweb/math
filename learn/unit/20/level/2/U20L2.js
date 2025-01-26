import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Cho phương trình 2x² - 7x + 5 = 0 và x1 = 1 là một nghiệm của phương trình. 
            Dùng định lý Viète để tìm nghiệm còn lại x2 của phương trình.
        `,
        answers: [
            `x2 = 2`,
            `x2 = -2`,
            `x2 = 5`,
            `x2 = -5`,
        ],
        explain: `
            Áp dụng định lý Viète cho phương trình 2x² - 7x + 5 = 0, ta có:
            - Tổng của các nghiệm: x1 + x2 = -(${fraction('-7', '2')}) = ${fraction('7', '2')}
            - Tích của các nghiệm: x1 * x2 = ${fraction('5', '2')}
            Biết x1 = 1, ta có:
            - Tổng: 1 + x2 = ${fraction('7', '2')}, suy ra x2 = ${fraction('7', '2')} - 1 = ${fraction('5', '2')} = 2.
        `
    }, 
    {
        question: `
            Cho phương trình 3x² + 4x - 5 = 0 và x1 = -1 là một nghiệm của phương trình. 
            Dùng định lý Viète để tìm nghiệm còn lại x2 của phương trình.
        `,
        answers: [
            `x2 = 5`,
            `x2 = -5`,
            `x2 = 1`,
            `x2 = -1`,
        ],
        explain: `
            Áp dụng định lý Viète cho phương trình 3x² + 4x - 5 = 0, ta có:
            - Tổng của các nghiệm: x1 + x2 = -${fraction('4', '3')}
            - Tích của các nghiệm: x1 * x2 = ${fraction('-5', '3')}
            Biết x1 = -1, ta có:
            - Tổng: -1 + x2 = -${fraction('4', '3')}, suy ra x2 = -${fraction('4', '3')} + 1 = ${fraction('-1', '3')}.
        `
    },
    {
        question: `
            Cho phương trình x² - 5x + 6 = 0 và x1 = 2 là một nghiệm của phương trình. 
            Dùng định lý Viète để tìm nghiệm còn lại x2 của phương trình.
        `,
        answers: [
            `x2 = 3`,
            `x2 = -3`,
            `x2 = 1`,
            `x2 = -1`,
        ],
        explain: `
            Áp dụng định lý Viète cho phương trình x² - 5x + 6 = 0, ta có:
            - Tổng của các nghiệm: x1 + x2 = 5
            - Tích của các nghiệm: x1 * x2 = 6
            Biết x1 = 2, ta có:
            - Tổng: 2 + x2 = 5, suy ra x2 = 5 - 2 = 3.
        `
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[19].levels[2].state = 'unlock';
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
