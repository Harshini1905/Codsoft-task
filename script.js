document.addEventListener('DOMContentLoaded', () => {
    const quizData = {
        general: [
            {
                question: "What is the capital of France?",
                options: ["Berlin", "Madrid", "Paris", "Lisbon"],
                answer: 2
            },
            {
                question: "Which language is used for web development?",
                options: ["Python", "C++", "JavaScript", "Java"],
                answer: 2
            },
            {
                question: "What does CSS stand for?",
                options: ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets", "Creative Style Sheets"],
                answer: 0
            }
        ],
        science: [
            {
                question: "What is the chemical symbol for water?",
                options: ["O2", "H2O", "CO2", "HO"],
                answer: 1
            },
            {
                question: "What planet is known as the Red Planet?",
                options: ["Earth", "Mars", "Jupiter", "Saturn"],
                answer: 1
            },
            {
                question: "What gas do plants absorb from the atmosphere?",
                options: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"],
                answer: 2
            }
        ],
        history: [
            {
                question: "Who was the first President of the United States?",
                options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
                answer: 0
            },
            {
                question: "In which year did World War II end?",
                options: ["1945", "1939", "1918", "1965"],
                answer: 0
            },
            {
                question: "Who discovered America?",
                options: ["Christopher Columbus", "Leif Erikson", "Amerigo Vespucci", "Marco Polo"],
                answer: 0
            }
        ]
    };

    let currentDomain = '';
    let currentQuestion = 0;
    let score = 0;

    const welcomeContainer = document.getElementById('welcome-container');
    const quizContainer = document.getElementById('quiz-container');
    const questionEl = document.getElementById('question');
    const optionsEl = document.querySelectorAll('.option');
    const resultEl = document.getElementById('result');
    const scoreEl = document.getElementById('score');
    const restartButton = document.getElementById('restart-button');
    const domainButtons = document.querySelectorAll('.domain');

    function loadQuestion() {
        const currentQuizData = quizData[currentDomain][currentQuestion];
        questionEl.textContent = currentQuizData.question;
        optionsEl.forEach((option, index) => {
            option.textContent = currentQuizData.options[index];
            option.onclick = handleOptionClick;
        });
    }

    function handleOptionClick(event) {
        const selectedOption = Array.from(optionsEl).indexOf(event.target);
        if (selectedOption === quizData[currentDomain][currentQuestion].answer) {
            score++;
            alert('Congratulations! That\'s the correct answer.');
        } else {
            alert('Oops! That\'s the wrong answer.');
        }
        currentQuestion++;
        if (currentQuestion < quizData[currentDomain].length) {
            loadQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        quizContainer.classList.add('hidden');
        resultEl.classList.remove('hidden');
        scoreEl.textContent = `Your Score: ${score} / ${quizData[currentDomain].length}`;
    }

    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        resultEl.classList.add('hidden');
        welcomeContainer.classList.remove('hidden');
    }

    function startQuiz(domain) {
        currentDomain = domain;
        currentQuestion = 0;
        score = 0;
        welcomeContainer.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        loadQuestion();
    }

    domainButtons.forEach(button => {
        button.addEventListener('click', (e) => startQuiz(e.target.dataset.domain));
    });

    restartButton.addEventListener('click', restartQuiz);
});
