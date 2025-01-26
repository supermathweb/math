import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Giải phương trình bằng công thức nghiệm:  
            x² - 3x - 4 = 0
        `,
        answers: [
            `x = 4 hoặc x = -1`,
            `x = 1 hoặc x = -4`,
            `x = 2 hoặc x = -2`,
            `Vô nghiệm`,
        ]
    }, {
        question: `
            Giải phương trình bằng công thức nghiệm:  
            2x² - 8x = 0
        `,
        answers: [
            `x = 0 hoặc x = 4`,
            `x = 0 hoặc x = -4`,
            `x = -2 hoặc x = 2`,
            `Vô nghiệm`,
        ]
    }, {
        question: `
            Giải phương trình bằng công thức nghiệm:  
            x² - 7x + 12 = 0
        `,
        answers: [
            `x = 4 hoặc x = 3`,
            `x = -3 hoặc x = 4`,
            `x = 1 hoặc x = 12`,
            `Vô nghiệm`,
        ]
    }, {
        question: `
            Giải phương trình bằng công thức nghiệm:  
            x² + 5x + 6 = 0
        `,
        answers: [
            `x = -2 hoặc x = -3`,
            `x = 2 hoặc x = -3`,
            `x = -3 hoặc x = 1`,
            `Vô nghiệm`,
        ]
    }, {
        question: `
            Giải phương trình bằng công thức nghiệm:  
            x² + 3x - 10 = 0
        `,
        answers: [
            `x = 2 hoặc x = -5`,
            `x = -2 hoặc x = 5`,
            `x = 5 hoặc x = -2`,
            `Vô nghiệm`,
        ]
    }    
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[19].levels[0].state = 'unlock';
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
