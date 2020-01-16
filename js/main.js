//
const questions = [
    {
        question: 'Фон осветления 6 уровня тона?',
        answers: ['Желтый', 'Оранжево-желтый', 'Оранжевый', 'Красный'],
        rightAnswer: 3,
        weight: 1
    }, {
        question: 'Где качество волос будет хуже? При обесцвечивании до 10 уровня тона волос 4 ур тона или 7 ур тона',
        answers: ['4 ---> 10', '7 ---> 10', 'Одинаково плохо', 'Одинаково хорошо'],
        rightAnswer: 1,
        weight: 1
    }, {
        question: 'После какого продукта при осветлении качество волос будет лучше?',
        answers: ['Порошок', 'Краска', 'Микс тон', 'Очищающий шампунь'],
        rightAnswer: 2,
        weight: 2
    }, {
        question: 'Как обесцвечиваются седые волосы?',
        answers: ['Пятнами', 'Быстро', 'Медленно', 'Не обесцвечиваются'],
        rightAnswer: 2,
        weight: 1
    }, {
        question: 'Какой вид связей внутри волоса разрушается при намокании волос?',
        answers: ['Дисульфидные', 'Связи серы', 'Водородные', 'Аммиачные'],
        rightAnswer: 3,
        weight: 2
    }, {
        question: 'Какое обычно время выдержки тонирования?',
        answers: ['5 мин', '15-20 мин', '30-35 мин', '45-50 мин'],
        rightAnswer: 2,
        weight: 1
    }, {
        question: 'Сколько в среднем см отрастают волосы за 2 мес?',
        answers: ['2см', '1см', '4см', '3см'],
        rightAnswer: 1,
        weight: 1
    }, {
        question: 'Как закрашиваются седые волосы в тёмный?',
        answers: ['Пятнами', 'Быстро', 'Медленно', 'Не закрашиваются'],
        rightAnswer: 3,
        weight: 1
    }, {
        question: 'Сколько первых минут порошок обесцвечивает активно, пока не замедляется?',
        answers: ['5-10 мин', '10-20 мин', '20-30 мин', '30-40 мин'],
        rightAnswer: 2,
        weight: 3
    }, {
        question: 'Что такое дисульфидные связи?',
        answers: ['Связи серы', 'Солевые связи', 'Связи белка', 'Связи углерода'],
        rightAnswer: 3,
        weight: 1
    }
];

let currentScore = 0;
let currentQuestionIndex = 0;
let timer = null;
const timeToAnswer = 20 * questions.length;

document.getElementById('button_correct').addEventListener('click', e => {
    if (e.target.dataset.action !== 'start') {
        currentScore = 0;
        currentQuestionIndex = 0;
    }

    startGame();
});

function startGame() {
    document.getElementById('page_wrap').classList.remove('finish');
    document.getElementById('page_wrap').classList.add('ingame');
    document.getElementById('button_correct').setAttribute('data-action', 'start');
    document.getElementById('qNumber').innerText = `1 / ${questions.length}`;

    setTimeout(() => {
        updateQuestion();
        startTimer();
    });
}

function answer(num) {
    const q = questions[currentQuestionIndex];

    currentScore += (num === q.rightAnswer ? q.weight : 0);
    document.getElementById('result').innerText = `Баллы: ${currentScore}`;

    currentQuestionIndex++;
    document.getElementById('qNumber').innerText = `${currentQuestionIndex + 1} / ${questions.length}`;

    if (questions[currentQuestionIndex]) {
        updateQuestion();
    } else {
        clearInterval(timer);
        finish();
    }
}

function updateQuestion() {
    document.getElementById('question').innerText = questions[currentQuestionIndex].question;

    for (let i = 0; i < 4; i++) {
        document.getElementsByClassName(`answer-num-${i + 1}`)[0].innerText = questions[currentQuestionIndex].answers[i];
    }
}

function finish() {
    document.getElementById('page_wrap').classList.remove('ingame');
    document.getElementById('page_wrap').classList.add('finish');
    document.getElementById('button_correct').setAttribute('data-action', 'refresh');
    document.getElementById('result').innerText = `Баллы: 0`;
    document.getElementById('timer').innerText = `--:--`;

    setTimeout(() => {
        document.getElementById('score_value').innerText = currentScore;

        let finalText = '';
        if (currentScore < 10) {
            finalText = 'Вам стоит подтянуть свои знания по колористике 📚';
        } else if (currentScore < 12) {
            finalText = 'Неплохо 👍, но можно лучше.'
        } else {
            finalText = 'Кто-то неплохо разбирается в колористике! 🎉';
        }
        document.getElementById('score_share').innerText = finalText;
    });
}

function startTimer() {
    let sec = timeToAnswer;

    timer = setInterval(() => {
        sec--;
        const minutes = Math.floor(sec / 60);
        const seconds = sec - minutes * 60;
        const remained = minutes + ':' + (seconds > 9 ? seconds : '0' + seconds);

        document.getElementById(`timer`).innerText = remained;

        if (sec === 0) {
            clearInterval(timer);
            finish();
        }
    }, 1000);
}