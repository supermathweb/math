import { updateProgressBar, fraction, sqrt } from "../../../../utils/util.js";

const questions = [
    {
        question: `
            Đưa thừa số vào trong dấu căn: 3${sqrt('5')}
        `,
        answers: [
            `${sqrt('45')}`,
            `${sqrt('75')}`,
            `${sqrt('15')}`,
            `${sqrt('30')}`,
        ],
        explain: `
            Ta có: 3${sqrt('5')} = ${sqrt('9')}.${sqrt('5')} = ${sqrt('45')}
        `
    }, {  
        question: `  
            Đưa thừa số vào trong dấu căn: 4${sqrt('3')}  
        `,  
        answers: [  
            `${sqrt('48')}`,  
            `${sqrt('36')}`,  
            `${sqrt('12')}`,  
            `${sqrt('24')}`,  
        ],  
        explain: `  
            Ta có: <br><br>  
            4${sqrt('3')} = ${sqrt('4²')} . ${sqrt('3')} = ${sqrt('16')} . ${sqrt('3')} = ${sqrt('48')}.  
        `  
    }, {  
        question: `  
            Đưa thừa số vào trong dấu căn: 2${sqrt('7')}  
        `,  
        answers: [  
            `${sqrt('28')}`,  
            `${sqrt('21')}`,  
            `${sqrt('14')}`,  
            `${sqrt('49')}`,  
        ],  
        explain: `  
            Ta có: <br><br>  
            2${sqrt('7')} = ${sqrt('2²')} . ${sqrt('7')} = ${sqrt('4')} . ${sqrt('7')} = ${sqrt('28')}.  
        `  
    }, {  
        question: `  
            Đưa thừa số vào trong dấu căn: 5${sqrt('2')}  
        `,  
        answers: [  
            `${sqrt('50')}`,  
            `${sqrt('25')}`,  
            `${sqrt('20')}`,  
            `${sqrt('45')}`,  
        ],  
        explain: `  
            Ta có: <br><br>  
            5${sqrt('2')} = ${sqrt('5²')} . ${sqrt('2')} = ${sqrt('25')} . ${sqrt('2')} = ${sqrt('50')}.  
        `  
    },
];

const maxPoint = questions.length;
let point = 0;
let lesson = [...questions];

function displayQuestion() {
    if (lesson.length === 0) {
        let units = JSON.parse(localStorage.getItem('units'));
        units[8].levels[2].state = 'unlock';
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
