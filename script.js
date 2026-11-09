
const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Multi Language", "Home Text Markup Language"],
        answer: 0
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["Python", "CSS", "Java", "C++"],
        answer: 1
    },
    {
        question: "Which of these is a JavaScript data type?",
        options: ["Number", "Page", "Style", "Browser"],
        answer: 0
    },
    {
        question: "Which tag is used to create a hyperlink in HTML?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: 1
    },
    {
        question: "Which company developed Java?",
        options: ["Microsoft", "Google", "Sun Microsystems", "Apple"],
        answer: 2
    },
    {
        question: "Which symbol is used for comments in JavaScript (single line)?",
        options: ["<!-- -->", "**", "//", "##"],
        answer: 2
    },
    {
        question: "Which HTML tag is used for the largest heading?",
        options: ["<h6>", "<head>", "<h1>", "<heading>"],
        answer: 2
    },
    {
        question: "Which method displays a message in the browser console?",
        options: ["console.log()", "print()", "display()", "show()"],
        answer: 0
    },
    {
        question: "Which CSS property changes text color?",
        options: ["font-style", "background", "color", "text-size"],
        answer: 2
    },
    {
        question: "What does URL stand for?",
        options: ["Uniform Resource Locator", "Universal Record Link", "User Reference Location", "Uniform Read Language"],
        answer: 0
    }
];

let currentQuestion = 0;
let selectedAnswers = Array(questions.length).fill(null);
let timeLeft = 300;
let timerInterval;

function startExam() {
    const name = document.getElementById("studentName").value.trim();
    const roll = document.getElementById("rollNumber").value.trim();

    if (!name || !roll) {
        alert("Please enter your name and roll number.");
        return;
    }

    document.getElementById("studentInfo").textContent =
        "Student: " + name + " | Roll No: " + roll;

    document.getElementById("loginSection").style.display = "none";
    document.getElementById("examSection").style.display = "block";

    showQuestion();
    startTimer();
}

function showQuestion() {
    const question = questions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        "Question " + (currentQuestion + 1) + " of " + questions.length;

    document.getElementById("questionText").textContent = question.question;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    question.options.forEach((option, index) => {
        const label = document.createElement("label");
        label.className = "option";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer";
        radio.value = index;
        radio.checked = selectedAnswers[currentQuestion] === index;

        radio.addEventListener("change", function () {
            selectedAnswers[currentQuestion] = index;
        });

        label.appendChild(radio);
        label.appendChild(document.createTextNode(" " + option));
        optionsContainer.appendChild(label);
    });

    document.getElementById("progressBar").style.width =
        ((currentQuestion + 1) / questions.length * 100) + "%";

    document.getElementById("previousBtn").disabled =
        currentQuestion === 0;

    document.getElementById("nextBtn").style.display =
        currentQuestion === questions.length - 1 ? "none" : "inline-block";
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    }
}

function startTimer() {
    updateTimer();

    timerInterval = setInterval(function () {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitExam();
        }
    }, 1000);
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    document.getElementById("timer").textContent =
        minutes + ":" + String(seconds).padStart(2, "0");
}

function submitExam() {
    clearInterval(timerInterval);

    let correct = 0;

    questions.forEach((question, index) => {
        if (selectedAnswers[index] === question.answer) {
            correct++;
        }
    });

    const wrong = questions.length - correct;
    const percentage = (correct / questions.length) * 100;

    document.getElementById("examSection").style.display = "none";
    document.getElementById("resultSection").style.display = "block";

    document.getElementById("percentage").textContent =
        percentage + "%";

    document.getElementById("score").textContent =
        correct + " / " + questions.length;

    document.getElementById("correctAnswers").textContent = correct;
    document.getElementById("wrongAnswers").textContent = wrong;

    document.getElementById("resultMessage").textContent =
        percentage >= 50 ? "Congratulations! You passed." : "Keep practicing. Try again!";
    
    document.getElementById("studentResult").textContent =
        document.getElementById("studentInfo").textContent;
}
